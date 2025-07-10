from flask import Flask, jsonify, request
from flask_cors import CORS
from firebase_config import db
from scraper import CerpenScraper
import threading

app = Flask(__name__)
CORS(app)

# Check if Firebase is initialized
if db is None:
    print("Warning: Firebase not initialized. Please check your credentials.")

@app.route('/api/health', methods=['GET'])
def health_check():
    firebase_status = "connected" if db is not None else "disconnected"
    return jsonify({
        "status": "healthy", 
        "message": "Backend is running",
        "firebase": firebase_status
    })

@app.route('/api/categories', methods=['GET'])
def get_categories():
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500
        
    try:
        categories = []
        docs = db.collection('categories').stream()
        
        for doc in docs:
            category_data = doc.to_dict()
            category_data['id'] = doc.id
            categories.append(category_data)
            
        return jsonify({"categories": categories})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/cerpen', methods=['GET'])
def get_cerpen():
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500
        
    try:
        category = request.args.get('category')
        limit = int(request.args.get('limit', 10))
        
        query = db.collection('cerpen')
        
        if category:
            query = query.where('category', '==', category)
            
        docs = query.limit(limit).stream()
        
        cerpen_list = []
        for doc in docs:
            cerpen_data = doc.to_dict()
            cerpen_data['id'] = doc.id
            # Remove content for list view (too large)
            cerpen_data.pop('content', None)
            cerpen_list.append(cerpen_data)
            
        return jsonify({"cerpen": cerpen_list})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/cerpen/<cerpen_id>', methods=['GET'])
def get_cerpen_detail(cerpen_id):
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500
        
    try:
        doc = db.collection('cerpen').document(cerpen_id).get()
        
        if doc.exists:
            cerpen_data = doc.to_dict()
            cerpen_data['id'] = doc.id
            return jsonify(cerpen_data)
        else:
            return jsonify({"error": "Cerpen not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def check_existing_data():
    """Check if categories and cerpen collections already have data"""
    if db is None:
        return False, False
    
    try:
        # Check categories
        categories_ref = db.collection('categories')
        categories_docs = list(categories_ref.limit(1).stream())
        has_categories = len(categories_docs) > 0
        
        # Check cerpen
        cerpen_ref = db.collection('cerpen')
        cerpen_docs = list(cerpen_ref.limit(1).stream())
        has_cerpen = len(cerpen_docs) > 0
        
        return has_categories, has_cerpen
    except Exception as e:
        print(f"Error checking existing data: {e}")
        return False, False

# Update route /api/scrape
@app.route('/api/scrape', methods=['POST'])
def start_scrape():
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500
    
    try:
        # Check if data already exists
        has_categories, has_cerpen = check_existing_data()
        
        if has_categories and has_cerpen:
            return jsonify({
                "message": "Data sudah tersedia di database. Tidak perlu scraping.",
                "has_categories": has_categories,
                "has_cerpen": has_cerpen
            })
        
        def run_scraper():
            scraper = CerpenScraper()
            scraper.run_full_scrape()
            
        # Run scraper in background thread
        thread = threading.Thread(target=run_scraper)
        thread.daemon = True
        thread.start()
        
        return jsonify({
            "message": "Data tidak lengkap. Scraping dimulai dalam background",
            "has_categories": has_categories,
            "has_cerpen": has_cerpen
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Tambahkan route baru untuk force scraping
@app.route('/api/scrape/force', methods=['POST'])
def force_scrape():
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500
        
    try:
        def run_scraper():
            scraper = CerpenScraper()
            scraper.run_full_scrape()
            
        # Run scraper in background thread
        thread = threading.Thread(target=run_scraper)
        thread.daemon = True
        thread.start()
        
        return jsonify({"message": "Force scraping dimulai dalam background"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)