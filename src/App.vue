<template>
  <div id="app">
    <search :remote-data-class='RemoteDataClass'/>
    <results :remote-data-class='RemoteDataClass'/>
  </div>
</template>

<script>
import RemoteDataClass from "@/net.js";
import SearchComponent from './components/SearchComponent.vue'
import SearchResultsComponent from './components/SearchResultsComponent.vue'

export default {
  name: 'app',
  data() {
    return {
      RemoteDataClass: null
    }
  },
  components: {
    search: SearchComponent,
    results: SearchResultsComponent
  },
  created() {
    this.RemoteDataClass = new RemoteDataClass("https://api.github.com");     //move it to global directive
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
