<template>
  <div ref="theModal" class="modal animated fadeIn faster" :class="active ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-card" v-if="movie">

        <header class="modal-card-head">
          <p class="modal-card-title">{{ movie.title }}</p>
          <button class="delete" aria-label="close" @click="close"></button>
        </header>

        <section class="modal-card-body">
          <div class="field">
            <label class="label">Rating</label>
            <div class="control">
              <star-rating
                v-model="movie.rating"
                :max-rating="10"
                :star-size="30"
                :increment="0.5"></star-rating>
            </div>
          </div>

          <div class="field">
            <label class="label">Comment</label>
            <div class="control">
              <textarea class="textarea" placeholder="Your toughts about this movie?"
                v-model="movie.comment"></textarea>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button ref="saveButton" class="button is-success animated" @click="submitForm">Save</button>
          <button class="button" @click="close">Cancel</button>
        </footer>

    </div>
  </div>
</template>

<script>
import MovieController from '@/controllers/MovieController'
import StarRating from 'vue-star-rating'

export default {
  name: 'movie-modal',
  data() {
    return {
      rating: null,
      comment: null,
      active: false,
      loading: false,
      success: false
    }
  },
  props: {
    movie: {
      type: Object,
      default: {}
    }
  },
  components: {
    StarRating
  },
  methods: {
    open(callback) {
      this.$refs.theModal.classList.remove('fadeOut')
      this.active = true
      this.callback = callback
    },
    close(cancel = true) {
      clearTimeout(this.closeAfterSaveTimout)
      this.$refs.theModal.classList.add('fadeOut')
      setTimeout(() => {
        this.active = false
        this.$refs.saveButton.innerText = 'Save'
        this.$refs.saveButton.classList.remove('tada')
        if (typeof this.callback === 'function' && !cancel) {
          this.callback()
        }
      }, 500)
    },
    submitForm() {

      this.loading = true

      MovieController.update(this.movie.id, {
        watched: true,
        rating: this.movie.rating,
        comment: this.movie.comment
      }).then(success => {
        this.loading = false
        if (success) {
          this.$refs.saveButton.innerText = 'Saved!'
          this.$refs.saveButton.classList.add('tada')
          this.closeAfterSaveTimout = setTimeout(() => {
            this.close(false)
          }, 2000)
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
  .tada {
    pointer-events: none;
  }
  .modal-card-foot {
    justify-content: flex-end;
  }
</style>
