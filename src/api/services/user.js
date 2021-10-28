import API from '../index';

class UserService extends API {
  constructor() {
    super(API);
  }

  async changePassword(data) {
    return this.put('user/password', {
      oldPassword: data.current_password,
      newPassword: data.new_password,
    });
  }

  async changePasswordNew(data) {
    console.log('data', data);
    return this.put('/companyUser/password', {
      oldPassword: data.current_password,
      newPassword: data.new_password,
    });
  }

  async sendUniversity(data) {
    return this.put('/user/university', data);
  }

  async applyAsStudent(data) {
    return this.post('/user/students/apply', data);
  }

  async confirmStudentsApplication(data) {
    return this.put('/user/students/confirmation', data);
  }

  async setReferralAdvocate(data) {
    return this.post('/user/referral', data);
  }

  async setBonusUpgrade() {
    return this.post('/user/bonus-upgrade');
  }

  async setBonusDowngrade() {
    return this.post('/user/bonus-downgrade');
  }
}

export default new UserService();
