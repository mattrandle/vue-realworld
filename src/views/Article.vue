<template>
  <div class="article-page" v-if="article">

    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>     
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">        
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row"> 

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form" v-on:submit.prevent>
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody">
              </textarea>
            </div>
            <div class="card-footer">
              <button class="btn btn-sm btn-primary" @click="postComment">
                Post Comment
              </button>
            </div>
          </form>
          
          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">{{ comment.author.username }}</a>
              <span class="date-posted">{{ comment.updatedAt }}</span>
              <span class="mod-options" v-if="isOwnComment(comment)"><i class="ion-trash-a" @click="deleteComment"></i></span>
            </div>
          </div>       
          
        </div>

      </div>

    </div>
  </div>    
</template>
<script>
import { mapState } from 'vuex'
import articleMeta from 'components/articleMeta.vue'
import * as ACTIONS from 'store/modules/articles/actionTypes'

export default {
  props: {
    articleSlug: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      commentBody: null
    }
  },
  components: {
    articleMeta
  },
  computed: { 
    ...mapState({
      article: state => state.articleStore.article,
      comments: state => state.articleStore.comments,
      authenticatedUser: state => state.authStore.AuthenticatedUser
    }) 
  },
  created() {
    this.$store.dispatch(ACTIONS.GET_ARTICLE, this.articleSlug);
    this.$store.dispatch(ACTIONS.GET_COMMENTS, this.articleSlug);
  },
  methods: { 
    async postComment() {
      await this.$store.dispatch(ACTIONS.POST_COMMENT, { 
        articleSlug: this.articleSlug,
        body: this.commentBody 
      });
      this.$store.dispatch(ACTIONS.GET_COMMENTS, this.articleSlug);
      this.commentBody = '';
    },
    deleteComment(comment) {
      this.$store.dispatch(ACTIONS.DELETE_COMMENT, { articleSlug: this.articleSlug, commentId: comment.id });
      this.$store.dispatch(ACTIONS.GET_COMMENTS, this.articleSlug);
    },
    isOwnComment(comment) {
      return this.authenticatedUser && this.authenticatedUser.username == comment.author.username;
    }
  }
}
</script>