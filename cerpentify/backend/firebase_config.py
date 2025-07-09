import firebase_admin
from firebase_admin import credentials, firestore
import os

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    cred = credentials.Certificate('firebase-credentials.json')
    firebase_admin.initialize_app(cred)
    
    # Return Firestore client
    return firestore.client()

# Initialize Firebase
db = initialize_firebase()