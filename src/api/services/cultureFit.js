import API from '../index';

class CultureFitService extends API {
  constructor() {
    super(API);
  }

  async getCultureFit(profileID, filters) {
    const query = new URLSearchParams(filters).toString();
    return this.get(`profile/${profileID}/culture-fit?${query}`);
  }

  async createSocialCauses(profileID, data) {
    return this.post(`profile/${profileID}/culture-fit/social-causes`, data);
  }

  async updateSocialCauses(profileID, cultureFitId, data) {
    return this.put(
      `profile/${profileID}/culture-fit/${cultureFitId}/social-causes`,
      data,
    );
  }

  async createNonProfits(profileID, cultureFitId, data) {
    return this.post(
      `profile/${profileID}/culture-fit/${cultureFitId}/non-profits`,
      data,
    );
  }

  async updateNonProfit(profileID, cultureFitId, data) {
    return this.put(
      `profile/${profileID}/culture-fit/${cultureFitId}/non-profits`,
      data,
    );
  }

  async deleteNonProfit(profileID, cultureFitId, nonProfitId) {
    return this.delete(
      `profile/${profileID}/culture-fit/${cultureFitId}/non-profit/${nonProfitId}`,
    );
  }

  async createVolunteerExperience(profileID, cultureFitId, data) {
    return this.post(
      `profile/${profileID}/culture-fit/${cultureFitId}/volunteer-experience`,
      data,
    );
  }

  async updateVolunteerExperience(
    profileID,
    cultureFitId,
    volunteerExperienceId,
    data,
  ) {
    return this.put(
      `profile/${profileID}/culture-fit/${cultureFitId}/volunteer-experience/${volunteerExperienceId}`,
      data,
    );
  }

  async deleteVolunteerExperience(
    profileID,
    cultureFitId,
    volunteerExperienceId,
  ) {
    return this.delete(
      `profile/${profileID}/culture-fit/${cultureFitId}/volunteer-experience/${volunteerExperienceId}`,
    );
  }

  async updateWhatInspiresMe(profileID, cultureFitId, data) {
    return this.put(
      `profile/${profileID}/culture-fit/${cultureFitId}/what-inspires-me`,
      data,
    );
  }

  async deleteWhatInspiresMe(profileID, cultureFitId, whatInspiresId) {
    return this.delete(
      `profile/${profileID}/culture-fit/${cultureFitId}/what-inspires-me/${whatInspiresId}`,
    );
  }

  async createProfessionalBucket(profileID, cultureFitId, data) {
    return this.post(
      `profile/${profileID}/culture-fit/${cultureFitId}/professional-bucket`,
      data,
    );
  }

  async updateProfessionalBucket(
    profileID,
    cultureFitId,
    profissionalBucketId,
    data,
  ) {
    return this.put(
      `profile/${profileID}/culture-fit/${cultureFitId}/professional-bucket/${profissionalBucketId}`,
      data,
    );
  }

  async deleteProfessionalBucket(
    profileID,
    cultureFitId,
    profissionalBucketId,
  ) {
    return this.delete(
      `profile/${profileID}/culture-fit/${cultureFitId}/professional-bucket/${profissionalBucketId}`,
    );
  }
}

export default new CultureFitService();
