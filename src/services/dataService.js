export default function(baseUrl) {
    function getHeaders(authToken) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json; charset=utf-8");                       
        
        if (authToken) {
            headers.append("Authorization", `Token ${authToken}`);            
        }

        return headers;
    }
    
    function post(url, data={}, authToken) {                
        return fetch(url, {
            method: "POST", 
            headers: getHeaders(authToken),
            mode: "cors", 
            cache: "no-cache", 
            credentials: "include",         
            redirect: "follow", 
            referrer: "no-referrer", 
            body: JSON.stringify(data)
        })    
    }    
    
    function httpDelete(url, authToken) {
        return fetch(url, {
            method: "DELETE", 
            headers: getHeaders(authToken),
            mode: "cors", 
            cache: "no-cache", 
            credentials: "include",         
            redirect: "follow", 
            referrer: "no-referrer"
        })    
    }
    
    function put(url, data, authToken) {
        return fetch(url, {
            method: "PUT", 
            headers: getHeaders(authToken),
            mode: "cors", 
            cache: "no-cache", 
            credentials: "include",         
            redirect: "follow", 
            referrer: "no-referrer", 
            body: JSON.stringify(data)
        })    
    }

    function get(url, authToken) {
        return fetch(url, {            
            headers: getHeaders(authToken)            
        })    
    }

    return { 
        getArticle: async function (articleSlug, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}`;
            const response = await get(url, authToken);
            return response.json();
        },
        getArticles: async function ({ limit = 20, offset = 0, author = null, favoritedBy = null, tag = null }, authToken) {
            let url = `${baseUrl}/api/articles?limit=${limit}&offset=${offset}`;
            if (author) {
                url += `&author=${author}`;
            }
            if (favoritedBy) {
                url +=  `&favorited=${favoritedBy}`;
            }
            if (tag) {
                url += `&tag=${tag}`;
            }
            const response = await get(url, authToken);
            return response.json();
        },
        getPopularTags: async function() {
            const url = `${baseUrl}/api/tags`;
            const response = await fetch(url);
            return response.json();
        },
        login: async function(user) {
            const url = `${baseUrl}/api/users/login`;           
            var response = await post(url, { user });
            return response.json();
        },        
        signUp: async function(user) {
            const url =  `${baseUrl}/api/users`;
            const response = await post(url, { user });
            return response.json();
        },        
        updateArticle: async function(article, authToken){
            const url = `${baseUrl}/api/articles/${article.slug}`;
            const resposne = await put(url, { article }, authToken);
            return resposne.json();
        },
        createArticle: async function(article, authToken) {
            const url = `${baseUrl}/api/articles`;
            const response = await post(url, { article }, authToken);
            return response.json();
        },
        deleteArticle: async function(articleSlug, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}`;
            await httpDelete(url, authToken);
        },
        getCurrentUser: async function(authToken) {
            const url = `${baseUrl}/api/user`;
            var response = await get(url, authToken);
            return response.json();
        },
        updateUser: async function(user, authToken) {
            const url = `${baseUrl}/api/user`;
            var response = await put(url, { user }, authToken);
            return response.json();
        },
        getProfile: async function(userName, authToken) {            
            const url = `${baseUrl}/api/profiles/${userName}`;
            var response = await get(url, authToken);
            return response.json();
        },
        follow: async function(userName, authToken) {
            const url = `${baseUrl}/api/profiles/${userName}/follow`;
            var response = await post(url, null, authToken);
            return response.json();
        },
        unfollow: async function(userName, authToken) {
            const url = `${baseUrl}/api/profiles/${userName}/follow`;
            var response = await httpDelete(url, authToken);
            return response.json();
        },
        favoriteArticle: async function(articleSlug, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}/favorite`;
            var response = await post(url, null, authToken);
            return response.json();
        },
        unfavoriteArticle: async function(articleSlug, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}/favorite`;
            var response = await httpDelete(url, authToken);
            return response.json();
        },
        getComments: async function(articleSlug, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}/comments`;
            var response = await get(url, authToken);
            return response.json();
        },
        postComment: async function (articleSlug, comment, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}/comments`;
            var response = await post(url, comment, authToken);
            return response.json();
        },
        deleteComment: async function (articleSlug, commentId, authToken) {
            const url = `${baseUrl}/api/articles/${articleSlug}/comments/${commentId}`;
            var response = await httpDelete(url, authToken);
            return response.json();
        }
    }
}  