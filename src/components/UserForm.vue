<template>
  <form @submit.prevent="submitForm">

    <div class="field">

      <label class="label" for="email">E-Mail</label>

      <div class="control has-icons-left has-icons-right">

        <span class="icon is-left">
          <i class="fas fa-envelope"></i>
        </span>

        <input class="input" type="email" name="email"
          v-model="email"
          :class="statusClass('email')"
          required>

        <span class="icon is-right">
          <i class="fas" :class="iconRight('email')"></i>
        </span>

      </div>

      <p class="help is-danger" v-if="formErrors.email.length">
        {{ formErrors.email }}
      </p>

    </div>

    <div class="field">

      <label class="label" for="password">Password</label>

      <div class="control has-icons-left has-icons-right">

        <span class="icon is-left">
          <i class="fas fa-lock"></i>
        </span>

        <input class="input" type="password" name="password"
          v-model="password"
          :class="statusClass('password')"
          required>

        <span class="icon is-right">
          <i class="fas" :class="iconRight('password')"></i>
        </span>

      </div>

      <p class="help is-danger" v-if="formErrors.password.length">
        {{ formErrors.password }}
      </p>

    </div>

    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-link" type="submit"
          :class="[loading ? 'is-loading' : '', success ? 'is-success' : '']">
          {{ submitButtonText }}
        </button>
      </div>
    </div>

  </form>
</template>

<script>
export default {
  name: 'user-form',
  data() {
    return {
      email: null,
      password: null,
      successIcon: 'fa-check',
      successClass: 'is-success',
      errorIcon: 'fa-exclamation-triangle',
      errorClass: 'is-danger'
    }
  },
  props: {
    submitButtonText: {
      type: String,
      required: true
    },
    formErrors: Object,
    loading: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    iconRight(type) {
      return this.success ? this.successIcon : this.formErrors[type].length ? this.errorIcon : ''
    },
    statusClass(type) {
      return this.success ? this.successClass : this.formErrors[type].length ? this.errorClass : ''
    },
    submitForm() {
      this.$emit('submit', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .is-success {
    pointer-events: none;
  }
</style>
