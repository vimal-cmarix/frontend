import API from '../index';

class ProfileService extends API {
  constructor() {
    super(API);
  }

  async getProfile(profileId) {
    return this.get(`/profile/${profileId}`);
  }

  getProfileNew(userId) {
    //return this.get(`/profile/${profileId}`);
  }

  async deleteProfile(profileId) {
    return this.delete(`/applicant/${profileId}`);
  }

  async setPersonal(profileId, data) {
    return this.put(`/profile/${profileId}/personal-info`, data);
  }

  async setPersonalNew(profileId, data) {
    return this.put(`/companyUser/${profileId}/personal-info`, data);
  }

  async setPersonalPosition(profileId, data) {
    return this.put(`/companyUser/${profileId}/update/position`, data);
  }

  async updatePersonalInfo(userId, data) {
    console.log('userId', userId, data);
    return this.put(`/companyUser/${userId}/update-email-phone-info`, data);
  }

  async updateEmail(userId, data) {
    console.log('userId', userId, data);
    return this.put(`/employer/${userId}/update-email`, data);
  }

  async setSkills(profileId, data) {
    return this.put(`/profile/${profileId}/skill`, data);
  }

  async setInterests(profileId, data) {
    return this.put(`/profile/${profileId}/interest`, data);
  }

  async setContactInfo(profileId, data) {
    return this.put(`/profile/${profileId}/contact-info`, data);
  }

  async setAbout(profileId, data) {
    return this.put(`/profile/${profileId}/about`, data);
  }

  async setSummary(profileId, data) {
    return this.put(`/profile/${profileId}/summary`, data);
  }

  async setPhoto(profileId, data) {
    return this.put(`/profile/${profileId}/photo`, data);
  }

  async setCoverImage(profileId, data) {
    return this.put(`/profile/${profileId}/cover-asset-id`, data);
  }

  async setResume(profileId, data) {
    // console.log('data(__Summary', data);
    return this.put(`/profile/${profileId}/resume`, data);
  }

  async generateShareData(profileId, data) {
    return this.put(`/share/profile/${profileId}`, data);
  }

  async getProfileMeta(slug) {
    return this.get(`/profile/${slug}/meta`);
  }

  /**
   * @param {String} profileId
   * @param {{ objects: Array<{ url: String }> }} data
   */
  async setDigitalPresence(profileId, data) {
    return this.put(`/profile/${profileId}/digital-presence`, data);
  }

  /**
   * @returns {Promise<Array<Object>>}
   */
  async listContents(profileId) {
    return this.get(`/profile/${profileId}/content`);
  }

  /**
   * @param {String} profileId
   * @returns {Promise<Array<Object>>}
   */
  async listContentsToAdd(profileId) {
    return this.get(`/profile/${profileId}/content/to-add`);
  }

  /**
   * @param {String} profileId
   * @param {{ contents: Array<String> }} data
   * @returns {Promise<Array<Object>>}
   */
  async setContents(profileId, data) {
    return this.put(`/profile/${profileId}/content`, data);
  }

  /**
   * @param {String} profileId
   * @param {{ contents: Array<String> }} data
   * @returns {Promise<Array<Object>>}
   */
  async orderContents(profileId, data) {
    return this.put(`/profile/${profileId}/content/order`, data);
  }

  /**
   * @param {String} profileId
   * @param {String} contentId
   * @returns {Promise<Array<Object>>}
   */
  async deleteContentFromProfile(profileId, contentId) {
    return this.delete(`/profile/${profileId}/content/${contentId}`);
  }
}

export default new ProfileService();
