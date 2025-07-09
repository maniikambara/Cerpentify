import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

const FirebaseTest = () => {
    const { 
    categories, 
    cerpenData, 
    fetchCerpen, 
    fetchCerpenDetail,
    searchCerpen
    } = useFirebase();
    
    const [selectedCerpen, setSelectedCerpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
    fetchCerpen();
    }, []);

    const handleSearch = async () => {
    if (searchTerm.trim()) {
        const results = await searchCerpen(searchTerm);
        setSearchResults(results);
    }
    };

    const handleCerpenClick = async (cerpenId) => {
    const detail = await fetchCerpenDetail(cerpenId);
    setSelectedCerpen(detail);
    };

    return (
    <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Firebase Integration Test</h1>
        
        {/* Search */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Search Cerpen</h2>
        <div className="flex gap-2">
            <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or category..."
            className="flex-1 px-3 py-2 border rounded"
            />
        <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Search Results ({searchResults.length})</h3>
            <div className="grid gap-2">
              {searchResults.map((cerpen) => (
                <div
                  key={cerpen.id}
                  onClick={() => handleCerpenClick(cerpen.id)}
                  className="p-3 bg-white rounded border cursor-pointer hover:bg-gray-50"
                >
                  <h4 className="font-medium">{cerpen.title}</h4>
                  <p className="text-sm text-gray-600">by {cerpen.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Categories ({categories.length})</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => fetchCerpen(category.name)}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Cerpen List */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Cerpen Collection ({cerpenData.length})</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {cerpenData.map((cerpen) => (
            <div
              key={cerpen.id}
              onClick={() => handleCerpenClick(cerpen.id)}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">{cerpen.title}</h3>
              <p className="text-sm text-gray-600 mb-1">by {cerpen.author}</p>
              <p className="text-sm text-gray-500">Category: {cerpen.category}</p>
              <p className="text-sm text-gray-500">Date: {cerpen.published_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cerpen Detail Modal */}
      {selectedCerpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedCerpen.title}</h2>
              <button
                onClick={() => setSelectedCerpen(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <p><strong>Author:</strong> {selectedCerpen.author}</p>
              <p><strong>Category:</strong> {selectedCerpen.category}</p>
              <p><strong>Published:</strong> {selectedCerpen.published_date}</p>
            </div>
            <div className="prose max-w-none">
              {selectedCerpen.content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseTest;