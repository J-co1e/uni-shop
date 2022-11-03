import Vue from "vue";
import Vuex from 'vuex'
import myCart from './cart'
import myUser from './user'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    myCart,myUser
  },
  state(){
    return{
    }
  }
})
export default store