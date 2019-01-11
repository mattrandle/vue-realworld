<template>
<div class="editor-page" v-if="article">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <ul class="error-messages" v-if="errors">
            <li v-for="error in errors" :key="error">{{error}}</li>
        </ul> 

        <form v-on:submit.prevent>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="description">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="body"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tagList"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="save">
                {{ isNewArticle ? "Publish Article" : "Update Article" }}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { mapState } from 'vuex';

import { EDIT_ARTICLE, NEW_ARTICLE, SAVE_CHANGES } from 'store/modules/articles/actionTypes'

export default {
  props: {
    isNewArticle: { 
      type: Boolean, 
      required: true 
    },
    articleSlug: { 
      type: String, 
      required: false 
    }
  },
  async created() {
    if (this.isNewArticle) {
      this.$store.dispatch(NEW_ARTICLE);
    } else {
      await this.$store.dispatch(EDIT_ARTICLE, this.articleSlug);
    }
  },
  computed: {
    ...mapFields([
      'articleStore.article.title',
      'articleStore.article.description', 
      'articleStore.article.body',
      'articleStore.article.tagList'
    ]),
    ...mapState({
      errors: state => state.articleStore.errors,
      newArticleSlug: state => state.articleStore.articleSlug,
      article: state => state.articleStore.article
    })
  },
  methods: {
    async save() {
      await this.$store.dispatch(SAVE_CHANGES);
      if (!this.errors) {
        const redirectPath = this.isNewArticle ? `article/${this.newArticleSlug || this.articleSlug}` : '/';
        this.$router.push( { path: redirectPath })
      }      
    }
  }
}

</script>