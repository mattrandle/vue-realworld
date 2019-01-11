<template>
    <div>
        <article-list :author="authenticatedUsername"></article-list>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import articleList from 'components/articleList'

export default {
    components: {
        articleList
    },
    computed: mapState({
        authenticatedUsername: (state) => state.authStore.authenticatedUser.username
  })
}
</script>