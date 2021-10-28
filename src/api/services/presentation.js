import axios from 'axios';

import API from '../index';

class PresentationService extends API {
  constructor() {
    super(API);
  }

  async getAll(profileId, filters) {
    const query = new URLSearchParams(filters).toString();
    return this.get(`/presentation/profile/${profileId}?${query}`);
  }

  async getLink(link, accessToken) {
    return this.get(
      `${link}${accessToken ? `&access_token=${accessToken}` : ''}`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async getPresentationLink(link, accessToken) {
    const service = axios.create();
    return service.get(
      `${link}${accessToken ? `&access_token=${accessToken}` : ''}`,
    );
  }

  async getById(presentationId, accessToken) {
    if (accessToken) {
      return this.get(
        `/presentation/${presentationId}?access_token=${accessToken}`,
      );
    }
    return this.get(`/presentation/${presentationId}`);
  }

  async create(profileId, data) {
    return this.post(`/presentation/${profileId}`, data);
  }

  async edit(presentationId, data) {
    return this.put(`/presentation/${presentationId}`, data);
  }

  async deletePresentation(presentationId) {
    return this.delete(`/presentation/${presentationId}`);
  }

  async publish(presentationId) {
    return this.put(`/presentation/${presentationId}/publish`);
  }

  async getInfoCredits() {
    return this.get(`/presentation/info/credits`);
  }

  async getMeta(presentationId) {
    return this.get(`/presentation/${presentationId}/meta`);
  }
}

export default new PresentationService();
