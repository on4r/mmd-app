<template>
  <div class="section">

    <no-results v-if="!movies.length" title="No movies watched?" button="Add some!"></no-results>

    <div class="columns is-multiline">
      <div class="column is-2" v-for="movie in movies">
        <div class="box">
          <figure class="image is-3by4">
            <div class="overlay">
              <button class="button" @click="openModal(movie)">
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
              </button>
            </div>
            <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path">
          </figure>
        </div>
      </div>
    </div>

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
import API from '@/services/API'

export default {
  name: 'watched',
  data() {
    return {
      movies: [],
      modalMovie: null
    }
  },
  components: {
    MovieCard,
    DefaultLayout,
    NoResults,
    MovieModal
  },
  methods: {
    openModal(movie) {

      this.modalMovie = movie
      this.$refs.movieModal.open()

    }
  },
  beforeRouteEnter(to, from, next) {

    API.get('movies/watched')
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
</style>
