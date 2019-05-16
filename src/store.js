import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    lastRequest: null
  },
  mutations: {
    setRepos: function (state, repos) {
      state.repos = repos;
    },
    setLastRequest: function (state, data) {
      state.lastRequest = data;
    },
    pushRepos: function (state, repos) {
      let res = state.repos.concat(repos);
      console.log(res);
      state.repos = res;
    }
  }
})
