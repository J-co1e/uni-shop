<template>
	<view class="cart">
		<view v-if="total===0" class="null">
			<text>当前购物车为空</text>
		</view>
		<view v-else>
			<my-address></my-address>
			<view class="cartTitle">
				<uni-icons type="shop" size="18"></uni-icons>
				<text>购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(item,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swiperHandler(item)">
						<my-goods :item="item" :isChecked="isChecked" @radioChange="radioHandler" @numChange="numChange" class="goods"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<my-settle></my-settle>
		</view>
	</view>
</template>

<script>
import myGoods from "../../components/myGoods/index.vue";
import myAddress from "../../components/myAddress/index.vue";
import mySettle from "../../components/mySettle/index.vue";
import { mapState, mapMutations, mapGetters } from "vuex";
import badgeMix from "../../mixins/tabbar-badge";
export default {
	name: "cart",
	components: { myGoods, myAddress, mySettle },
	props: {},
	mixins: [badgeMix],
	data() {
		return {
			isChecked: true,
			options: [
				{
					text: "删除",
					style: {
						backgroundColor: "#c00000",
						fontSize: 13.5 + "px",
					},
				},
			],
		};
	},
	computed: {
		...mapState("myCart", ["cart"]),
		...mapGetters("myCart", ["total"]),
	},
	methods: {
		radioHandler(e) {
			this.updateGoodsState(e);
		},
		...mapMutations("myCart", [
			"updateGoodsState",
			"updateGoodsCount",
			"removeGoods",
		]),
		numChange(e) {
			this.updateGoodsCount(e);
		},
		swiperHandler(item) {
			uni.showModal({
				title: "提示",
				content: "确认要删除当前商品吗?",
				showCancel: true,
				success: (res) => {
					if (res.confirm) {
						this.removeGoods(item);
					}
				},
			});
		},
	},
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

<style scoped lang="less">
.cart {
	position: absolute;
	width: 100%;
	height: fit-content;
	background-color: #efefef;
	padding-bottom: 50px;
	.null{
		text-align: center;
	}
	.cartTitle {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		background-color: #fff;
		padding-left: 5px;
		border-bottom: 1px solid rgb(123, 123, 123);
		text {
			margin-left: 10px;
		}
	}
}
</style>