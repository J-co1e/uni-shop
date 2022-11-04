<template>
	<view>
    <my-user v-if="token"></my-user>
    <my-login v-else></my-login>
  </view>
</template>

<script>
import myLogin from '../../components/myLogin/index.vue'
import myUser from '../../components/myUser/index.vue'
import badgeMix from "../../mixins/tabbar-badge";
import { mapState } from "vuex";
export default {
	name: "my",
	components: {myLogin,myUser},
	props: {},
	mixins: [badgeMix],
	data() {
		return {};
	},
	computed: {
    ...mapState("myUser",["token"])
  },
	methods: {},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	// onPullDownRefresh() { uni.stopPullDownRefresh(); },
	// 页面处理函数--监听用户上拉触底
	// onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll(event) {},
	// 页面处理函数--用户点击右上角分享
	// onShareAppMessage(options) {},
};
</script>

<style scoped></style>