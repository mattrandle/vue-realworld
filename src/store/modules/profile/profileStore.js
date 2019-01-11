import * as ACTIONS from './actionTypes'
import * as MUTATIONS from './mutationTypes'

const state = {    
    profile: {        
    },
    articles: []
};

const actionsFactory = (dataService, tokenService) => {
    return {
        async [ACTIONS.GET_PROFILE]({commit}, username) {
            const response = await dataService.getProfile(username, tokenService.getToken());
            commit(MUTATIONS.SET_PROFILE, response.profile);
        },
        async [ACTIONS.FOLLOW_USER]({commit}, username) {
            const response = await dataService.follow(username, tokenService.getToken());
            commit(MUTATIONS.SET_PROFILE, response.profile);
        },
        async [ACTIONS.UNFOLLOW_USER]({commit}, username) {
            const response = await dataService.unfollow(username, tokenService.getToken());
            commit(MUTATIONS.SET_PROFILE, response.profile);
        },
        async [ACTIONS.GET_PROFILE_ARTICLES]({commit}, username) {
            const response = await dataService.getArticles(25, 0, username);
            commit(MUTATIONS.SET_ARTICLES, response.articles);
        },
        async [ACTIONS.GET_FAVORITED_ARTICLES]({commit}, username) {
            commit(MUTATIONS.CLEAR_ARTICLES);
            const response = await dataService.getArticles(25, 0, null, username);
            commit(MUTATIONS.SET_ARTICLES, response.articles);
        }
    };
}

const mutations = {    
    [MUTATIONS.SET_PROFILE](state, profile) {
        state.profile = profile;
    },
    [MUTATIONS.SET_ARTICLES](state, articles) {
        state.articles = articles;
    },
    [MUTATIONS.CLEAR_ARTICLES]() {
        state.articles = [];
    }
} 

const profileStoreFactory = (dataService, tokenService) => {
    return {
        state, 
        actions: actionsFactory(dataService, tokenService),
        mutations 
    }
} 

export default profileStoreFactory;
