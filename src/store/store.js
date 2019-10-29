import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user:null,  
    nickName:'',   // 昵称
    mobile:'',     // 手机号
    token:'',  // token
}

export default new Vuex.Store({
    state,
    getters:{
      getStorage(state){
        if(!state.user){
          state.user = JSON.parse(localStorage.getItem(key));
          state.nickName = JSON.parse(localStorage.getItem(nickName));
          state.mobile= JSON.parse(localStorage.getItem(mobile));
          state.token = JSON.parse(localStorage.getItem(token)); 
        }
        return state.user
      }
    },
    mutations:{
      $_setStorage(state, value) { // 设置用户信息本地存储
        state.user = value;
        localStorage.setItem('key', JSON.stringify(value));
      },
      $_setNickName(state, value){    // 设置昵称
        state.nickName = value;
        localStorage.setItem('nickName', value);
      },
      $_setMobile(state, value){   // 设置手机号
        state.mobile = value;
        localStorage.setItem('mobile', value);
      },
      $_setToken(state, value){   // 设置token
        state.token = value;
        localStorage.setItem('token',value);
      },
      $_removeStorage(state,value){
        state.user = null;
        localStorage.removeItem('nickName');
        localStorage.removeItem('mobile');
        localStorage.removeItem('token');
      }
    }
})

