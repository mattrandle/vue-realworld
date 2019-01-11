<template>
<div class="profile-page">
  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>{{ profile.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="follow" v-if="!profile.following">
              <i class="ion-plus-round"></i>&nbsp;Follow {{ profile.username }}
            </button>

            <button class="btn btn-sm btn-outline-secondary action-btn" @click="unfollow" v-if="profile.following">
              <i class="ion-plus-round"></i>&nbsp;Unfollow {{ profile.username }}
            </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <router-link class="nav-link" :to="`/profile/${username}`" exact>Articles</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="`/profile/${username}/favorites`">Favorited Articles</router-link>
            </li>
          </ul>
        </div>

        <router-view></router-view>

      </div>

    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
import * as ACTIONS from 'store/modules/profile/actionTypes'

export default {        
  props: {
    username: {
      type: String,
      required: true
    }
  },
  created() {
    this.$store.dispatch(ACTIONS.GET_PROFILE, this.username);
  },  
  computed: mapState({            
      profile: (state) => state.profileStore.profile,
      articles: (state) => state.profileStore.profileArticles
  }),
  methods: {
    follow() {
      this.$store.dispatch(ACTIONS.FOLLOW_USER, this.username);       
    },
    unfollow() {
      this.$store.dispatch(ACTIONS.UNFOLLOW_USER, this.username);       
    }
  }
}
</script>