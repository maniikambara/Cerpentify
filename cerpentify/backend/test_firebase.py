# test_firebase.py
import firebase_admin
from firebase_admin import credentials, firestore

try:
    cred = credentials.Certificate('firebase-credentials.json')
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("Firebase connection successful!")
    
    # Test write
    db.collection('test').document('test').set({'test': 'data'})
    print("Write test successful!")
    
    # Test read
    doc = db.collection('test').document('test').get()
    if doc.exists:
        print("Read test successful!")
    
except Exception as e:
    print(f"Error: {e}")