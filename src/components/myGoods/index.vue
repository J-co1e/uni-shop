<template>
	<view>
			<view class="goodsItem">
						<view class="itemLeft">
							<radio :checked="item.goods_state" color="#c00000" v-if="isChecked" @click="radioClick" />
							<image :src="item.goods_small_logo || '../../static/logo.png'" />
						</view>
						<view class="itemRight">
							<view>{{item.goods_name}}</view>
							<view class="rightBottom">
								<view>￥{{item.goods_price}}</view>
								<uni-number-box :min="1" @change="numberBox" :value="item.goods_count" v-if="isChecked"></uni-number-box>
							</view>
						</view>
					</view>
	</view>
</template>

<script>
export default {
	name: "myGoods",
	props: {
		item: {
			type: Object,
			default: {},
		},
		isChecked: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {};
	},
	computed: {},
	methods: {
		radioClick() {
			this.$emit("radioChange", {
				goods_id: this.item.goods_id,
				goods_state: !this.item.goods_state,
			});
		},
		numberBox(val) {
			this.$emit("numChange", {
				goods_id: this.item.goods_id,
				goods_count: +val,
			});
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
.goodsItem {
	display: flex;
	border-radius: 15px;
	margin: 5px 3px;
	font-size: 13.5px;
	box-shadow: -1px 1px 3px #aaa;
	padding: 7px 5px;
	background-color: #fff;
		.itemLeft {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;
			image {
				width: 100px;
				height: 100px;
				display: block;
				border-radius: 15px;
			}
		}
		.itemRight {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		flex:1;
			padding: 5px;
			.rightBottom {
				display: flex;
				justify-content: space-between;
				:nth-child(1) {
					font-size: 16px;
					color: #c00000;
			}
		}
	}
}
</style>