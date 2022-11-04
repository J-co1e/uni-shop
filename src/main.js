import Vue from 'vue'
import App from './App'
import { $http } from "@escook/request-miniprogram";
import store from '@/store/store.js'
Vue.config.productionTip = false

App.mpType = 'app'

uni.$http = $http
$http.baseUrl='https://api-hmugo-web.itheima.net'
uni.$showMsg = function(title='数据加载失败',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
},

$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
  if (options.url.indexOf('/my/')!==-1) {
    option.header={
       Authorization:store.state.myUser.token
    }
  }
}
$http.afterRequest = function(){
  uni.hideLoading()
}

const app = new Vue({
  ...App,
  store
})
app.$mount()

