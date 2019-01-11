<template>
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form v-on:submit.prevent>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click="updateSettings">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="signOut">
          Or click here to logout.
        </button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import { GET_USER, UPDATE_USER } from 'store/modules/auth/actionTypes'
import { LOGOUT } from 'store/modules/auth/mutationTypes'

export default {  
  created() {
    this.$store.dispatch(GET_USER);
  },
  computed: {    
    ...mapFields([
        'authStore.userForEdit.username',
        'authStore.userForEdit.bio',
        'authStore.userForEdit.image',
        'authStore.userForEdit.email',
        'authStore.userForEdit.password'
    ])
  },
  methods: {
    updateSettings() {      
      this.$store.dispatch(UPDATE_USER)
    },
    signOut() {      
      this.$store.commit(LOGOUT);
      this.$router.push({ path: '/' });
    }
  }
}
</script>