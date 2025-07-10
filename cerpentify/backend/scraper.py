import requests
from bs4 import BeautifulSoup
import time
import re
from urllib.parse import urljoin, urlparse
from firebase_config import db
from datetime import datetime

class CerpenScraper:
    def __init__(self):
        self.base_url = "https://web.archive.org/web/20181108180538/http://cerpenmu.com/"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
    def get_page(self, url):
        """Get page content with error handling"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
            
    def scrape_categories(self):
        """Scrape categories from main page"""
        print("Scraping categories...")
        soup = self.get_page(self.base_url)
        if not soup:
            return []
            
        categories = []
        
        # Find h4 with "Kategori Cerpen"
        kategori_header = soup.find('h4', string=re.compile(r'Kategori Cerpen'))
        if kategori_header:
            # Find all category links after the header
            category_container = kategori_header.find_next_sibling() or kategori_header.parent
            category_links = category_container.find_all('a', href=re.compile(r'category/'))
            
            for link in category_links:
                category_name = link.get_text().strip()
                category_url = urljoin(self.base_url, link.get('href'))
                
                category_data = {
                    'name': category_name,
                    'url': category_url,
                    'created_at': datetime.now()
                }
                
                categories.append(category_data)
                print(f"Found category: {category_name}")
                
        return categories
        
    def save_categories_to_firebase(self, categories):
        """Save categories to Firebase"""
        print("Saving categories to Firebase...")
        
        for category in categories:
            try:
                # Use category name as document ID
                doc_id = category['name'].lower().replace(' ', '_')
                db.collection('categories').document(doc_id).set(category)
                print(f"Saved category: {category['name']}")
                time.sleep(0.5)  # Rate limiting
            except Exception as e:
                print(f"Error saving category {category['name']}: {e}")
                
    def get_cerpen_of_the_month_url(self):
        """Get Cerpen of The Month URL"""
        soup = self.get_page(self.base_url)
        if not soup:
            return None
            
        # Find the "Cerpen of The Month" link
        cotm_link = soup.find('a', {'class': 'tombol-link tombol-header'}, 
                                href=re.compile(r'cerpen-of-the-month'))
        
        if cotm_link:
            return urljoin(self.base_url, cotm_link.get('href'))
        return None
        
    def scrape_cerpen_list(self, url):
        """Scrape list of cerpen from given URL"""
        print(f"Scraping cerpen list from: {url}")
        soup = self.get_page(url)
        if not soup:
            return []
            
        cerpen_links = []
        
        # Find all cerpen links
        links = soup.find_all('a', href=re.compile(r'\.html$'))
        
        for link in links:
            if link.find('strong'):  # Links with strong tags are usually cerpen titles
                cerpen_url = urljoin(url, link.get('href'))
                cerpen_title = link.find('strong').get_text().strip()
                
                cerpen_links.append({
                    'title': cerpen_title,
                    'url': cerpen_url
                })
                
        return cerpen_links
        
    def scrape_cerpen_detail(self, cerpen_url):
        """Scrape detailed cerpen information"""
        print(f"Scraping cerpen detail: {cerpen_url}")
        soup = self.get_page(cerpen_url)
        if not soup:
            return None
            
        cerpen_data = {}
        
        try:
            # Get title from h1
            title_element = soup.find('h1')
            if title_element:
                cerpen_data['title'] = title_element.get_text().strip()
            
            # Get author
            author_text = soup.find(text=re.compile(r'Cerpen Karangan:'))
            if author_text:
                author_link = author_text.find_next('a')
                if author_link:
                    cerpen_data['author'] = author_link.get_text().strip()
            
            # Get category
            category_text = soup.find(text=re.compile(r'Kategori:'))
            if category_text:
                category_link = category_text.find_next('a', rel=re.compile(r'category tag'))
                if category_link:
                    cerpen_data['category'] = category_link.get_text().strip()
            
            # Get publication date
            date_text = soup.find(text=re.compile(r'Lolos moderasi pada:'))
            if date_text:
                # Extract date from the next text node
                date_match = re.search(r'(\d{1,2} \w+ \d{4})', str(date_text.next_sibling))
                if date_match:
                    cerpen_data['published_date'] = date_match.group(1)
            
            # Get content
            content_parts = []
            
            # Find all p tags after the date
            if date_text:
                current_element = date_text.find_next('p')
                while current_element:
                    # Stop if we find the sharing message
                    if current_element.find('strong') and \
                        'Kamu suka cerpen ini?' in current_element.get_text():
                        break
                        
                    content_parts.append(current_element.get_text().strip())
                    current_element = current_element.find_next_sibling('p')
            
            cerpen_data['content'] = '\n\n'.join(content_parts)
            cerpen_data['url'] = cerpen_url
            cerpen_data['scraped_at'] = datetime.now()
            
        except Exception as e:
            print(f"Error scraping cerpen detail: {e}")
            return None
            
        return cerpen_data
        
    def save_cerpen_to_firebase(self, cerpen_data):
        """Save cerpen data to Firebase"""
        try:
            # Generate document ID from title
            doc_id = re.sub(r'[^a-zA-Z0-9]', '_', cerpen_data['title'].lower())
            db.collection('cerpen').document(doc_id).set(cerpen_data)
            print(f"Saved cerpen: {cerpen_data['title']}")
            return True
        except Exception as e:
            print(f"Error saving cerpen {cerpen_data.get('title', 'Unknown')}: {e}")
            return False
            
    def run_full_scrape(self):
        """Run complete scraping process"""
        print("Starting full scrape process...")
        
        # 1. Scrape and save categories
        categories = self.scrape_categories()
        if categories:
            self.save_categories_to_firebase(categories)
        
        # 2. Get cerpen of the month URL
        cotm_url = self.get_cerpen_of_the_month_url()
        if not cotm_url:
            print("Could not find Cerpen of The Month URL")
            return
            
        # 3. Scrape cerpen list
        cerpen_links = self.scrape_cerpen_list(cotm_url)
        print(f"Found {len(cerpen_links)} cerpen links")
        
        # 4. Scrape each cerpen detail
        for i, link in enumerate(cerpen_links[:300]):
            print(f"Processing {i+1}/{len(cerpen_links[:300])}: {link['title']}")
            
            cerpen_data = self.scrape_cerpen_detail(link['url'])
            if cerpen_data:
                self.save_cerpen_to_firebase(cerpen_data)
                
            time.sleep(2)  # Rate limiting
            
        print("Scraping completed!")

if __name__ == "__main__":
    scraper = CerpenScraper()
    scraper.run_full_scrape()