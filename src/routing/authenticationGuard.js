export default function createAuthenticationGuard(store) {
    return (to, from, next) => { 
        // Doesnt require auth 
        if (!to.matched.some(record => record.meta.requiresAuth)) {
            next();
            return;    
        }

        // Requires auth and currently authenticated
        if (store.state.authStore.isAuthenticated) {
            next();
            return;
        }

        // Requires auth and not authenticated (redirect)
        next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
    };
}