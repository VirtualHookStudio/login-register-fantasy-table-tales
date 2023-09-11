import axios from 'axios'
import {createStore} from 'vuex'

const store = createStore({
    state: {
        message: '',
        isMenuVisible: true,
        user: null,
    },
    mutations: {
        setMessage(state, msg){
            state.message = msg
        },
        toggleMenu(state, isVisible) {
            if(!state.user){
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            }else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        },
    }
})

export default store