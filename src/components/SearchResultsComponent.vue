<template>
  <div class="search-result-wrapper">
    <!-- sort -->
    <div>
      <label for="sort-select">Sort by:</label>
      <select name="sort-select" id="sort-select" v-model="sort">
        <option value="name">Repo name</option>
        <option value="stars">Stars count</option>
      </select>
    </div>

    <!-- filters -->
    <div>
      <div>
        <label for="filter-stars">Filter by minimum stars:</label>
        <input type="number" name="filter-stars" id="filter-stars" v-model="filters.minStars">
      </div>
      <div>
        <label for="filter-type">Filter by type:</label>
        <select type="number" name="filter-type" id="filter-type" v-model="filters.type">
          <option value="all">All</option>
          <option value="forks">Forks</option>
          <option value="sources">Sources</option>
        </select>
      </div>
    </div>

    <!-- Repo List -->
    <div>
      <repo v-for="repo in repos" :key="repo.id" :repo="repo"/>
    </div>

    <!-- Load More -->
    <div v-if="reposCount >= 30 && successOnPrevRequest">
      <button @click="loadMore">Load More</button>
    </div>
  </div>
</template>

<script>
import RepositoryComponent from "./RepositoryComponent.vue";
export default {
  props: ["RemoteDataClass"],
  data() {
    return {
      sort: "name",
      filters: {
        minStars: 0,
        type: "all"
      },
      maxCountPerPage: 30, //need to move to the config file
      successOnPrevRequest: true
    };
  },
  computed: {
    repos: function() {
      try {
        return this.$store.state.repos
          .filter(this.typeFilter)
          .filter(this.starredFilter)
          .sort(this[`${this.sort}Sort`]);
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    reposCount: function() {
      return this.$store.state.repos.length;
    }
  },
  methods: {
    typeFilter(repo) {
      return this.filters.type == "forks"
        ? repo.fork
        : this.filters.type == "sources"
        ? !repo.fork
        : true;
    },
    starredFilter(repo) {
      return repo.stargazers_count >= this.filters.minStars;
    },
    nameSort(repo1, repo2) {
      return repo1.name.localeCompare(repo2.name);
    },
    starsSort(repo1, repo2) {
      return +repo2.stargazers_count - +repo1.stargazers_count;
    },
    loadMore() {
      let lastRequest = this.$store.state.lastRequest;
      let that = this;
      if (lastRequest) {
        lastRequest.page++;
        let promise = lastRequest.mode == "user"
          ? this.RemoteDataClass.getUserRepos(lastRequest.searchStr, lastRequest.page)
          : this.RemoteDataClass.getOrgRepos(lastRequest.searchStr, lastRequest.page);
        
        promise
          .then(data => {
            that.$store.commit("setLastRequest", lastRequest);
            if (data.data && data.data.length) {
              that.$store.commit("pushRepos", data.data);
            } else {
              that.successOnPrevRequest = false;
            }
          })
          .catch(e => {
            console.log(e);
            that.successOnPrevRequest = false;
          });
      }
    }
  },
  components: {
    repo: RepositoryComponent
  }
};
</script>
