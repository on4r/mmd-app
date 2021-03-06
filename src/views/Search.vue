<template>
  <default-layout>

    <no-results v-if="!results.length" title="No search results"></no-results>

    <div class="columns is-multiline">
      <div class="column is-4" v-for="movie in results">
        <movie-card :movie="movie" :key="movie.id">

          <template slot="card-image" v-if="movie.poster_path">
            <figure class="image is-3by4">
              <img :src="'https://image.tmdb.org/t/p/w400' + movie.poster_path">
            </figure>
          </template>

          <template slot="card-content">
            <div class="tags">
              <div class="tag is-light" v-for="genre in movie.genre_ids">{{ genre | toName }}</div>
            </div>
          </template>

          <template slot="card-footer">
            <div class="card-footer-item">
              <button class="button" @click="planToWatch(movie.id, $event)" :data-id="movie.id">
                <span class="icon">
                  <i class="fas fa-bookmark"></i>
                </span>
                <span>Plan to Watch</span>
              </button>
            </div>

            <div class="card-footer-item">
              <button class="button" @click="rewatch(movie.mmdbID, $event)" :data-id="movie.mmdbID" v-if="toRewatch.includes(movie.mmdbID)">
                <span class="icon">
                  <i class="fas fa-redo"></i>
                </span>
                <span>Rewatch</span>
              </button>
              <button class="button" @click="watched(movie.id, $event)" :data-id="movie.id" v-else>
                <span class="icon">
                  <i class="fas fa-eye"></i>
                </span>
                <span>Watched</span>
              </button>
            </div>
          </template>

        </movie-card>
      </div>
    </div>

  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import NoResults from '@/components/NoResults'
import MovieCard from '@/components/MovieCard'
import MovieController from '@/controllers/MovieController'
import MovieMethods from '@/mixins/MovieMethods'

export default {
  name: 'search',
  data() {
    return {
      results: [],
      toRewatch: []
    }
  },
  components: {
    MovieCard,
    DefaultLayout,
    NoResults
  },
  mixins: [MovieMethods],
  methods: {
    sortResults(property, order) {

      this.results.sort((a,b) => {

        if (order === 'desc') {
          return b[property] - a[property]
        } else if (order === 'asc') {
          return a[property] - b[property]
        } else {
          return 0
        }

      })

    },
    planToWatch(id, event) {
      this.createMovie(id, false, event).then(res => {
        if (res.rewatch) {
          let movie = this.results.find(movie => movie.id === id)
          movie.mmdbID = res.id
          this.toRewatch.push(res.id)
        }
      })
    },
    watched(id, event) {
      this.createMovie(id, true, event).then(res => {
        if (res.rewatch) {
          let movie = this.results.find(movie => movie.id === id)
          movie.mmdbID = res.id
          this.toRewatch.push(res.id)
        }
      })
    },
    rewatch(id, event) {
      this.updateMovie(id, { watched: false }, event)
    }
  },
  created() {
    this.sortResults('popularity', 'desc')
  },
  beforeRouteEnter(to, from, next) {

    MovieController.search(to.query.query)
      .then(results => {
        next(vm => {
          vm.results = results
        })
      })
      .catch(error => {
        next(error)
      })

  },
  beforeRouteUpdate(to, from, next) {

    MovieController.search(to.query.query)
      .then(results => {
        this.results = results
        next()
      })
      .catch(error => {
        next(error)
      })

  }
}
</script>
