import API from '../index';

class AtsDetails extends API {
  constructor() {
    super(API);
  }

  async getAtsDetails(jobInfoId) {
    //console.log('data service', jobInfoId);
    return this.get(`/jobInfo/getTrello/${jobInfoId}`);
  }

  async getOverView(jobInfoId, jobSwimLane, applyJobCard) {
    //console.log('data service', jobInfoId);
    return this.get(
      `/jobInfo/${jobInfoId}/jobswimlane/${jobSwimLane}/apply-job-card/${applyJobCard}`,
    );
  }

  async setMove(jobInfoId, jobSwimLaneId, applyJobCardId) {
    //console.log('data service', jobInfoId);
    const jobSwimLaneIds = {
      jobSwimlaneId: jobSwimLaneId,
    };
    //console.log('ff', jobSwimLaneIds);
    return this.put(
      `/jobInfo/${jobInfoId}/apply-job-card/${applyJobCardId}/move`,
      jobSwimLaneIds,
    );
    //setPosition();
  }

  async sendEmail(data) {
    //console.log('data', data);
    return this.post(
      `jobInfo/send/rejectLetter
    `,
      data,
    );
  }

  async getJobDetailFilter(jobInfoId, data) {
    //console.log('data service', jobInfoId);
    // const jobSwimLaneIds = {
    //   jobSwimlaneId: jobSwimLaneId,
    // };
    // const data = {
    //   jobListFilterBy: {
    //     name: '',
    //     fit: '',
    //     experience: '',
    //     location: '',
    //   },
    // };
    //console.log('api', data);
    return this.post(
      `/jobInfo/getJobList/1f36b9ed-2a14-473e-bfb3-5b842eee24af?limit=50&skip=0&sort=createdAt`,
      data,
    );
  }

  async setPosition(jobInfoId, jobSwimLaneId, data) {
    //console.log('data');
    // const data = [
    //   {
    //     id: 'b721ead6-4d38-475f-b65c-dv95c97a3fb2',
    //     position: 1
    //   }
    // ];
    //console.log('data', data);
    return this.put(
      `/jobInfo/${jobInfoId}/swimlane/${jobSwimLaneId}/apply-job-card/jobposition`,
      data,
    );
  }

  async getJobDetails(jobInfoId) {
    //console.log('id', jobInfoId);
    return this.get(`/jobInfo/${jobInfoId}`);
  }

  async getJobPostingDetail(jobInfoId, limit, skip, firstName) {
    console.log('ids', jobInfoId);
    // const limit = 3;
    // const skip = 0;
    return this.get(
      `/jobInfo/company/${jobInfoId}?limit=${limit}&skip=${skip}&jobTitle=${firstName}`,
    );
  }

  getCompanyPreviewDetails(jobInfoId) {
    return this.get(`/companyProfile/${jobInfoId}/company/preview`);
  }
}
export default new AtsDetails();
