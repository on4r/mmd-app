<template>
  <div class="section">

    <no-results v-if="!movies.length" title="No movies watched?" button="Add some!"></no-results>

    <div class="columns is-multiline">
      <div class="column is-2 animated fast" v-for="movie in movies" :ref="`column-${movie.id}`" :key="movie.id">
        <div class="box">
          <figure class="image is-3by4">
            <div class="overlay">
              <button class="button" @click="openModal(movie)">
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
              </button>
              <button class="button is-danger bottom-right" @click="confirmRemove(movie.id, $event)">
                <span class="icon is-small">
                  <i class="fas" :class="asksForConfirm(movie.id) ? 'fa-exclamation' : 'fa-trash'"></i>
                </span>
              </button>
            </div>
            <img class="blurred" :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" @load="unblur">
          </figure>
        </div>
      </div>
    </div>

    <div ref="triggerLoad"></div>

    <movie-modal
      ref="movieModal"
      :movie="modalMovie">
    </movie-modal>

  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import NoResults from '@/components/NoResults'
import MovieCard from '@/components/MovieCard'
import MovieModal from '@/components/MovieModal'
import MovieMethods from '@/mixins/MovieMethods'
import API from '@/services/API'

export default {
  name: 'watched',
  data() {
    return {
      movies: [],
      modalMovie: null,
      lastPage: null,
      currentPage: 1
    }
  },
  components: {
    MovieCard,
    DefaultLayout,
    NoResults,
    MovieModal
  },
  mixins: [MovieMethods],
  methods: {
    openModal(movie) {

      this.modalMovie = movie
      this.$refs.movieModal.open()

    },
    remove(id, event) {

      this.removeMovie(id, event).then(success => {
        if (success) {
          this.$refs[`column-${id}`][0].classList.add('fadeOut')
          setTimeout(() => {
            this.$refs[`column-${id}`][0].remove()
          }, 800)
        }
      })

    },
    loadMoreMovies() {

      this.indexWatchedMovies(this.currentPage).then(movies => {
        this.movies.push(...movies)
      })

    },
    unblur(event) {
      event.target.classList.add('loaded')
    }
  },
  mounted: function() {

    const callback = ([entry]) => {
      if (entry.isIntersecting) {
        if (this.currentPage == this.lastPage) {
          observer.disconnect()
          return
        }
        this.currentPage++
        this.loadMoreMovies()
      }
    }

    const config = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(callback, config)
    observer.observe(this.$refs['triggerLoad'])

  },
  beforeRouteEnter(to, from, next) {

    API.get('movies/watched', {
      params: {
        page: 1
      }
    }).then(response => {
      if (response.status === 200) {
        next(vm => {
          vm.lastPage = response.data.lastPage
          vm.movies = response.data.data
        })
      }
    }).catch(error => {
      next(error)
    })

  }
}
</script>

<style lang="scss">
  .box {
    padding: 0;
    overflow: hidden;
    &:hover {
      .overlay {
        display: flex;
      }
    }
  }
  .overlay {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .button.bottom-right {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
  .blurred {
    filter: blur(10px);
    transition: filter 0.3s ease-out;
  }
  .blurred.loaded {
    filter: blur(0);
  }
</style>
