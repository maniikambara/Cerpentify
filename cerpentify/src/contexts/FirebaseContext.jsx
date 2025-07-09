// src/contexts/FirebaseContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  limit, 
  orderBy, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot 
} from 'firebase/firestore';

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cerpenData, setCerpenData] = useState([]);
  const [categories, setCategories] = useState([]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Authentication functions
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Firestore functions
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = [];
      querySnapshot.forEach((doc) => {
        categoriesData.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoriesData);
      return categoriesData;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const fetchCerpen = async (categoryFilter = null, limitCount = 10) => {
    try {
      let q = query(collection(db, 'cerpen'), limit(limitCount));
      
      if (categoryFilter) {
        q = query(
          collection(db, 'cerpen'), 
          where('category', '==', categoryFilter),
          limit(limitCount)
        );
      }

      const querySnapshot = await getDocs(q);
      const cerpenList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Remove content for list view to save memory
        const { content, ...cerpenPreview } = data;
        cerpenList.push({ id: doc.id, ...cerpenPreview });
      });
      
      setCerpenData(cerpenList);
      return cerpenList;
    } catch (error) {
      console.error('Error fetching cerpen:', error);
      return [];
    }
  };

  const fetchCerpenDetail = async (cerpenId) => {
    try {
      const docRef = doc(db, 'cerpen', cerpenId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Cerpen not found');
      }
    } catch (error) {
      console.error('Error fetching cerpen detail:', error);
      return null;
    }
  };

  const searchCerpen = async (searchTerm) => {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - for production, consider using Algolia
      const querySnapshot = await getDocs(collection(db, 'cerpen'));
      const results = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const searchableText = `${data.title} ${data.author} ${data.category}`.toLowerCase();
        
        if (searchableText.includes(searchTerm.toLowerCase())) {
          const { content, ...cerpenPreview } = data;
          results.push({ id: doc.id, ...cerpenPreview });
        }
      });
      
      return results;
    } catch (error) {
      console.error('Error searching cerpen:', error);
      return [];
    }
  };

  const addFavorite = async (cerpenId) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const favoritesRef = collection(db, 'favorites');
      await addDoc(favoritesRef, {
        userId: user.uid,
        cerpenId: cerpenId,
        addedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeFavorite = async (cerpenId) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(
        favoritesRef,
        where('userId', '==', user.uid),
        where('cerpenId', '==', cerpenId)
      );
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getFavorites = async () => {
    if (!user) return [];
    
    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const favoriteIds = [];
      querySnapshot.forEach((doc) => {
        favoriteIds.push(doc.data().cerpenId);
      });
      
      return favoriteIds;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  };

  // Real-time listener for cerpen updates
  const subscribeToCerpen = (callback) => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'cerpen'), limit(10)),
      (querySnapshot) => {
        const cerpenList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const { content, ...cerpenPreview } = data;
          cerpenList.push({ id: doc.id, ...cerpenPreview });
        });
        callback(cerpenList);
      },
      (error) => {
        console.error('Error in cerpen subscription:', error);
      }
    );
    
    return unsubscribe;
  };

  const value = {
    // Auth
    user,
    loading,
    login,
    register,
    logout,
    
    // Data
    cerpenData,
    categories,
    
    // Functions
    fetchCategories,
    fetchCerpen,
    fetchCerpenDetail,
    searchCerpen,
    addFavorite,
    removeFavorite,
    getFavorites,
    subscribeToCerpen
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};