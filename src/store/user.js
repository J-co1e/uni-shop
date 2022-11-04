export default{
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address')||'{}'),
    token:uni.getStorageSync('token')||'',
    userInfo:JSON.parse(uni.getStorageSync('userInfo')||'{}')
  },
  mutations:{
    updateAddress(state,address){
      state.address=address
      this.commit('myUser/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserInfo(state,userInfo){
      state.userInfo = userInfo
      this.commit('myUser/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    updateToken(state,token){
      state.token=token
      this.commit('myUser/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    }
  },
  getters:{
    addstr(state){
      if (!state.address.provinceName) return ''
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
}