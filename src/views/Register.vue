<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                <router-link to="\login">Have an account?</router-link>
                </p>

                <ul class="error-messages" v-if="errors">
                    <li v-for="error in errors" :key="error">{{error}}</li>
                </ul> 

                <form v-on:submit.prevent>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="username" :readonly="registerInProgress">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email" :readonly="registerInProgress">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password" :readonly="registerInProgress">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" @click="signUp" :disabled="registerInProgress">
                        Sign up
                    </button>
                </form>
            </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { mapState } from 'vuex';

import { RESET_STATE } from 'store/modules/register/mutationTypes'
import { SIGN_UP } from 'store/modules/register/actionTypes'

export default {
    created() {
        this.$store.commit(RESET_STATE);
    },
    computed: {
        ...mapFields([
            'registerStore.email',
            'registerStore.password', 
            'registerStore.username'
        ]),
        ...mapState({
            errors: state => state.registerStore.errors,
            registerInProgress: state => state.registerStore.registerInProgress,
            isAuthenticated: state => state.IsAuthenticated
        })
    },
    methods: {
        async signUp() {
            await this.$store.dispatch(SIGN_UP);
            if (this.isAuthenticated) {
                this.$router.push({ path: '/' });
            }            
        }
    }
}
</script>
