import API from '@src/api';

class RejectionOrOffer extends API {
  constructor() {
    super('applicant');
  }

  async getRejectOffer(companyProfileId, data) {
    console.log('comapny', companyProfileId);
    return this.get(
      `/applicantRejection/${companyProfileId}/getRejectOffer`,
      data,
    );
  }

  async rejectionOrOffer(companyProfileId, data) {
    return this.post(
      `/applicantRejection/${companyProfileId}/applicant-rejection`,
      data,
    );
  }

  async additionalFeature(companyProfileId, data) {
    return this.post(
      `/applicantRejection/${companyProfileId}/additional-feature`,
      data,
    );
  }

  async getAdditionalFeature(companyProfileId) {
    return this.get(
      `/applicantRejection/${companyProfileId}/getAdditionalFeature`,
    );
  }

  async setVideoLimit(companyProfileId, data) {
    return this.post(
      `/applicantRejection/${companyProfileId}/video-content`,
      data,
    );
  }
}

export default new RejectionOrOffer();
