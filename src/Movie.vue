<template>
  <div class="col-sm-8 col-sm-offset-2">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">{{ movie.title }}<small class="pull-right">{{ movie.release_date }}</small></div>
      </div>
      <div class="panel-body">
        <div class="col-sm-4">
          <img v-if="movie.poster_path" v-bind:src="'http://image.tmdb.org/t/p/w300'+ movie.poster_path " class="img-responsive" alt="Responsive image">
        </div>
        <div class="col-sm-8">
          <p>
            <span class="label label-default" v-for="genre_id in movie.genre_ids">
              {{ genre_id | toName }}
            </span>
          </p>
          <p>{{ movie.overview | shorten }}</p>
        </div>
      </div>
      <div class="panel-footer">
          <template v-if="curList == -1">
            <div class="text-right">
              <button type="button" class="btn btn-default" @click="addToList(1, index, $event)">Plan to Watch</button>
              <button type="button" class="btn btn-default" @click="addToList(0, index, $event)">Watched</button>
            </div>
          </template>
          <template v-if="curList == 0">
            <div class="text-right">
              <button type="button" class="btn btn-danger" @click="removeFromList(movie.id, $event)">Remove</button>
            </div>
          </template>
          <template v-if="curList == 1">
            <div class="text-right">
              <button type="button" class="btn btn-default" @click="markAsWatched(movie.id, $event)">Mark as Watched</button>
              <button type="button" class="btn btn-danger" @click="removeFromList(movie.id, $event)">Remove</button>
            </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
var genres_en = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];

var genres_de = [{"id":28,"name":"Action"},{"id":12,"name":"Abenteuer"},{"id":16,"name":"Animation"},{"id":35,"name":"Komödie"},{"id":80,"name":"Krimi"},{"id":99,"name":"Dokumentarfilm"},{"id":18,"name":"Drama"},{"id":10751,"name":"Familie"},{"id":14,"name":"Fantasy"},{"id":36,"name":"Historie"},{"id":27,"name":"Horror"},{"id":10402,"name":"Musik"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Liebesfilm"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV-Film"},{"id":53,"name":"Thriller"},{"id":10752,"name":"Kriegsfilm"},{"id":37,"name":"Western"}];

// Create a map for
// -> genre ids : genre names
var genresIDtoName = {};
for (var i = 0; i < genres_de.length; i++) {
  genresIDtoName[genres_de[i].id] = genres_de[i].name;
}

export default {
  props: ["movie", "index", "searchResults", "curList"],
  data: function() {
    return {}
  },
  filters: {
    shorten: function(string) {
      return string.substring(0, 250) + "...";
    },
    toName: function(genreID) {
      return genresIDtoName[genreID];
    }
  },
  methods: {
    addToList: function(list_id, movie_index, event) {
      var newEntry = this.searchResults[movie_index];
      newEntry.list_id = list_id;

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var res = JSON.parse(xhr.response);
          if (res.error == false) {
            event.target.disabled = true;
            event.target.classList.remove("btn-default");
            event.target.classList.add("btn-success");
            event.target.innerText = "Added to List!";
          } else {
            event.target.disabled = true;
            event.target.classList.remove("btn-default");
            event.target.classList.add("btn-danger");
            event.target.innerText = "Already in List!";
          }
        }
      }
      xhr.open("POST", "http://kael.kaus.uberspace.de/my-movie-db/api/movies", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(newEntry));
    },
    markAsWatched: function(movie_id, event) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var res = JSON.parse(xhr.response);
          if (res.error == false) {
            event.target.disabled = true;
            event.target.classList.remove("btn-default");
            event.target.classList.add("btn-success");
            event.target.innerText = "Marked as Watched!";
          } else {
            alert("movie already in List 'watched'");
          }
        }
      }
      xhr.open("PATCH", "http://kael.kaus.uberspace.de/my-movie-db/api/movies/"+movie_id, true);
      xhr.send();
    },
    removeFromList: function(movie_id, event) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var res = JSON.parse(xhr.response);
          if (res.error == false) {
            event.target.disabled = true;
            event.target.classList.remove("btn-danger");
            event.target.classList.add("btn-success");
            event.target.innerText = "Removed!";
          } else {
            alert("movie already deleted!");
          }
        }
      }
      xhr.open("DELETE", "http://kael.kaus.uberspace.de/my-movie-db/api/movies/"+movie_id, true);
      xhr.send();
    }
  }
}
</script>

<style>
  .label {
    margin-right: 5px;
  }
</style>
