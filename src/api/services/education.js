import API from '../index';

class EducationService extends API {
  constructor() {
    super(API);
  }

  async addEducation(profileID, data) {
    return this.post(`profile/${profileID}/education`, data);
  }

  async editEducation(profileID, educationID, data) {
    return this.put(`profile/${profileID}/education/${educationID}`, data);
  }

  async deleteEducation(profileID, educationID) {
    return this.delete(`profile/${profileID}/education/${educationID}`);
  }
}

export default new EducationService();
