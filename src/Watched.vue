<template>
  <div class="container">
    <div class="row">
    <movie v-for="(movie, index) in movies" :key="movie.id" :movie="movie" :curList="0"></movie>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      movies: []
    }
  },
  created: function() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies: function() {
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.open('GET', "http://localhost:61008/movies/watched", true);
      xhr.onload = function () {
        that.movies = JSON.parse(xhr.responseText);
      }
      xhr.send();
    }
  }
}
</script>
