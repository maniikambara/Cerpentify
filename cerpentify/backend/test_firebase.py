# test_firebase.py
import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys

def test_firebase_connection():
    try:
        # Check if credentials file exists
        credential_path = './firebase-credentials.json'
        backend_path = './firebase-credentials.json'
        
        if os.path.exists(credential_path):
            cred_file = credential_path
        elif os.path.exists(backend_path):
            cred_file = backend_path
        else:
            print("❌ Error: firebase-credentials.json not found!")
            print("Please ensure the file exists in:")
            print("  1. Current directory: ./firebase-credentials.json")
            print("  2. Backend directory: ./backend/firebase-credentials.json")
            print("\nTo get the credentials file:")
            print("  1. Go to Firebase Console → Project Settings")
            print("  2. Click 'Service accounts' tab")
            print("  3. Click 'Generate new private key'")
            print("  4. Save as 'firebase-credentials.json'")
            return False
        
        print(f"📁 Using credentials file: {cred_file}")
        
        # Initialize Firebase
        cred = credentials.Certificate(cred_file)
        
        # Check if already initialized
        if firebase_admin._apps:
            firebase_admin.delete_app(firebase_admin.get_app())
        
        app = firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("✅ Firebase connection successful!")
        
        # Test write
        test_data = {
            'test': 'data',
            'timestamp': firestore.SERVER_TIMESTAMP,
            'message': 'Test from Python backend'
        }
        
        db.collection('test').document('test').set(test_data)
        print("✅ Write test successful!")
        
        # Test read
        doc = db.collection('test').document('test').get()
        if doc.exists:
            print("✅ Read test successful!")
            print(f"📄 Document data: {doc.to_dict()}")
        else:
            print("❌ Read test failed: Document not found")
            
        # Test collection query
        docs = db.collection('test').limit(5).stream()
        doc_count = len(list(docs))
        print(f"📊 Found {doc_count} documents in test collection")
        
        # Clean up test data
        db.collection('test').document('test').delete()
        print("🧹 Test data cleaned up")
        
        return True
        
    except FileNotFoundError as e:
        print(f"❌ File Error: {e}")
        print("Make sure firebase-credentials.json exists in the correct location")
        return False
    except Exception as e:
        print(f"❌ Firebase Error: {e}")
        print("Please check:")
        print("  1. Credentials file is valid JSON")
        print("  2. Service account has proper permissions")
        print("  3. Project ID is correct")
        print("  4. Internet connection is available")
        return False

if __name__ == "__main__":
    print("🔥 Testing Firebase Connection...")
    print("=" * 50)
    
    success = test_firebase_connection()
    
    print("=" * 50)
    if success:
        print("🎉 All tests passed! Firebase is ready to use.")
    else:
        print("💥 Tests failed. Please fix the issues above.")
        sys.exit(1)