export default{
  namespaced:true,
  state:{
    cart:JSON.parse(uni.getStorageSync('cart')||'[]')
  },
  mutations:{
    addToCart(state,goods){
      let result = state.cart.find(item=>item.goods_id===goods.goods_id)
      if (!result) {
        state.cart.push(goods)
      }else{
        result.goods_count++
      }
      this.commit('myCart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    updateGoodsState(state,goods){
      let result = state.cart.find(item=>item.goods_id===goods.goods_id)
      if (result) {
        result.goods_state = goods.goods_state
        this.commit('myCart/saveToStorage')
      }
    },
    updateGoodsCount(state,goods){
      let result = state.cart.find(item=>item.goods_id===goods.goods_id)
      if (result) {
        result.goods_count = goods.goods_count
        this.commit('myCart/saveToStorage')
      }
    },
    removeGoods(state,goods){
      state.cart = state.cart.filter(item=>item.goods_id!==goods.goods_id)
      this.commit('myCart/saveToStorage')
    },
    updateAllGoodsState(state,newState){
      state.cart.forEach(item=>item.goods_state=newState)
      this.commit('myCart/saveToStorage')
    }
  },
  getters:{
    total(state){
      return state.cart.length
    },
    checkedCount(state){
      return state.cart.filter(item=>item.goods_state).reduce((total,item)=> total+=1,0)
    },
    totalPrice(state){
      return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_price,0)
    }
  },
 
}