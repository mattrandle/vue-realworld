<template>
    <div>
         <article-preview v-for="article in articles" :key="article.slug" :article="article" :showTags="showTags"></article-preview>

         <nav aria-label="Page navigation example"  v-if="hasNextPage || hasPreviousPage">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: !hasPreviousPage }"><a class="page-link" v-on:click="previousPage"><span aria-hidden="true">&laquo;</span></a></li>              
              <li class="page-item"><span class="page-link">{{ currentPage }} of {{ pageCount }}</span></li>
              <li class="page-item" :class="{ disabled: !hasNextPage }"><a class="page-link" v-on:click="nextPage"><span aria-hidden="true">&raquo;</span></a></li>
            </ul>
          </nav>
    </div>
</template>
<script>
import articlePreview from 'components/articlePreview'
import { mapState, mapGetters } from 'vuex'
import { GO_FIRST_PAGE, GO_NEXT_PAGE, GO_PREVIOUS_PAGE } from 'store/modules/home/actionTypes'

export default {
  props: {
    author: { 
      type: String,
      required: false 
    },
    favoritedBy: { 
      type: String,
      required: false 
    },
    tag: { 
      type: String,
      required: false
    },
    showTags: { 
      type: Boolean,
      required: false 
    },
    myFeed: { 
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: { 
    articlePreview
  },
  created () {    
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    ...mapState({
      articles: state => state.homePage.articles,
      currentPage: state => state.homePage.currentPage
    }),
    ...mapGetters([
      'hasNextPage',
      'hasPreviousPage',
      'pageCount'
    ])
  },
  methods: {
    fetchData() {
      this.$store.dispatch(GO_FIRST_PAGE, { 
        author: this.author, 
        favoritedBy: this.favoritedBy,
        tag: this.tag,
        myFeed: this.myFeed
      });
    },
    nextPage () {    
      this.$store.dispatch(GO_NEXT_PAGE);
    },
    previousPage() {    
      this.$store.dispatch(GO_PREVIOUS_PAGE);
    }  
  }  
}
</script>