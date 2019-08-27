const state = {
    items: null,
    userItems: null,
}

const getters = {
    userItems: state => state.userItems,
    items: state => state.items
}

const actions = {
    addItem: ({commit}, payload) => { 
        return new Promise((resolve, reject)=>{

            let data = new FormData();
            for(let i in payload){
                if(i !== 'photo'){
                    data.append(i, payload[i])
                }  
            }
            //add photos
            for(let i in payload.photo){
                data.append('photos[]', payload.photo[i])
            }
        
            axios.post('/api/items/add', data)
                .then((res)=>{                    
                    commit('setItems', res)
                    commit('showInfo', "Item has been added.");  
                    resolve() 
                })       
        })      
    },

    deleteItem: ({commit}, payload)=>{
        return new Promise((resolve, reject) => {
            axios.post('/api/items/delete', payload)
                .then((res)=>{
                    commit('setItems', res)
                    commit('showInfo', "Item has been deleted.");
                    resolve();
                })   
        })
    },

    getItems: ({getters, commit}, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/items/get')
                .then((res)=>{
                    commit('setItems', res);
                    commit('setCart', res);
                    resolve();               
                })   
        })
    }
}

const mutations = {
    setItems(state, data){
        state.items = data.data.items;
        state.userItems = data.data.userItems;
    } 
}

export default {
    actions,
    state,
    mutations,
    getters
}