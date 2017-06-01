import API from '@/services/API'

const Auth = {

  registerUser(email, password) {

    return API
      .post('auth/register', { email, password })
      .then(({ data, status }) => {
        setToken(data.token)
      })
      .catch(({ response }) => {
        throw {
          field: response.data.field,
          message: response.data.message
        }
      })

  },

  loginUser(email, password) {

    return API
      .post('auth/login', { email, password })
      .then(({ data, status }) => {
        setToken(data.token)
      })
      .catch(({ response }) => {
        throw {
          field: response.data[0].field,
          message: response.data[0].message
        }
      })

  },

  logoutUser() {
    sessionStorage.removeItem('jwt')
    API.defaults.headers.common['Authorization'] = ''
  },

  isLoggedIn() {
    const jwt = sessionStorage.getItem('jwt') || ''
    return jwt.length ? true : false
  }

}

export default Auth

function setToken(token) {
  sessionStorage.setItem('jwt', token)
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
