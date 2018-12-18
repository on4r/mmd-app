import API from '@/services/API'
import Notifications from '@/services/Notifications'

const MovieController = {
  search(query) {

    return API.get(`search/${query}`)
      .then(response => {
        if (response.status === 200) {
          return response.data.results
        } else {
          return []
        }
      })
      .catch(error => {
        throw error
      })

  },
  create(id, watched) {

    return API.post('movies', { id, watched })
      .then(response => {
        return (response.status === 200) ? true : false
      })
      .catch(error => {
        Notifications.error(error.response.data.message)
      })

  },
  update(id, { watched, rating, comment }) {

    return API.patch(`movies/${id}`, { watched, rating, comment })
      .then(response => {
        return (response.status === 200) ? true : false
      })
      .catch(error => {
        Notifications.error(error.response.data.message)
      })

  },
  destroy(id) {

    return API.delete(`movies/${id}`)
      .then(response => {
        return (response.status === 200) ? true : false
      })
      .catch(error => {
        Notifications.error(error.response.data.message)
      })

  }
}

export default MovieController
