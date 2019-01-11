
import * as ACTIONS from './actionTypes'
import * as MUTATIONS from './mutationTypes'

// Factory method so we can initiate with the currently logged in user
// following a page refresh where there is a valid token in local storage 
const stateFactory = (user) => {
    return {    
        error: null,
        success: null,
        isAuthenticated: !!user,
        authenticatedUser: user,
        userForEdit: {        
        }
    };
}

const actionsFactory = (dataService, tokenService) => {    
    return {
        async [ACTIONS.LOGIN] ({ commit }, user) {
            var loginResponse = await dataService.login(user);                        
            commit(MUTATIONS.LOGIN_SUCCESS);            
            commit(MUTATIONS.SET_AUTHENTICATED_USER, loginResponse.user);
        },        
        async [ACTIONS.UPDATE_USER]({commit}, user) {        
            const response = await dataService.updateUser(user, tokenService.getToken());
            commit(MUTATIONS.SET_AUTHENTICATED_USER, response.user);
        },
        async [ACTIONS.GET_USER]({commit}) {
            const response = await dataService.getCurrentUser(tokenService.getToken());
            commit(MUTATIONS.SET_USER_FOR_EDIT, response.user);
        }
    }
};

const mutationsFactory =  (tokenService) => { 
    return {
        [MUTATIONS.LOGIN_SUCCESS](state) {        
            state.success = true;    
            state.error = null;            
        },
        [MUTATIONS.LOGIN_FAILURE](state, payload) {        
            state.success = false;  
            state.error = payload;
        },
        [MUTATIONS.SET_AUTHENTICATED_USER](state, user) {
            state.isAuthenticated = true;
            state.authenticatedUser = user;
            tokenService.setToken(user.token);
        },
        [MUTATIONS.SET_USER_FOR_EDIT](state, user) {
            state.userForEdit = user;        
        },
        [MUTATIONS.LOGOUT](state) {
            tokenService.removeToken();
            state.isAuthenticated = false;
            state.authenticatedUser = null;
        }
    };    
}

export default function authStore(dataService, tokenService, user) {   
    return {
        state: new stateFactory(user),
        mutations: new mutationsFactory(tokenService),
        actions: new actionsFactory(dataService, tokenService)
    }
}