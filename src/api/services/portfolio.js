import axios from 'axios';

import API from '../index';

class PortfolioService extends API {
  constructor() {
    super(API);
  }

  async getAll(profileId, filters) {
    const query = new URLSearchParams(filters).toString();
    return this.get(`/portfolio/profile/${profileId}?${query}`);
  }

  async getLink(link, accessToken) {
    return this.get(
      `${link}${accessToken ? `&access_token=${accessToken}` : ''}`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async getLibraryLink(link, accessToken) {
    const service = axios.create();
    return service.get(
      `${link}${accessToken ? `&access_token=${accessToken}` : ''}`,
    );
  }

  async getById(portfolioId, accessToken) {
    if (accessToken) {
      return this.get(`/portfolio/${portfolioId}?access_token=${accessToken}`);
    }
    return this.get(`/portfolio/${portfolioId}`);
  }

  async create(profileId, data) {
    return this.post(`/portfolio/${profileId}`, data);
  }

  async edit(portfolioId, data) {
    return this.put(`/portfolio/${portfolioId}`, data);
  }

  async deletePost(portfolioId) {
    return this.delete(`/portfolio/${portfolioId}`);
  }

  async publish(portfolioId) {
    return this.put(`/portfolio/${portfolioId}/publish`);
  }
}

export default new PortfolioService();
