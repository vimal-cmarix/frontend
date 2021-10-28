import API from '@src/api';

class DashboardNew extends API {
  constructor() {
    super('applicant');
  }

  async listContent(profileId) {
    return this.get(`/jobInfo/company/${profileId}/?limit=50&skip=0`);
  }

  async atsListContent(profileId) {
    return this.get(`/jobInfo/${profileId}/job-list-ats?limit=50&skip=0`);
  }

  async listContentFilter(profileId, text) {
    return this.get(`/jobInfo/company/${profileId}?jobTitle=${text}`);
  }

  async getProfilePercentages(profileId) {
    return this.get(`/companyUser/${profileId}/profile/percentage`);
  }

  async getJobInfo(jobId) {
    return this.get(`/jobInfo/jobinfo/${jobId}`);
  }

  async changeJobStatus(jobId, data) {
    return this.put(`/jobInfo/${jobId}/status`, data);
  }

  async updateEmojiRate(jobInfoId, data) {
    return this.put(`/jobInfo/${jobInfoId}/job-rate`, data);
  }

  // async updateEmojiRate(jobInfoId, data) {
  //   return this.post(
  //     `/jobInfo/${jobInfoId}/job-rate`,
  //     data,
  //   );
  // }

  async putWebAddress(jobId, data) {
    return this.put(`/jobInfo/${jobId}/candidate/external/website`, data);
  }

  async candidateScreen(jobId, data) {
    return this.put(`/jobInfo/${jobId}/candidate`, data);
  }
}

export default new DashboardNew();
