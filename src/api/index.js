import axios from 'axios';
import cookie from 'js-cookie';
import { logout } from '@utils/auth';
import jwtDecode from 'jwt-decode';

class API {
  constructor(type) {
    this.authBearerKey = `${process.env.PROJECT_NAME}-token`;

    this.token = null;
    this.jwt = {};

    this.service = axios.create({
      baseURL: API.host(type),
      timeout: 30000,
    });

    this.readCredentials();
  }

  static host(type) {
    switch (type) {
      case 'applicant':
        return process.env.API_URL_APPLICANT;

      case 'payment':
        return process.env.API_URL_PAYMENT;

      case 'analytics':
        return process.env.API_URL_ANALYTICS;

      default:
        return process.env.API_URL_APPLICANT;
    }
  }

  static handleError(response) {
    if (!response || response.status === 403) {
      const excludedPaths = ['/signin', '/signup'];
      if (
        !excludedPaths.find(path => window.location.pathname.endsWith(path))
      ) {
        logout();
      }
    }
  }

  setBearer() {
    this.service.defaults.headers.common.Authorization = this.token
      ? `Bearer ${this.token}`
      : '';
  }

  readCredentials() {
    this.token = cookie.get(this.authBearerKey) || '';
    this.jwt = this.token ? jwtDecode(this.token) : {};
    this.setBearer();
  }

  async head(resource, params) {
    this.readCredentials();

    return this.service.head(resource, params).catch(error => {
      const { response } = error;
      API.handleError(response);
      throw response;
    });
  }

  async get(resource, params) {
    this.readCredentials();

    return this.service.get(resource, params).catch(error => {
      const { response } = error;
      API.handleError(response);
      throw response;
    });
  }

  async post(resource, params) {
    console.log('param', params, resource);
    this.readCredentials();

    return this.service.post(resource, params).catch(error => {
      console.log('error', error);
      const { response } = error;
      API.handleError(response);
      console.log('res...', response);
      throw response;
    });
  }

  async put(resource, params) {
    this.readCredentials();

    return this.service.put(resource, params).catch(error => {
      const { response } = error;
      API.handleError(error);
      throw response;
    });
  }

  async delete(resource, params) {
    this.readCredentials();

    return this.service.delete(resource, params).catch(error => {
      const { response } = error;
      API.handleError(response);
      throw response;
    });
  }

  async patch(resource, params) {
    this.readCredentials();

    return this.service.patch(resource, params).catch(error => {
      API.handleError(error);
      throw JSON.stringify(error.response);
    });
  }
}

export default API;
