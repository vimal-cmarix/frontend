import API from '../index';

class ShareService extends API {
  constructor() {
    super(API);
  }

  async createShare(profileId) {
    return this.put(`share/profile/${profileId}`);
  }

  async getShare(slug, secrect) {
    return this.get(`share?slug=${slug}&secret=${secrect}`);
  }

  async getSharePresentation(id, secrect) {
    return this.get(`share/presentation?slug=${id}&secret=${secrect}`);
  }

  async getSharePortfolio(portfolioId) {
    return this.get(`/share/portfolio?slug=${portfolioId}`);
  }

  async getShareJobCard(shortUrl) {
    return this.get(`/share/${shortUrl}/share`);
  }

  async getShareJobCardValid(shortUrl, secret) {
    return this.get(`/share/${shortUrl}/share?secret=${secret}`);
  }

  async getShareJobCardPresentation(shortUrl, secret) {
    return this.get(
      `/share/job-card/${shortUrl}/presentation?shortUrl=${shortUrl}&secret=${secret}`,
    );
  }

  async setShareEmailJobCard(type, shortUrl, data) {
    return this.get(
      `/share/job-card/${type}/${shortUrl}?name=${data.name}&email=${data.email}&message=${data.message}&option=${data.option}`,
    );
  }

  async setShareEmail(type, profileId, data) {
    return this.get(
      `/share/profile/${type}/${profileId}?name=${data.name}&email=${data.email}&message=${data.message}&option=${data.option}`,
    );
  }
}

export default new ShareService();
