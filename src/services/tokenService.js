
const TOKEN_KEY = 'REALWORLD_JWT_VUE';

export default {
    getToken() {     
        return window.localStorage.getItem(TOKEN_KEY);   
    },
    setToken(token) {       
        window.localStorage.setItem(TOKEN_KEY, token); 
    },
    removeToken() {        
        window.localStorage.removeItem(TOKEN_KEY);
    },
    tokenExists() {        
        return !!this.getToken()        
    }
}