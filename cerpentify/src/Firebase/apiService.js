const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  // Health check
async checkHealth() {
    try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
    } catch (error) {
    console.error('Health check failed:', error);
    throw error;
    }
}

  // Get categories
async getCategories() {
    try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    return data.categories || [];
    } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
    }
}

  // Get cerpen list
async getCerpen(category = null, limit = 10) {
    try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    params.append('limit', limit.toString());

    const response = await fetch(`${API_BASE_URL}/cerpen?${params}`);
    const data = await response.json();
    return data.cerpen || [];
    } catch (error) {
    console.error('Failed to fetch cerpen:', error);
    throw error;
    }
}

  // Get cerpen detail
async getCerpenDetail(cerpenId) {
    try {
    const response = await fetch(`${API_BASE_URL}/cerpen/${cerpenId}`);
    if (!response.ok) {
        throw new Error('Cerpen not found');
    }
    return await response.json();
    } catch (error) {
    console.error('Failed to fetch cerpen detail:', error);
    throw error;
    }
}

  // Start scraping
async startScrape() {
    try {
    const response = await fetch(`${API_BASE_URL}/scrape`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    return await response.json();
    } catch (error) {
    console.error('Failed to start scraping:', error);
    throw error;
    }
}

  // Force scraping
  async startForceScrape() {
    try {
      const response = await fetch(`${API_BASE_URL}/scrape/force`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to start force scraping:', error);
      throw error;
    }
  }
}

export default new ApiService();