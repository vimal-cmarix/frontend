// import API from '../index';

// class AboutCompanyService extends API {
//   constructor() {
//     super(API);
//   }

//   async setAboutCompany(profileId, data) {
//     console.log('data service', data);
//     return this.post(`/companyProfile/${profileId}/about`, data);
//   }
// }
// export default new AboutCompanyService();

import API from '../index';

class AboutCompanyService extends API {
  constructor() {
    super(API);
  }

  async getPagePreview(companyProfileId) {
    //console.log('data service', data);
    return this.get(`/companyProfile/${companyProfileId}/company/preview`);
  }

  async setAboutCompany(profileId, data) {
    //console.log('data service', data);
    return this.post(`/companyProfile/${profileId}/about`, data);
  }

  async updateAboutCompany(profileId, data) {
    //console.log('data service', data);
    return this.put(`/companyProfile/${profileId}/update/about`, data);
  }

  async updatePerksAndBenefit(profileId, data) {
    //console.log('data service', data);
    return this.put(`/companyProfile/${profileId}/update/perks-benefits`, data);
  }

  async setBrandAndTextColor(profileId, data) {
    // console.log('data service', data);
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanycolor`,
      data,
    );
  }

  async setCompanyEmployees(profileId, data) {
    // console.log('data service', data);
    return this.post(
      `/companyProfile/${profileId}/create/advancedcompanyemployees`,
      data,
    );
  }

  async updateCompanyEmployees(profileId, data) {
    // console.log('data service', data);
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanyemployees`,
      data,
    );
  }

  async setCompanyCalture(profileId, data) {
    return this.post(
      `/companyProfile/${profileId}/create/advancedcompanyculture`,
      data,
    );
  }

  async updateCompanyCalture(profileId, data) {
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanyculture`,
      data,
    );
  }

  async setBlogCompanyArtical(profileId, data) {
    return this.post(
      `/companyProfile/${profileId}/create/advancedcompanyblog`,
      data,
    );
  }

  async updateBlogCompanyArtical(profileId, blogId, data) {
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanyblog/${blogId}`,
      data,
    );
  }

  async setSocialFeed(profileId, data) {
    return this.put(
      `/companyProfile/${profileId}/update/advancedcompanysocial`,
      data,
    );
  }

  async setGeneralInfo(profileId, data) {
    return this.post(`/jobInfo/${profileId}`, data);
  }

  async updateGeneralInfo(jobinfoId, data) {
    // console.log('data service', data, profileId);
    return this.put(`/jobInfo/update/${jobinfoId}`, data);
  }

  async updateJobDetail(jobinfoId, data) {
    // console.log('data service', data, profileId);
    return this.put(`/jobInfo/${jobinfoId}`, data);
  }

  async updatePostDetail(profileId, data) {
    // console.log('data service', data, profileId);
    return this.put(`/jobInfo/update/${profileId}`, data);
  }

  async updateCandidateScreening(profileId, data) {
    //console.log('data service', data, profileId);
    return this.put(`/jobInfo/${profileId}/candidate`, data);
  }

  async getReviewDetails(jobInfoId) {
    // console.log('data service', jobInfoId);
    return this.get(`/jobInfo/jobinfo/${jobInfoId}`);
  }
}
export default new AboutCompanyService();
