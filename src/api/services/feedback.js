import API from '@src/api';

class FeedbackService extends API {
  constructor() {
    super('applicant');
  }

  async sendFeedback(data) {
    return this.post('/feedback', data);
  }
}

export default new FeedbackService();
