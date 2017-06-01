<template>
  <div class="field has-addons">
    <p class="control">
      <input class="input" id="search-bar" type="text" placeholder="Find Movies"
        v-model="query"
        @keydown.enter="search">
    </p>
    <p class="control">
      <button class="button" :class="loading ? 'is-loading' : ''" @click="search" :disabled="!query.length">
        <span class="icon">
          <i class="fas fa-search"></i>
        </span>
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  data() {
    return {
      query: '',
      loading: false
    }
  },
  methods: {
    resetLoading() {
      this.loading = false
    },
    search() {
      this.loading = true
      this.$router.push(
        {
          name: 'search',
          query: { query: this.query }
        },
        this.resetLoading, // onComplete
        this.resetLoading // onAbort
      )
    }
  }
}
</script>
