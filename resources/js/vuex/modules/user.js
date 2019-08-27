import Cookies from 'js-cookie'

const state = {
    status: '',
    profile: Cookies.getJSON('profile') || '',
}

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name,
}

const actions = {
    userRequest: ({commit, dispatch, getters}) => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.access_token

            commit('userRequest')
            axios.get('/api/user')
                .then((resp) => {
                    console.log('AuthOk');
                    dispatch('setProfile', resp.data);
                    dispatch('getItems');
                    resolve(resp);
                })
                .catch((err) => {
                    console.log('AuthErr');
                    commit('userError');
                    // if resp is unauthorized, logout, to
                    dispatch('authLogout');
                    reject(err);
                })
        })
    },
    setProfile: (context, profile) => {
        state.status = 'success';
        state.profile = profile;
        Cookies.set('profile', JSON.stringify(profile), { expires: 365 });
    }
}

const mutations = {
    userRequest: (state) => {
        state.status = 'loading';
    },
    userError: (state) => {
        state.status = 'error';
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}