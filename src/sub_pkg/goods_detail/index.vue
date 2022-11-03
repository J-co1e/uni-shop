<template>
	<view style="padding-bottom:50px ">
		<swiper indicator-dots autoplay circular>
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)" />
			</swiper-item>
		</swiper>

		<view class="goodsText">
			<view class="price" v-if="goodsInfo.goods_price">￥{{goodsInfo.goods_price}}</view>
			<view class="textBox">
				<view>{{goodsInfo.goods_name}}</view>
				<view class="boxRight">
					<image src="../../static/star.png"></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<view class="tab">
			详细信息
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<view class="goods-carts">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
import { mapState,mapMutations,mapGetters } from "vuex";
export default {
	name: "goods_detail",
	components: {},
	props: {},
	data() {
		return {
			goodsInfo: {},
      options: [{
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
						color: '#fff'
					}
				],
				customButtonGroup1: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}]
		};
	},
	computed: {
    ...mapState('myCart',['cart']),
    ...mapGetters('myCart',['total'])
  },
	methods: {
		async getGoodsInfo(goods_id) {
			let { data: res } = await uni.$http.get("/api/public/v1/goods/detail", {
				goods_id,
			});
			if (res.meta.status !== 200) return uni.$showMsg();
			res.message.goods_introduce = res.message.goods_introduce.replace(
				/<img/g,
				'<img style="display:block;"'
			);
			res.message.goods_introduce = res.message.goods_introduce.replace(
				/.webp/g,
				".jpg"
			);
			this.goodsInfo = res.message;
		},
		preview(i) {
			uni.previewImage({
				urls: this.goodsInfo.pics.map((item) => item.pics_big),
				current: i,
			});
		},
    onClick(e){
      if (e.content.text==='购物车') {
        uni.switchTab({ url: '/pages/cart/index' })
      }
    },
    buttonClick(e){
      if (e.content.text==='加入购物车') {
				uni.showToast({
					title: '加入购物车成功',
					icon: 'success',
				})
        let goods = {
          goods_id:this.goodsInfo.goods_id,
          goods_name:this.goodsInfo.goods_name,
          goods_price:this.goodsInfo.goods_price,
          goods_count:1,
          goods_small_logo:this.goodsInfo.goods_small_logo,
          goods_state:false
        }
        this.addToCart(goods)
      }
      if (e.content.text==='立即购买') {
        console.log(this.cart);
      }
    },
    ...mapMutations('myCart',['addToCart'])
	},
	watch: {
		total:{
			handler(newVal){
				let result = this.options.find(item=>item.text==='购物车')
				if (result) {
					result.info = newVal
				}
			},
			immediate:true
		}
  },

	// 页面周期函数--监听页面加载
	onLoad(options) {
		this.getGoodsInfo(options.goods_id);
    let info = uni.getStorageSync('cart')
    this.options[1].info=JSON.parse(info).length
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
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.goodsText {
	padding: 10px;
	.price {
		color: #c00000;
	}
	.textBox {
		display: flex;
		font-size: 13px;
		justify-content: space-between;
		margin-top: 5px;
		.boxRight {
			display: flex;
			flex-direction: column;
			color: #8a8a8a;
			font-size: 12px;
			align-content: center;
			border-left: 1px solid #efefef;
			padding-left: 13px;
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.yf {
		font-size: 12px;
		color: gray;
	}
}
.tab {
	width: 20%;
	border-bottom: 1px solid #ba8181;
	padding: 5px;
	text-align: center;
	font-size: 15px;
	margin: 30px auto;
}
.goods-carts {
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	left: var(--window-left);
	right: var(--window-right);
	bottom: 0;
  box-shadow: 0 -1px 5px #ccc;
}
</style>