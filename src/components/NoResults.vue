<template>
  <div class="container has-text-centered">
    <h1 class="title">{{ title }}</h1>
    <button class="button" @click="focusSearchBar" v-if="button.length">{{ button }}</button>
  </div>
</template>

<script>
export default {
  name: 'no-results',
  props: {
    title: {
      type: String,
      default: 'No results'
    },
    button: {
      type: String,
      default: ''
    }
  },
  methods: {
    focusSearchBar() {
      document.getElementById('search-bar').focus()
    }
  }
}
</script>
