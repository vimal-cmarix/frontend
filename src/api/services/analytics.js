import API from '../index';

class AnalyticsService extends API {
  constructor() {
    super('analytics');
  }

  async getMetrics(filters) {
    const query = new URLSearchParams(filters).toString();
    return this.get(`/metrics?${query}`);
  }

  async getInsights(slug, filters) {
    const query = new URLSearchParams(filters).toString();
    return this.get(`insights/${slug}?${query}`);
  }

  async getPresentationInsights(presentationId, filters) {
    const query = new URLSearchParams(filters).toString();
    return this.get(`insights/presentation/${presentationId}?${query}`);
  }

  ANALYTICS_PLANS_E_IDS = {
    ONE_MONTH: 'mbtg',
    SIX_MONTHS: 'mk26',
    TWELVE_MONTHS: '6mnw',
  };
}

export default new AnalyticsService();
