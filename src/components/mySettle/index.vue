<template>
	<view class="settle">
		<label @click="changeAllChecked">
			<radio color="#c00000" :checked="allChecked"><text>全选</text></radio>
		</label>
		<view class="amountCont">
			合计:<text class="amount">￥{{totalPrice}}</text>
		</view>
		<view class="btn" @click="settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
	name: "mySettle",
	props: {},
	data() {
		return {};
	},
	computed: {
		...mapGetters("myCart", ["checkedCount", "totalPrice", "total"]),
		...mapGetters("myUser", ["addstr"]),
		...mapState("myUser", ["token"]),
		allChecked() {
			return this.total === this.checkedCount;
		},
	},
	methods: {
		...mapMutations("myCart", ["updateAllGoodsState"]),
		changeAllChecked() {
			this.updateAllGoodsState(!this.allChecked);
		},
		settle() {
			if (!this.token) {
				return this.showTips();
			}
			if (!this.checkedCount) {
				return uni.$showMsg("请先勾选要结算的商品");
			}
			if (!this.addstr) {
				return uni.$showMsg("请先选择收货地址");
			}
		},
		showTips() {
			uni.showToast({
				title: "请先登录",
				icon: "none",
				mask: true,
				duration: 1500,
			});
			setTimeout(() => {
				uni.switchTab({ url: '/pages/my/index' })
			}, 1000);
		},
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
.settle {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 50px;
	width: 100%;
	background-color: antiquewhite;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	font-size: 14px;
	padding-left: 5px;
	radio {
		display: flex;
		align-items: center;
	}
	.amountCont {
		.amount {
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn {
		background-color: #c00000;
		color: #fff;
		height: 50px;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>