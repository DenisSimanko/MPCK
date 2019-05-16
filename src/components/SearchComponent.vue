<template>
  <div class="search-wrapper">
    <div class='radios'>
      <div>
        <input id="radio-user" type="radio" value="user" v-model="mode">
        <label for="radio-user">User</label>
      </div>
      <div>
        <input id="radio-org" type="radio" value="org" v-model="mode">
        <label for="radio-org">Organization</label>
      </div>
    </div>
    <div class='input-block'>
      <input placeholder="repo" type="text" v-model="searchStr">
      <button :disabled="!isSearchStrValid" @click="search">Search</button>
      <!-- <button @click="search">Search</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['RemoteDataClass'],
  data() {
    return {
      mode: "org",
      searchStr: "angular",
    };
  },
  computed: {
    isSearchStrValid: function() {
      try {
        //add other checks
        if (this.searchStr) {
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    repos: function() {
      return this.$store.state.repos;
    }
  },
  methods: {
    search: function() {
      let promise = this.mode == "user"
          ? this.RemoteDataClass.getUserRepos(this.searchStr)
          : this.RemoteDataClass.getOrgRepos(this.searchStr);
      this.searchResponseHandler(promise);
      let lastRequest = {
        mode: this.mode,
        searchStr: this.searchStr,
        page: 1
      }
      this.$store.commit('setLastRequest', lastRequest);
    },
    searchResponseHandler: function(promise) {
      try {
        promise
          .then(response => {
            if (response.data && response.data.length) {
              this.$store.commit("setRepos", response.data);
            } else {
              alert('No data for this request');
            }
          })
          .catch(e => {
            alert('No data for this request');
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss">
.search-wrapper {
  width: 40%;
  margin: 0 auto;
  .radios {
    display: flex;
    justify-content: space-between;
  }
  .input-block {
    width: 100%;
  }
}
</style>
