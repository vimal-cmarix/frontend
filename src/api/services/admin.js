import API from '@src/api';

class AdminService extends API {
  constructor() {
    super('applicant');
  }

  async listContent(type) {
    const { data } = await this.get(`/admin/content/${type}`);
    return data;
  }

  async getCompanyProfile(profileId) {
    return this.get(`/companyProfile/${profileId}`);
  }

  async setCompanyLogo(profileId, data) {
    return this.put(`/companyProfile/${profileId}/update/about`, data);
  }

  async companyMediaInfo(profileId, data) {
    return this.put(
      `/companyProfile/${profileId}/update/company-media-info`,
      data,
    );
  }

  async setCompanyVideo(profileId, data) {
    console.log('data service', data);
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanyblog`,
      data,
    );
  }

  async setBlogCompanyArtical(profileId, data) {
    console.log('data service', data);
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanyblog`,
      data,
    );
  }
}

export default new AdminService();
