<template>
    <div class="article-preview">
        <div class="article-meta">
            <router-link :to="`/profile/${article.author.username}`"><img :src="article.author.image" /></router-link>
            <div class="info">
                <router-link :to="`/profile/${article.author.username}`" class="author">{{ article.author.username }}</router-link>
                <span class="date">{{ article.createdAt | formatDate }}</span>
            </div>
            <button class="btn btn-sm pull-xs-right" :class="favoriteClass" @click="toggleFavorite">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
        </div>
            
        <router-link :to="`/article/${article.slug}`" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>

            <ul class="tag-list" v-if="showTags">
                <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag" ><span>{{tag}}</span></li>
            </ul>
        </router-link>
    </div>
</template>

<script>
import { FAVORITE_ARTICLE, UNFAVORITE_ARTICLE } from 'store/modules/articles/actionTypes'

export default {
    props: {
        article: {
            type: Object,
            required: true
        },
        showTags: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        favoriteClass() {
            return {
                'btn-primary': this.article.favorited,
                'btn-outline-primary': !this.article.favorited
            }
        }
    },
    methods: {
        toggleFavorite() {
            const favoriteAction = this.article.favorited ? UNFAVORITE_ARTICLE : FAVORITE_ARTICLE;
            this.$store.dispatch(favoriteAction, this.article.slug);
        }
    }
}
</script>