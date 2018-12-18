<template>
  <div id="app">

  	<nav class="navbar is-warning is-fixed-top" role="navigation" aria-label="main navigation">

      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" exact>
          <span class="icon is-medium">
            <i class="fas fa-film fa-lg"></i>
          </span>
          <h1 class="has-text-weight-bold">My Movie DB</h1>
        </router-link>
        <a role="button" class="navbar-burger burger"
          aria-label="menu" aria-expanded="false" data-target="mainNavbar" @click="mobileMenuOpen = !mobileMenuOpen">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="mainNavbar" :class="mobileMenuOpen ? 'is-active' : ''">

        <div class="navbar-start" v-if="Auth.isLoggedIn()">
          <div class="navbar-item"><search-bar></search-bar></div>
          <router-link class="navbar-item" to="plan-to-watch">Plan to Watch</router-link>
          <router-link class="navbar-item" to="watched">Watched</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item" v-if="Auth.isLoggedIn()">
            <button class="button" @click="Auth.logoutUser(); $router.push('/')">
                <span class="icon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Logout</span>
            </button>
          </div>
          <div class="navbar-item" v-if="!Auth.isLoggedIn()">
            <div class="buttons">
              <router-link class="button is-warning" to="register">Register</router-link>
              <router-link class="button" to="login">
                <span class="icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>Login</span>
              </router-link>
            </div>
          </div>
        </div>

      </div>

    </nav>

    <router-view/>

    <div id="notifications"></div>

  </div>
</template>

<script>
import Auth from '@/services/Auth'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'mmd',
  data() {
    return {
      Auth: Auth,
      mobileMenuOpen: false
    }
  },
  components: {
    SearchBar
  },
  watch: {
    $route(to, from) {
      this.mobileMenuOpen = false
    }
  }
}
</script>
