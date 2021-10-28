import API from '../index';
import axios from 'axios';
// example of API usage

class SignService extends API {
  constructor() {
    super(API);
  }

  async createApplicant(data) {
    return this.post('/applicant/signup/local', {
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      username: data.email,
      password: data.password,
    });
  }

  async createApplicantNew(data) {
    console.log('datanew', data);
    return this.post('/employer/signup/local', {
      firstName: data.first_name,
      lastName: data.last_name,
      companyname: data.company_name,
      username: data.email,
      password: data.password,
    });
  }

  async confirmCode(code) {
    return this.post('/applicant/confirm', {
      code: String(code),
    });
  }

  async resendCode() {
    return this.get('/applicant/resendCode');
  }

  async unauthorizeCodeConfirm(code, userId) {
    return this.post('/applicant/confirmCode', {
      code: String(code),
      userId,
    });
  }

  async unauthorizeCodeConfirmNew(code, userId) {
    // console.log('d........', userId, code);
    return this.post('/employer/confirmCode', {
      code: String(code),
      userId,
    });
  }

  addContact(data) {
    const url =
      'https://webapi.joinsizigi.com/public/addContactToHubspotAccount';
    data.cp = true;
    axios
      .post(url, data)
      .then(result => {
        console.log('success');
        // cb(null, result);
      })
      .catch(error => {
        console.log('error', error);
        // cb(error, null);
      });
  }

  async unauthorizeResendCode(userId) {
    return this.get(`/applicant/resendConfCode/${userId}`);
  }

  async unauthorizeResendCodeNew(userId) {
    return this.get(`/employer/resendConfCode/${userId}`);
  }

  async getApplicant(data) {
    return this.post('/applicant/signin/local', {
      username: data.email,
      password: data.password,
    });
  }

  async getApplicantNew(data) {
    console.log('data', data);
    return this.post('/employer/signin/local', {
      username: data.email,
      password: data.password,
    });
  }

  async getSubscription() {
    return this.get('/subscription');
  }

  async sendContactMessage(data) {
    return this.post('/applicant/contact', data);
  }
}

export default new SignService();
