<template>
  <div id="app">
    <nav class="navbar navbar-light test">
      <div class="container">
        <router-link class="navbar-brand" to="/">conduit</router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">            
            <router-link class="nav-link" to="/" exact>Home</router-link>
          </li>          

          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link" to="/editor" exact>
                <i class="ion-compose"></i>&nbsp;New Post
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li> 
          </template>

          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Sign in</router-link>
            </li>           
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Sign up</router-link>
            </li>           
          </template>

          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link" :to="`/profile/${authenticatedUser.username}`">
                {{ authenticatedUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href='#' @click="signOut">Sign Out</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <router-view></router-view>

    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduits</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>

  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    isAuthenticated: (state) => state.authStore.isAuthenticated,
    authenticatedUser: (state) => state.authStore.authenticatedUser
  }),
  methods: {
    signOut() {
      this.$store.commit('signOut');
      this.$router.push({ path: '/' });
    }
  }
}
</script>