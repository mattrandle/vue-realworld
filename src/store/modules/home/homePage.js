
import * as MUTATIONS from './mutationTypes';
import * as ACTIONS from './actionTypes';
import * as GETTERS from './getters';

const defaultState = {
    articles: [],
    articlesCount: null,
    currentPage: 1,
    pageSize: 10,
    popularTags: [],
    filters: {
      author: null,
      favoritedBy: null
    }
};

const mutations = {
  [MUTATIONS.SET_ARTICLES](state, payload) {
    state.articles = payload.articles;  
    state.currentPage = payload.currentPage;
    state.articlesCount = payload.articlesCount;
    state.filters = payload.filters;
  },
  [MUTATIONS.SET_POPULAR_TAGS](state, tags) {
    state.popularTags = tags; 
  },
  [MUTATIONS.UPDATE_ARTICLE_IN_LIST](state, updatedArticle) {
    const index = state.articles.findIndex((article) => article.slug === updatedArticle.slug);
    state.articles[index].favorited = updatedArticle.favorited;
    state.articles[index].favoritesCount = updatedArticle.favoritesCount;
  },
  [MUTATIONS.RESET_STATE](state) {
    Object.assign(state, { ...defaultState, popularTags: state.popularTags } );
  }
};

const actionsFactory = (dataService, tokenService) => {
  return {
    async [ACTIONS.GO_FIRST_PAGE]({commit}, filters) {
      const response = await dataService.getArticles({ ...filters }, tokenService.getToken());
      const payload = { 
        ...response,
        currentPage: 1,
        filters
      };
      commit(MUTATIONS.SET_ARTICLES, payload);
    },
    async [ACTIONS.GO_NEXT_PAGE]({commit, state}) {        
      const offset = state.currentPage * state.pageSize;
      const response = await dataService.getArticles({ offset, ...state.filters }, tokenService.getToken());
      commit(MUTATIONS.SET_ARTICLES, { 
        ...response,
        currentPage: state.currentPage + 1,
        filters: state.filters
      });
    },
    async [ACTIONS.GO_PREVIOUS_PAGE]({commit, state}) {        
      const offset = (state.currentPage - 1) * state.pageSize;
      const response = await dataService.getArticles({ offset, ...state.filters }, tokenService.getToken());
      commit(MUTATIONS.SET_ARTICLES, { 
        ...response,
        currentPage: state.currentPage - 1,
        filters: state.filters
      });
    },
    async [ACTIONS.GET_POPULAR_TAGS]({commit}) {
      const response = await dataService.getPopularTags();
      commit(MUTATIONS.SET_POPULAR_TAGS, response.tags);
    }
  }  
};

const getters = {
  [GETTERS.HAS_NEXT_PAGE]: (state, getters) => {
      return state.currentPage < getters.pageCount;
  },
  [GETTERS.HAS_PREVIOUS_PAGE]: state => {
      return state.currentPage > 1;
  },
  [GETTERS.PAGE_COUNT]: state => {
      return Math.ceil(state.articlesCount / state.pageSize);
  }
};

const storeFactory = (dataService, tokenService) => {
  return {
    state: { ...defaultState },
    mutations,
    actions: actionsFactory(dataService, tokenService),
    getters
  }   
};

export default storeFactory;


