<template>
	<view class="login">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn" @click="getUserProfile">一键登录</button>
    <view class="tips">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
	name: "myLogin",
	props: {},
	data() {
		return {};
	},
	computed: {},
	methods: {
    async getUserProfile(){
      let e = await uni.getUserProfile({
        desc:'获取用户信息',
      })
      console.log(e);
      if (e.length===1) {
        uni.$showMsg("请重新授权")
      }else if(e.length===2){
        let info = e[1].userInfo
        this.updateUserInfo(info)
        this.getToken(e[1])
      }
    },
    async getToken(info){
      let [err,res] = await uni.login().catch(err=>err)
      if (res.errMsg!=='login:ok') return uni.$showMsg('登录失败1')
      let query = {
        code:res.code,
        encryptedData:info.encryptedData,
        iv:info.iv,
        rawData:info.rawData,
        signature:info.signature
      }
      let data = await uni.$http.post('/api/public/v1/users/wxlogin',query)
      data.token='123321'
      console.log(data);
      if(data.statusCode!==200) return uni.$showMsg('登录失败2')
      this.updateToken(data.token)
    },
    ...mapMutations('myUser',['updateUserInfo','updateToken'])
  },
	watch: {},

	// 组件周期函数--监听组件挂载完毕
	mounted() {},
	// 组件周期函数--监听组件数据更新之前
	beforeUpdate() {},
	// 组件周期函数--监听组件数据更新之后
	updated() {},
	// 组件周期函数--监听组件激活(显示)
	activated() {},
	// 组件周期函数--监听组件停用(隐藏)
	deactivated() {},
	// 组件周期函数--监听组件销毁之前
	beforeDestroy() {},
};
</script>

<style scoped lang="less">
.login{
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  &::after{
    content: ' ';
    display: block;
    width: 100%;
    height: 40px;
    background-color:  white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  button{
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  .tips{
    font-size: 13px;
    color:gray
  }
}
</style>