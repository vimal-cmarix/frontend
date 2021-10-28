import API from '../index';

class AccessSetting extends API {
  constructor() {
    super(API);
  }

  async getProfileAccessSetting(companyProfileId) {
    return this.get(`/accessSettings/${companyProfileId}`);
  }

  async onChangeCompanyRole(userId, data) {
    return this.put(`/accessSettings/${userId}/access-info`, data);
  }

  async requestAsAdmin(data) {
    return this.post(`/accessSettings/request-access`, data);
  }

  async onActiveDeactiveUser(userId, data) {
    return this.put(`/accessSettings/activeDeactive/${userId}`, data);
  }

  async sendInvitation(data) {
    return this.post(`/accessSettings/send-invite`, data);
  }

  async onGetJobStatus(userId) {
    return this.get(`accessSettings/${userId}`);
  }
}
export default new AccessSetting();
