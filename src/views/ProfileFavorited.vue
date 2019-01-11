<template>
    <div>
        <article-preview v-for="article in articles" :key="article.slug" :article="article"></article-preview>
    </div> 
</template>
<script>
import articlePreview from 'components/articlePreview'
import { mapState } from 'vuex'

import { GET_FAVORITED_ARTICLES } from 'store/modules/profile/actionTypes'

export default {
   props: {
        username: {
            type: String,
            required: true
        }
   },
   created() {
        this.$store.dispatch(GET_FAVORITED_ARTICLES, this.username);
    },
    components: {
        articlePreview
    },
    computed: {
        ...mapState({
            articles: (state) => state.profileStore.articles
        })
    }
}
</script>