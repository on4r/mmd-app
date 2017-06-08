<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="navbar-brand text-center">
            <router-link to="/">my-movie-db</router-link>
          </div>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/plan-to-watch">Plan to Watch</router-link>
            </li>
            <li>
              <router-link to="/watched">Watched</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {}
  }
}
</script>

<style lang="scss">

</style>
