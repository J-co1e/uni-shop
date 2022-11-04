<template>
	<view class="myUser">
    <view class="topBox">
      <image :src="userInfo.avatarUrl" class="avatar"></image>
      <view class="nickName">{{userInfo.nickName}}</view>
    </view>
    <view class="bottomBox" @click="logOut">
      <view>退出登录</view>
      <view>></view>
    </view>
  </view>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
	name: "myUser",
	props: {},
	data() {
		return {};
	},
	computed: {
    ...mapState('myUser',['userInfo'])
  },
	methods: {
    ...mapMutations('myUser',['updateUserInfo','updateToken','updateAddress']),
    logOut(){
      uni.showModal({
        title: '提示',
        content: '确认退出登录吗?',
        showCancel: true,
        success: (res) => {
          if(res.confirm){
            this.updateUserInfo({})
            this.updateToken('')
            this.updateAddress({})
          }
        }
      })
    }
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
.myUser{
  height: 100%;
  background-color: #f4f4f4;
  .topBox{
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .avatar{
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid #fff;
      box-shadow: 0 1px 5px black;
    }
    .nickName{
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  .bottomBox{
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
  }
}
</style>