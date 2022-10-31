<template>
  <view>
    <view class="goodsItem">
				<view class="itemLeft">
					<image :src="item.goods_small_logo || '../../static/logo.png'" />
				</view>
				<view class="itemRight">
					<view>{{item.goods_name}}</view>
					<view>￥{{item.goods_price}}</view>
				</view>
			</view>
  </view>
</template>

<script>
export default {
  name: "myGoods",
  props: {
    item:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
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
}
</script>

<style scoped lang="less">
.goodsItem {
	display: flex;
	font-size: 13.5px;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 1px 1px #aaa;
	padding: 7px 5px;
	.itemLeft {
		margin-right: 5px;
		image {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.itemRight {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		:nth-last-child(1) {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>