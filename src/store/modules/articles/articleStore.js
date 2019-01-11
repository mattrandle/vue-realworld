
import * as ACTIONS from './actionTypes';
import * as MUTATIONS from './mutationTypes';

const defaultState = {
    article: {
        title: null,
        description: null,
        body: null,
        tagList: '',
        author: { }
    },
    isNewArticle: null,
    errors: null,
    inProgress: false,
    comments: []
};

const mutations = {
    [MUTATIONS.SET_ARTICLE](state, payload) {
        state.article =  { ...payload, tagList: payload.tagList.join(' ') };
    },
    [MUTATIONS.RESET_STATE](state) {
        Object.assign(state, { ...defaultState });
    },
    [MUTATIONS.NEW_ARTICLE](state) {
        state.isNewArticle = true;        
    },
    [MUTATIONS.ARTICLE_CREATED](state, article) {
        state.articleSlug = article.slug;
    },
    [MUTATIONS.CLEAR_ERRORS](state) {
        state.errors = null;
    },
    [MUTATIONS.SET_IN_PROGRESS](state, inProgress) {
        state.inProgress = inProgress;
    },
    [MUTATIONS.SET_ERRORS](state, payload) {
        state.errors = Object.keys(payload).flatMap(k => payload[k].map(em => `${k} ${em}`))
    },
    [MUTATIONS.SET_COMMENTS](state, payload) {
        state.comments = payload;
    },
    [MUTATIONS.INSERT_COMMENT](state, payload) {
        state.comments.unshift(payload);
    }
}

const actionsFactory = (dataService, tokenService) => {
    return {
        async [ACTIONS.GET_ARTICLE]({commit}, articleSlug) {
            var articleResponse = await dataService.getArticle(articleSlug, tokenService.getToken());                
            commit("setArticle", articleResponse.article);
        },
        async [ACTIONS.DELETE_ARTICLE](context, articleSlug) {
            await dataService.deleteArticle(articleSlug, tokenService.getToken());
        },
        [ACTIONS.NEW_ARTICLE]({commit}) {
            commit("resetState");
            commit("newArticle");
        },
        async [ACTIONS.EDIT_ARTICLE]({commit}, articleSlug) {
            commit("resetState");
            const response = await dataService.getArticle(articleSlug, tokenService.getToken());
            commit("setArticle", response.article);
        },
        async [ACTIONS.SAVE_CHANGES]({commit, state}) {
            commit('clearErrors');
            commit('setInProgress', true);

            let response = null;

            const article = {
                ...state.article,
                tagList: state.article.tagList.split()
            }
            
            if (state.isNewArticle) {
                response = await dataService.createArticle(article, tokenService.getToken());                
            } else {
                response = await dataService.updateArticle(article, tokenService.getToken());
            }

            if (response.errors) {
                commit('setErrors', response.errors);             
            }
            else {                
                commit("articleCreated", response.article);   
            }

            commit('setInProgress', false);
        },
        async [ACTIONS.FAVORITE_ARTICLE]({commit}, articleSlug) {
            const response = await dataService.favoriteArticle(articleSlug, tokenService.getToken());
            commit("setArticle", response.article);
            commit("updateArticleInList", response.article);
        },
        async [ACTIONS.UNFAVORITE_ARTICLE]({commit}, articleSlug) {
            const response = await dataService.unfavoriteArticle(articleSlug, tokenService.getToken());
            commit("setArticle", response.article);
            commit("updateArticleInList", response.article);
        },
        async [ACTIONS.GET_COMMENTS]({commit}, articleSlug) {
            const response = await dataService.getComments(articleSlug, tokenService.getToken());
            commit("setComments", response.comments);
        },
        async [ACTIONS.POST_COMMENT](context, payload) {
            await dataService.postComment(payload.articleSlug, { comment: { body: payload.body } }, tokenService.getToken());
        },
        async [ACTIONS.DELETE_COMMENT](context, { articleSlug, commentId }) {
            await dataService.deleteComment(articleSlug, commentId, tokenService.getToken());
        }
    }
}

const factoryFunction = (dataService, tokenService) => {
    return {
        namespaced: true,
        state: { ...defaultState },
        mutations,
        actions: new actionsFactory(dataService, tokenService)
    }    
};

export default factoryFunction;