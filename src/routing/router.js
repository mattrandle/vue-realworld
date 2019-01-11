import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/Home'
import HomeMyFeed from 'views/HomeMyFeed'
import HomeGlobalFeed from 'views/HomeGlobalFeed'
import HomeTag from 'views/HomeTag'
import Article from 'views/Article'
import AddArticle from 'views/AddArticle'
import Settings from 'views/Settings'
import Login from 'views/Login'
import Register from 'views/Register'
import Profile from 'views/Profile'
import ProfileFavorited from 'views/ProfileFavorited'
import ProfileMyArticles from 'views/ProfileMyArticles'
import EditArticle from 'views/EditArticle'
import NotFound from 'views/NotFound'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    routes: [
      { path: '/', name: 'home', component: Home,  
        children: [
          { path: '', name: 'globalFeed', component: HomeGlobalFeed, props: true },
          { path: 'my-feed', name: 'myFeed', component: HomeMyFeed, props: true },
          { path: 'tag/:tagname', name: 'tags', component: HomeTag, props: true }
        ]
      }, 
      { path: '/article/:articleSlug', name: 'article', component: Article, props: true }, 
      { path: '/editor/:articleSlug', name: 'editArticle', component: EditArticle, props: true },
      { path: '/editor', name: 'addArticle', component: AddArticle, meta: { requiresAuth: true } },
      { path: '/settings', name: 'settings', component: Settings, meta: { requiresAuth: true } },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
      { path: '/profile/:username', name: 'profile', component: Profile, props: true, meta: { requiresAuth: true },
        children: [ 
          { path: '', name: 'myArticles', component: ProfileMyArticles, props: true, meta: { requiresAuth: true } },
          { path: 'favorites', name: 'userFavorites', component: ProfileFavorited, props: true, meta: { requiresAuth: true } }
        ] 
      },
      { path: '*', name: 'notfound', component: NotFound },
    ]
});



