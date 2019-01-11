
import * as ACTIONS from './actionTypes'
import * as MUTATIONS from './mutationTypes'
import { SET_AUTHENTICATED_USER } from 'store/modules/auth/mutationTypes'

const defaultState = {
    username: null,
    email: null,
    password: null,
    userRegistered: false,
    errors: null,
    registerInProgress: false
}

const actionsFactory = (dataService) => {
    return {
        async [ACTIONS.SIGN_UP]({ commit, state }) {
            commit(MUTATIONS.CLEAR_ERRORS);
            commit(MUTATIONS.SET_IN_PROGRESS, true);

            const response = await dataService.signUp({
                username: state.username,
                email: state.email,
                password: state.password
            });

            commit(MUTATIONS.SET_IN_PROGRESS, false);

            if (response.errors) {
                commit(MUTATIONS.SET_ERRORS, response.errors);
            }
            else {
                commit(MUTATIONS.SET_USER_REGISTERED);

                // Login as successfully registered
                commit(SET_AUTHENTICATED_USER, response.user);
            }
        }
    }
}

const mutations = {
    [MUTATIONS.CLEAR_ERRORS](state) {
        state.errors = null;
    },
    [MUTATIONS.SET_ERRORS](state, payload) {
        state.errors = Object.keys(payload).flatMap(k => payload[k].map(em => `${k} ${em}`))
    },
    [MUTATIONS.SET_USER_REGISTERED](state) {
        state.userRegistered = true;
    },
    [MUTATIONS.SET_IN_PROGRESS](state, value) {
        state.registerInProgress = value;
    },
    [MUTATIONS.RESET_STATE](state) {
        Object.assign(state, { ...defaultState });
    }
}

const storeFactory = (dataService) => {
    return {
        state: { ...defaultState },
        mutations,
        actions: new actionsFactory(dataService) 
    }
}

export default storeFactory;