<template>
  <default-layout>
    <div class="columns">
      <div class="column is-4 is-offset-4">

        <h1 class="title">Create New Account</h1>

        <user-form
          submitButtonText="Register"
          @submit="register"
          :loading="loading"
          :success="success"
          :formErrors="formErrors">
        </user-form>

      </div>
    </div>
  </default-layout>
</template>

<script>
import Auth from '@/services/Auth'
import UserForm from '@/components/UserForm'
import DefaultLayout from '@/layouts/DefaultLayout'

export default {
  name: 'register',
  data() {
    return {
      loading: false,
      success: false,
      formErrors: {
        email: '',
        password: '',
      }
    }
  },
  components: {
    UserForm,
    DefaultLayout
  },
  methods: {
    clearFormErrors() {
      this.formErrors['email'] = ''
      this.formErrors['password'] = ''
    },
    register({ email, password }) {

      this.loading = true

      Auth.registerUser(email, password)
        .then(success => {
          this.clearFormErrors()
          this.success = true
          setTimeout(() => {
            this.$router.push('plan-to-watch')
          }, 1000)
        }, error => {
          this.clearFormErrors()
          this.formErrors[error.field] = error.message
        })
        .then(() => {
          this.loading = false
        })

    }
  }
}
</script>
