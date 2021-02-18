import MovieController from '@/controllers/MovieController'

export default {
  methods: {
    createMovie(id, watched, event) {

      let target = getButtonNode(event)

      target.classList.toggle('is-loading')
      disableSiblings(target, true)

      MovieController
        .create(id, watched)
        .then(success => {
          if (success) {
            target.disabled = true
            target.classList.add('is-success')
          }
        })
        .then(() => {
          target.classList.toggle('is-loading')
          disableSiblings(target, false)
        })

    },
    updateMovie(id, data, event) {

      let target = getButtonNode(event)

      target.classList.toggle('is-loading')
      disableSiblings(target, true)

      return new Promise((resolve, reject) => {

        MovieController
          .update(id, data)
          .then(success => {
            if (success) {
              target.disabled = true
              target.classList.add('is-success')
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .then(() => {
            target.classList.toggle('is-loading')
            disableSiblings(target, false)
          })

      })

    },
    removeMovie(id, event) {

      let target = getButtonNode(event)

      target.classList.toggle('is-loading')
      disableSiblings(target, true)

      return new Promise((resolve, reject) => {

        MovieController
          .destroy(id)
          .then(success => {
            if (success) {
              target.disabled = true
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .then(() => {
            target.classList.toggle('is-loading')
            disableSiblings(target, false)
          })

      })

    },
    indexWatchedMovies(page) {
      return MovieController.index('watched', page).then(movies => movies)
    }
  }
}

// Helpers
function getButtonNode(event) {
  const path = event.path || (event.composedPath && event.composedPath())
  for (const node of path) {
    if (node.nodeName == 'BUTTON') {
      return node
      break
    }
  }
}

function disableSiblings(target, disabled) {
  let siblings = document.querySelectorAll(`[data-id='${target.dataset.id}']`)
  siblings.forEach(sibling => {
    if (!sibling.isSameNode(target) && !sibling.classList.contains('is-success')) {
      sibling.disabled = disabled
    }
  })
}
