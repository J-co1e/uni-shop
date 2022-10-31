<template>
	<view class="cont">
		<view v-for="(item,i) in queryObj.goodsList" :key="i" @click="toDetail(item)">
			<my-goods :item="item"></my-goods>
		</view>
 	</view>
</template>

<script>
import myGoods from '../../components/myGoods/index.vue'
export default {
	name: "goods_list",
	components: {myGoods},
	props: {},
	data() {
		return {
			queryObj: {
				query: "",
				cid: "",
				pagenum: 1,
				pagesize: 10,
				isLoading: false,
				goodsList: [],
				total: 0,
			},
		};
	},
	computed: {},
	methods: {
		async getGoodsList(cb) {
      this.isLoading=true
			let { data: res } = await uni.$http.get(
				"/api/public/v1/goods/search",
				this.queryObj
			);
      this.isLoading=false
      cb&&cb()
			if (res.meta.status !== 200) return uni.$showMsg();
			this.queryObj.goodsList = [...this.queryObj.goodsList,...res.message.goods]
			this.queryObj.total = res.message.total;
		},
    toDetail(item){
      uni.navigateTo({ url: `/sub_pkg/goods_detail/index?goods_id=${item.goods_id}` })
    }
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(options) {
		this.getGoodsList();
		this.queryObj.query = options.query || "";
		this.queryObj.cid = options.cid || "";
	},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	onPullDownRefresh() {
    this.queryObj.pagenum=1
    this.queryObj.total=0
    this.isLoading=false
    this.queryObj.goodsList=[]
    this.getGoodsList(()=>uni.stopPullDownRefresh())
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {
    if(this.queryObj.pagenum*this.queryObj.pagesize>=this.queryObj.total) return uni.$showMsg('数据加载完毕')
    if(this.isLoading) return
    this.queryObj.pagenum+=1
    this.getGoodsList()
  },
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll(event) {},
	// 页面处理函数--用户点击右上角分享
	// onShareAppMessage(options) {},
};
</script>

<style scoped lang="less">

</style>