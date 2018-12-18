<template>
  <default-layout>
    <h1 class="title has-text-centered">Page not found</h1>
    <p class="subtitle has-text-centered">
      <router-link to="/">Take me home</router-link>
    </p>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
export default {
  name: 'NotFound',
  components: {
    DefaultLayout
  }
}
</script>
