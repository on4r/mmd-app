<template>
  <div class="container">
    <div class="row" style="margin-bottom: 20px;">
      <div class="col-sm-6 col-sm-offset-3">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Movietitle..." v-model="searchString" v-on:keyup.enter="startSearch">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" v-on:click="startSearch">Search</button>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <movie v-for="(movie, index) in searchResults" :key="movie.id" :movie="movie" :index="index" :searchResults="searchResults" :curList="-1"></movie>
    </div>
  </div>
</template>

<script>
export default {
  // el: "#movie-search",
  data: function() {
    return {
      searchString: "",
      searchResults: []
    }
  },
  methods: {
    startSearch: function() {
      var xhr = new XMLHttpRequest();
      var that = this;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          that.searchResults = JSON.parse(this.responseText).results.sort(function(a, b) {
            return new Date(b.release_date) - new Date(a.release_date);
          });
        }
      });

      xhr.open("GET", "http://localhost:61008/search/" + this.searchString);
      xhr.send();
    }
  }
}
</script>
