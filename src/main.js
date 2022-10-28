import Vue from 'vue'
import App from './App'
import { $http } from "@escook/request-miniprogram";

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
}
$http.afterRequest = function(){
  uni.hideLoading()
}

const app = new Vue({
  ...App
})
app.$mount()
