import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user'
import auth from './modules/auth'
import errors from './modules/errors'
import helpers from './modules/helpers'
import items from './modules/items'
import cart from './modules/cart.js'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        user,
        auth,
        errors,
        helpers,
        items,
        cart
    }
}); 