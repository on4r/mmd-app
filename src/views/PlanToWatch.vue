<template>
  <default-layout>

    <no-results v-if="!movies.length"
      title="No movies planed to watch yet"
      button="Lets change that!"></no-results>

    <div class="tabs is-toggle is-toggle-rounded is-centered" v-if="movies.length">
      <ul>
        <li :class="releaseSort != 0 ? 'is-active': ''">
          <a @click="releaseClicked">
            <span>Release Date</span>
            <span class="icon is-small">
              <i class="fas"
                :class="releaseClass"></i>
            </span>
          </a>
        </li>
      </ul>
    </div>

    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2 animated fast" v-for="movie in sortedMovies" :ref="`column-${movie.id}`">
        <movie-card :movie="movie">

          <template slot="card-header-icon">
            <div class="dropdown is-left is-hoverable">

              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>

              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" target="_blank"
                    :href="youtubeLink(movie)">View on YouTube</a>
                  <a class="dropdown-item" target="_blank"
                    v-if="movie.imdb_id"
                    :href="imdbLink(movie)">View on Imdb</a>
                  <a class="dropdown-item" target="_blank"
                    :href="justwatchLink(movie)">View on JustWatch</a>
                  <a class="dropdown-item" target="_blank"
                    :href="findStreamLink(movie)">Find Stream</a>
                </div>
              </div>

            </div>
          </template>

          <template slot="card-content">
            <div class="media">

              <div class="media-left" v-if="movie.poster_path">
                <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path">
              </div>

              <div class="media-content">
                <div class="tags">
                  <div class="tag is-light" v-for="genre in movie.genres">{{ genre | toName }}</div>
                </div>
                <div class="content">
                  {{ movie.overview }}
                </div>
              </div>

            </div>
          </template>

          <template slot="card-footer">
            <div class="card-footer-item">
              <button class="button is-info is-inverted" @click="markAsWatched(movie)" :data-id="movie.id">
                <span class="icon">
                  <i class="fas fa-eye"></i>
                </span>
                <span>Watched</span>
              </button>
            </div>

            <div class="card-footer-item">
              <button class="button is-danger is-inverted" @click="remove(movie.id)" :data-id="movie.id">
                <span class="icon">
                  <i class="fas fa-trash"></i>
                </span>
                <span>Remove</span>
              </button>
            </div>
          </template>

        </movie-card>
      </div>
    </div>

    <movie-modal
      ref="movieModal"
      :movie="modalMovie">
    </movie-modal>

  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import NoResults from '@/components/NoResults'
import MovieCard from '@/components/MovieCard'
import MovieModal from '@/components/MovieModal'
import MovieMethods from '@/mixins/MovieMethods'
import API from '@/services/API'

export default {
  name: 'plan-to-watch',
  data() {
    return {
      movies: [],
      modalMovie: null,
      releaseSort: 0
    }
  },
  components: {
    MovieCard,
    DefaultLayout,
    NoResults,
    MovieModal
  },
  mixins: [MovieMethods],
  computed: {
    releaseClass() {
      switch (this.releaseSort) {
        case 0:
          return 'fa-sort'
        case 1:
          return 'fa-sort-down'
        case 2:
          return 'fa-sort-up'
      }
    },
    sortedMovies() {

      return this.movies.sort((a, b) => {
        switch (this.releaseSort) {
          case 0:
            return new Date(a['created_at']) - new Date(b['created_at'])
          case 1:
            return new Date(b['release_date']) - new Date(a['release_date'])
          case 2:
            return new Date(a['release_date']) - new Date(b['release_date'])
        }
      })

    }
  },
  methods: {
    releaseClicked() {
      // 0 - no sort
      // 1 - desc
      // 2 - asc
      if (this.releaseSort === 2) {
        this.releaseSort = 0
      } else {
        this.releaseSort++
      }

    },
    markAsWatched(movie) {
      this.updateMovie(movie.id, {watched: true})
        .then(success => {
          if (success) {
            this.modalMovie = movie
            this.$refs.movieModal.open(onClose => {
              this.$refs[`column-${movie.id}`][0].classList.add('fadeOutRight')
              setTimeout(() => {
                this.$refs[`column-${movie.id}`][0].remove()
              }, 800)
            })
          }
        })
    },
    remove(id) {
      this.removeMovie(id).then(success => {
        if (success) {
          this.$refs[`column-${id}`][0].classList.add('fadeOutDown')
          setTimeout(() => {
            this.$refs[`column-${id}`][0].remove()
          }, 800)
        }
      })
    },
    youtubeLink(movie) {
      const year = this.$options.filters.toYear(movie.release_date)
      return `https://www.youtube.com/results?search_query=${movie.title} ${year} trailer`
    },
    imdbLink(movie) {
      return 'https://www.imdb.com/title/' + movie.imdb_id
    },
    findStreamLink(movie) {
      return 'https://www.google.com/search?q=' + movie.title + ' stream hd'
    },
    justwatchLink(movie) {
      return 'https://www.justwatch.com/de/Suche?q=' + movie.title
    }
  },
  beforeRouteEnter(to, from, next) {

    API.get('movies/plan-to-watch')
      .then(response => {
        if (response.status === 200) {
          next(vm => {
            vm.movies = response.data
          })
        }
      })
      .catch(error => {
        next(error)
      })

  }
}
</script>
