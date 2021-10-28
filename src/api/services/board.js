import API from '../index';

class BoardService extends API {
  constructor() {
    super(API);
  }

  async getBoards() {
    return this.get('board');
  }

  async getBoard(boardId, ignorePendencie = 'no') {
    return this.get(`board/${boardId}?ignorePendencie=${ignorePendencie}`);
  }

  async showJobCard(boardId, swimlaneId, jobCardId) {
    return this.get(
      `board/${boardId}/swimlane/${swimlaneId}/job-card/${jobCardId}`,
    );
  }

  async changeJobCardType(boardId, swimlaneId, jobCardId, data) {
    return this.put(
      `board/${boardId}/swimlane/${swimlaneId}/job-card/${jobCardId}/tracked`,
      data,
    );
  }

  async setJobCard(boardId, swimlaneId, data) {
    return this.post(`board/${boardId}/swimlane/${swimlaneId}/job-card`, data);
  }

  async setJobCardInactive(boardId, swimlaneId, data) {
    return this.post(
      `board/${boardId}/swimlane/${swimlaneId}/job-card/inactive`,
      data,
    );
  }

  async moveJobCard(boardId, jobCardId, data) {
    return this.put(`board/${boardId}/job-card/${jobCardId}/move`, data);
  }

  async setPositionJobCard(boardId, swimlaneId, data) {
    return this.put(
      `board/${boardId}/swimlane/${swimlaneId}/job-card/position`,
      data,
    );
  }

  async setSwimlaneColor(boardId, swimlaneId, data) {
    return this.put(`board/${boardId}/swimlane/${swimlaneId}/colorcode`, data);
  }

  async updateJobCard(boardId, swimlaneId, jobCardId, data) {
    return this.put(
      `board/${boardId}/swimlane/${swimlaneId}/job-card/${jobCardId}`,
      data,
    );
  }

  async createApplication(jobCardId, data) {
    return this.put(`/job-card/${jobCardId}/application`, data);
  }

  async updateApplication(jobCardId, data) {
    return this.put(`/job-card/${jobCardId}/application`, data);
  }

  async deleteApplication(jobCardId) {
    return this.delete(`/job-card/${jobCardId}/application`);
  }

  async deleteJobCard(boardId, swimlaneId, jobCardId) {
    return this.delete(
      `board/${boardId}/swimlane/${swimlaneId}/job-card/${jobCardId}`,
    );
  }

  async getTasks(jobCardId) {
    return this.get(`job-card/${jobCardId}/task`);
  }

  async getResume(jobCardId) {
    return this.get(`job-card/${jobCardId}/resume`);
  }

  async setResume(jobCardId, data) {
    return this.put(`job-card/${jobCardId}/resume`, data);
  }

  async setTask(jobCardId, data) {
    return this.post(`job-card/${jobCardId}/task`, data);
  }

  async editTask(jobCardId, taskId, data) {
    return this.put(`job-card/${jobCardId}/task/${taskId}`, data);
  }

  async deleteTask(jobCardId, taskId) {
    return this.delete(`job-card/${jobCardId}/task/${taskId}`);
  }

  async finishedTask(jobCardId, taskId, data) {
    return this.put(`job-card/${jobCardId}/task/${taskId}/finished`, data);
  }

  async getNotes(jobCardId) {
    return this.get(`job-card/${jobCardId}/note`);
  }

  async setNote(jobCardId, data) {
    return this.post(`job-card/${jobCardId}/note`, data);
  }

  async setPositionNote(jobCardId, data) {
    return this.put(`job-card/${jobCardId}/note/position`, data);
  }

  async editNote(jobCardId, noteId, data) {
    return this.put(`job-card/${jobCardId}/note/${noteId}`, data);
  }

  async deleteNote(jobCardId, noteId) {
    return this.delete(`job-card/${jobCardId}/note/${noteId}`);
  }

  async batchDeleteJobCards(jobCardIds) {
    return this.put('job-card/batch-delete', jobCardIds);
  }
}

export default new BoardService();
