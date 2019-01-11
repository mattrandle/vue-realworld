<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link class="nav-link" to="/my-feed">Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" href="" to="/" exact>Global Feed</router-link>
              </li>
              <li class="nav-item" v-if="tagRouteActive()">
                <router-link class="nav-link" href="" to="/tag">#{{activeTagName()}}</router-link>
              </li> 
            </ul>
          </div>

          <router-view></router-view>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <popular-tags></popular-tags>
          </div>
        </div>      
    </div>
  </div>
 </div>
</template>

<script>
import PopularTags from 'components/popularTags.vue'

export default {
  components: { 
    PopularTags
  },
  methods: {
    tagRouteActive() {
      return this.$route.name == 'tags';
    },
    activeTagName() {
      return this.$route.params.tagname;
    }
  }
}
</script>
