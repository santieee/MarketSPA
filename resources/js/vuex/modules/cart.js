import { router } from '../../router/router.js';

const state = {
   cart: null
}

const getters = {
    cart: state => state.cart,
}

const actions = {
    cartAddItem: ({commit, getters}, payload) => { 
        if (!getters.isAuthenticated) {
            router.push({name: 'signIn'});
            return;
        }
        axios.post('/api/cart/add', {item_id: payload.id})
        .then((res) => {
            commit('setCart', res)
            commit('showInfo', "Item has been added in cart."); 
        })
    },
    cartDelItem: ({commit}, payload) => {
        axios.post('/api/cart/delete', {item_id: payload.id})
        .then((res) => {
            commit('setCart', res)
            commit('showInfo', "Item has been removed from cart."); 
        })
    },
    cartIncrement: ({commit}, payload) => { 
        axios.post('/api/cart/add', {item_id: payload.id})
        .then((res) => {
            commit('setCart', res)
        })
    },
    cartDecrement: ({commit}, payload) => { 
        axios.post('/api/cart/decrement', {item_id: payload.id})
        .then((res) => {
            commit('setCart', res)
        })
    },
    cartClear: ({commit}) => {
        axios.post('/api/cart/clear')
        .then((res) => {
            commit('setCart', res)
            commit('showInfo', "Cart has been cleared."); 
        })
    }
}

const mutations = {
    setCart(state,data){
        state.cart = data.data.cart;
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}