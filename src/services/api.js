/**
 * Hypernode API Service
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class HypernodeAPI {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic request handler
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // ============================================
  // NODE REGISTRY APIs
  // ============================================

  /**
   * Register a new node
   */
  async registerNode(nodeData) {
    return this.request('/api/nodes/register', {
      method: 'POST',
      body: JSON.stringify(nodeData),
    });
  }

  /**
   * Get all nodes
   */
  async getNodes(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/api/nodes?${params}`);
  }

  /**
   * Get node by ID
   */
  async getNode(nodeId) {
    return this.request(`/api/nodes/${nodeId}`);
  }

  /**
   * Get nodes by wallet address
   */
  async getNodesByWallet(walletAddress) {
    return this.request(`/api/nodes/wallet/${walletAddress}`);
  }

  /**
   * Send heartbeat for a node
   */
  async sendHeartbeat(nodeId, status = 'online', metrics = {}) {
    return this.request(`/api/nodes/${nodeId}/heartbeat`, {
      method: 'POST',
      body: JSON.stringify({ status, metrics }),
    });
  }

  /**
   * Deregister a node
   */
  async deregisterNode(nodeId, walletAddress) {
    return this.request(`/api/nodes/${nodeId}`, {
      method: 'DELETE',
      body: JSON.stringify({ walletAddress }),
    });
  }

  // ============================================
  // JOB MARKETPLACE APIs
  // ============================================

  /**
   * Create a new job
   */
  async createJob(jobData) {
    return this.request('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  /**
   * Get all jobs or filter
   */
  async getJobs(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/api/jobs?${params}`);
  }

  /**
   * Get job by ID
   */
  async getJob(jobId) {
    return this.request(`/api/jobs/${jobId}`);
  }

  /**
   * Cancel a job
   */
  async cancelJob(jobId, walletAddress) {
    return this.request(`/api/jobs/${jobId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    });
  }

  /**
   * Get job statistics
   */
  async getJobStats() {
    return this.request('/api/jobs/stats/summary');
  }

  // ============================================
  // METRICS & VALIDATION APIs
  // ============================================

  /**
   * Get network metrics
   */
  async getMetrics() {
    return this.request('/api/metrics');
  }

  /**
   * Get validation data
   */
  async getValidation() {
    return this.request('/api/metrics/validation');
  }

  /**
   * Get node metrics
   */
  async getNodeMetrics() {
    return this.request('/api/metrics/nodes');
  }

  /**
   * Get job metrics
   */
  async getJobMetrics() {
    return this.request('/api/metrics/jobs');
  }

  // ============================================
  // HEALTH CHECK
  // ============================================

  /**
   * Check API health
   */
  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton instance
const api = new HypernodeAPI();
export default api;

// Also export the class for custom instances
export { HypernodeAPI };
