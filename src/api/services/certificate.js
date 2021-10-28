import API from '../index';

class CertificateService extends API {
  constructor() {
    super(API);
  }

  async addCertificate(profileId, data) {
    return this.post(`profile/${profileId}/certificate`, data);
  }

  async editCertificate(profileId, certificateId, data) {
    return this.put(`profile/${profileId}/certificate/${certificateId}`, data);
  }

  async deleteCertificate(profileId, certificateId) {
    return this.delete(`profile/${profileId}/certificate/${certificateId}`);
  }
}

export default new CertificateService();
