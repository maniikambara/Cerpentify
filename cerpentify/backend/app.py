from flask import Flask, jsonify, request
from flask_cors import CORS
from firebase_config import db
from scraper import CerpenScraper
import threading

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/api/categories', methods=['GET'])
def get_categories():
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

@app.route('/api/scrape', methods=['POST'])
def start_scrape():
    try:
        def run_scraper():
            scraper = CerpenScraper()
            scraper.run_full_scrape()
            
        # Run scraper in background thread
        thread = threading.Thread(target=run_scraper)
        thread.daemon = True
        thread.start()
        
        return jsonify({"message": "Scraping started in background"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)