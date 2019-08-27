import VueRouter from "vue-router";
window.Vue = require("vue");
Vue.use(VueRouter);

import {store} from '../vuex/store'


import SignUp from '../components/auth/signUp';
import SignIn from '../components/auth/signIn';
import Profile from '../components/profile/profile';
import SellerPage from '../components/seller/seller-page';
import Shop from '../components/main/shop';
import Cart from '../components/main/cart';

const routes = [
	{
		path: '/',
		beforeEnter: (to, from, next) => {  
        	next('/shop/1');
      	}
	}, 	
	{ 
		path: '/signup', 
		component: SignUp, 
		name: 'signUp',
		beforeEnter: (to, from, next) => {  
        	store.getters.isAuthenticated ? next('/') : next()
      	}
	}, 	
	{
		path: '/signin', 
		component: SignIn, 
		name: 'signIn',
		beforeEnter: (to, from, next) => {  
        	store.getters.isAuthenticated ? next('/') : next()
      	}
	}, 	
	{
		path: '/logout', 
		name: 'logout',
		beforeEnter: (to, from, next) => {  
        	if(store.getters.isAuthenticated){
        		store.dispatch('authLogout');
        		next("/");
        	}else{
        		next("/");
        	}
      	}
	}, 
	{
		path: '/profile', 
		component: Profile, 
		name: 'profile',
		beforeEnter: (to, from, next) => {  
        	!store.getters.isAuthenticated ? next('/signin') : next()
      	}
	}, 	
	{
		path: '/products/:page', 
		component: SellerPage, 
		name: 'sellerPage',
		props: true,
		beforeEnter: (to, from, next) => {  
        	store.getters.getProfile.status > 1 ? next() : next('/')
      	}
	},
	{
		path: '/shop/:page', 
		component: Shop, 
		name: 'shop',
		props: true
	},
	{
		path: '/cart', 
		component: Cart, 
		name: 'cart',
		beforeEnter: (to, from, next) => {  
        	!store.getters.isAuthenticated ? next('/signin') : next()
      	}
	},
];

export const router = new VueRouter({
    routes,
    mode: "history"
});
