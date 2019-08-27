import Cookies from 'js-cookie'
import vuetify from '../../plugins/vuetify.js'

const state = {
	info: {
        timeout: 4000,
        show: false,
        text: null,       
    },
}

const getters = {

}

const actions = {
    changeTheme: (context, payload)=>{    
        vuetify.framework.theme.dark = !vuetify.framework.theme.dark
        Cookies.set('dark_theme', vuetify.framework.theme.dark, { expires: 365 });      
    },
    setTheme: (context, payload) => {
        if(Cookies.get('dark_theme')){
            let theme = JSON.parse( Cookies.get('dark_theme') )
            theme ? vuetify.framework.theme.dark = true : vuetify.framework.theme.dark = false    
        }    
    },
    startApp: ({getters, dispatch}, payload) => {
        dispatch('setTheme');
        if (getters.isAuthenticated) {
            dispatch('userRequest');
        }else{     
            dispatch('getItems');
        }
    }
}

const mutations = {
    showInfo(state, message) {
        state.info.text = message;
        state.info.show = true;
    },
    setBtnLoad(state, status){        
        state.info.button_loading = status 
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}