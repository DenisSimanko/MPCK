import axios from 'axios';

export default class RemoteDataClass {
  // send: function(str) {
  //   const path = 'https://api.github.com'
  //   return axios.get(`${path}/orgs/${str}/repos`);
  // }
  constructor(url) {
    this._url = url;
    this._client = axios;
  }

  getUserRepos(name, page = 1) {
    let url = this._createPath(name, true, page);
    return this._get(url);
  }

  getOrgRepos(name, page = 1) {
    let url = this._createPath(name, false, page);
    return this._get(url);
  }

  _createPath(name, isUser, page) {
    if (!name) {
      return '';
    }
    return isUser
      ? `${this._url}/users/${encodeURIComponent(name)}/repos?page=${page}&per_page=30`
      : `${this._url}/orgs/${encodeURIComponent(name)}/repos?page=${page}&per_page=30`;

  }

  _get(url) {
    return url
      ? this._client.get(url)
      : Promise.reject('smth went wrong');
  }


} 