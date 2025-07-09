import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useFirebase();

    if (loading) {
    return <LoadingSpinner text="Checking authentication..." />;
    }

    if (!user) {
    return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;