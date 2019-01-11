<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                <router-link to="/signup">Need an account ?</router-link>
                </p>

                <ul class="error-messages" v-if="error">
                    <li>{{ error }}</li>
                </ul> 

                <form v-on:submit.prevent>                
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" @click="signIn">
                        Sign in
                    </button>
                </form>
            </div>

            </div>
        </div>
    </div>
</template>
<script>

import { mapState } from 'vuex';
import { LOGIN } from 'store/modules/auth/actionTypes'

export default {
    data: () => {
        return {
            email: null,
            password: null
        }            
    },
    methods: {
        async signIn() { 
            await this.$store.dispatch(LOGIN, { email: this.email, password: this.password });                
            if (this.success) {
                this.$router.push({ 'path': '/' });
            }                
        }   
    },
    computed: mapState({
        error: (state) => state.authStore.error,
        success: (state) => state.authStore.success
    })
}

</script>