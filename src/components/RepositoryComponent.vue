<template>
  <div v-if="repo" class="repo-wrapper">
    <span>Name: {{ repo.name }}</span>
    <span>Description: {{ repo.description = 'no data' }}</span>
    <span>is Fork: {{ repo.fork ? 'Yes' : 'No' }}</span>
    <span>Stars Cout: {{ repo.stargazers_count }}</span>
    <span>Last update: {{ repo.updated_at }}</span>
    <span>Language: {{ repo.language }}</span>
    <a :href="repo.html_url" target="_blank">Inspect</a>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * name
     * description
     * fork
     * stargazers_count
     * updated_at
     * language
     * htnl_url
     */
    repo: {
      type: Object
    }
  }
};
</script>
<style lang="scss">
.repo-wrapper {
  border: 1px solid #000;
  margin: 2em auto;
  span {
    display: block;
  }
}
</style>