import API from '../index';

class JobExperienceService extends API {
  constructor() {
    super(API);
  }

  async addJobExperience(profileID, data) {
    return this.post(`profile/${profileID}/experience`, data);
  }

  async getJobList(limit, skip) {
    return this.get(
      `jobInfo/get-all-published-job/list?limit=${limit}&skip=${skip}`,
    );
  }

  async onserchJob(limit, skip, title) {
    const order = 'DESC';
    return this.get(
      `jobInfo/get-all-published-job/list?limit=${limit}&skip=${skip}&order=${order}&jobTitle=${title}`,
    );
  }

  async getJobDetails(jobinfoId) {
    return this.get(`jobInfo/${jobinfoId}/job-detail`);
  }

  async getCompanyJobList(companyId, limit, skip, jobTitle) {
    return this.get(
      `jobInfo/${companyId}/job-list-by-company?limit=${limit}&skip=${skip}&jobTitle=${jobTitle}`,
    );
  }

  async editJobExperience(profileID, experienceID, data) {
    return this.put(`profile/${profileID}/experience/${experienceID}`, data);
  }

  async deleteJobExperience(profileID, experienceID) {
    return this.delete(`profile/${profileID}/experience/${experienceID}`);
  }
}

export default new JobExperienceService();
