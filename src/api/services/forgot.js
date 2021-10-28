import API from '../index';

class ForgotService extends API {
  constructor() {
    super(API);
  }

  sendForgot(data) {
    return this.post('/applicant/reset', data);
  }

  sendForgotNew(data) {
    return this.post('/employer/reset', data);
  }

  reset(token, data) {
    return this.put(`/applicant/reset/${token}`, data);
  }

  resetNew(token, data) {
    console.log('data', data, token);
    return this.put(`/employer/reset/${token}`, data);
  }
}

export default new ForgotService();
