<template>
    <div id=popular-tags>
        <p>Popular Tags</p>
        <div class="tag-list">
            <router-link v-for="tag in popularTags" :key="tag" :to="`/tag/${tag}`" class="tag-pill tag-default">{{ tag }}</router-link>            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { GET_POPULAR_TAGS } from 'store/modules/home/actionTypes'

export default {
    created() {
        this.$store.dispatch(GET_POPULAR_TAGS);
    },
    computed: mapState({
        popularTags: state => state.homePage.popularTags
    })    
}
</script>