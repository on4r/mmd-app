<template>
  <div class="card">

    <div class="card-header">

      <div class="card-header-title">
        <div>
          <h3 class="title is-5 movie-title"
            :class="differentTitles ? 'can-toggle' : ''"
            @click="showOriginalTitle = !showOriginalTitle">
            <span class="localized" v-if="!showOriginalTitle">{{ movie.title }}</span>
            <span class="original" v-if="showOriginalTitle">{{ movie.original_title }}</span>
          </h3>
          <p class="subtitle is-7" v-if="movie.release_date">{{ movie.release_date | toYear }}</p>
        </div>
      </div>

      <div class="card-header-icon">
        <slot name="card-header-icon"></slot>
      </div>

    </div>

    <div class="card-image">
      <slot name="card-image"></slot>
    </div>

    <div class="card-content">
      <slot name="card-content"></slot>
    </div>

    <div class="card-footer">
      <slot name="card-footer"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'movie-card',
  data() {
    return {
      showOriginalTitle: false
    }
  },
  props: ['movie'],
  computed: {
    differentTitles() {
      return (this.movie.title != this.movie.original_title)
    }
  }
}
</script>

<style lang="scss">
.movie-title {
  cursor: default;
  &.can-toggle {
    cursor: pointer;
  }
}
</style>
