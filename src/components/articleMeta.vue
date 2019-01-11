<template>
    <div class="article-meta">
        <a href=""><img :src="article.author.image" /></a>
        <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt | formatDate }}</span>
        </div>

        <template v-if="isOwnArticle">
            <router-link class="btn btn-outline-secondary btn-sm" :to="`/editor/${article.slug}`">
                <i class="ion-edit"></i> Edit Article
            </router-link>
            &nbsp;&nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>
        <template v-else>
            <button class="btn btn-sm btn-outline-secondary">
                <i class="ion-plus-round"></i>
                &nbsp;
                Follow {{ article.author.name }} <span class="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm" @click="toggleFavoritedArticle" :class="favoriteClass">
                <i class="ion-heart"></i>
                &nbsp;
                {{ this.article.favorited ? 'Unfavorite Post' : 'Favorite Post' }} <span class="counter">({{article.favoritesCount}})</span>
            </button>
        </template>        
    </div>
</template>
<script>
import { mapState } from 'vuex'

import { DELETE_ARTICLE, FAVORITE_ARTICLE, UNFAVORITE_ARTICLE } from 'store/modules/articles/actionTypes'

export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState({
            isAuthenticated: (state) => state.authStore.isAuthenticated,
            authenticatedUser: (state) => state.authStore.authenticatedUser
        }),
        isOwnArticle() {
            return this.isAuthenticated && this.article.author.username === this.authenticatedUser.username;
        },
        favoriteClass() {
            return {
                'btn-primary': this.article.favorited,
                'btn-outline-primary': !this.article.favorited
            }
        }
    },
    methods: {        
        async deleteArticle() {            
            await this.$store.dispatch(DELETE_ARTICLE, this.article.slug);
            this.$router.push({ path: "/" });
        },
        async toggleFavoritedArticle() {
            const actionName = this.article.favorited ? UNFAVORITE_ARTICLE : FAVORITE_ARTICLE;
            this.$store.dispatch(actionName, this.article.slug);
        }
    }
}
</script>