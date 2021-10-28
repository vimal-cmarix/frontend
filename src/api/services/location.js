import API from '../index';

class LocationService extends API {
  constructor() {
    super(API);
  }

  async getTimezones(query) {
    return this.get(
      `/timezone?limit=${query.limit}${
        query.query ? `&query=${query.query}` : ''
      }`,
    );
  }

  async getCountries(query) {
    return this.get(`/location/country?limit=${query.limit}&order=ASC`);
  }

  async getStates(query) {
    return this.get(
      `/location/state?limit=${query.limit}&countryId=${query.countryId}&order=ASC`,
    );
  }

  async getCities(query) {
    return this.get(
      `/location/city?limit=${query.limit}&countryId=${query.countryId}&stateId=${query.stateId}&order=ASC`,
    );
  }

  async getCitiesName(query) {
    return this.get(
      `/location/city?limit=${query.limit}&countryId=${query.countryId}&query=${query.name}&order=ASC`,
    );
  }
}

export default new LocationService();
