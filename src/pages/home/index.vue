<template>
	<div class="home">
		<view class="searchBox">
			<mySearch @click="searchClick"></mySearch>
		</view>
		<swiper indicator-dots autoplay circular indicator-active-color="white">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiperItem" :url="'../../sub_pkg/goods_detail/index?goods_id='+item.goods_id">
					<image :src="item.image_src" mode="widthFix" />
				</navigator>
			</swiper-item>
		</swiper>
		<view class="navList">
			<view class="navItem" v-for="(item,index) in navList" :key="index" @click="navClick(item)">
				<image :src="item.image_src" />
			</view>
		</view>
		<view class="floorList" v-for="(item,index) in floorList" :key="index">
			<image :src="item.floor_title.image_src" class="floorTitle" />
			<view class="imgBox">
				<navigator class="leftBox" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
				</navigator>
				<view class="rightBox">
					<navigator class="rightImg" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
						<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
import mySearch from "../../components/mySearch/index.vue";
import badgeMix from '../../mixins/tabbar-badge'
export default {
	name: "home",
	components: { mySearch },
	props: {},
	mixins:[badgeMix],
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: [],
		};
	},
	computed: {},
	methods: {
		async getSwiperList() {
			let { data: res } = await uni.$http.get("/api/public/v1/home/swiperdata");
			if (res.meta.status !== 200) {
				return uni.showToast({
					title: "数据请求失败",
					icon: "none",
					duration: 1500,
				});
			}
			this.swiperList = res.message;
		},
		async getNavList() {
			let { data: res } = await uni.$http.get("/api/public/v1/home/catitems");
			if (res.meta.status !== 200) return uni.$showMsg();
			this.navList = res.message;
		},
		async getFloorList() {
			let { data: res } = await uni.$http.get("/api/public/v1/home/floordata");
			if (res.meta.status !== 200) return uni.$showMsg();
			res.message.forEach((floor) => {
				floor.product_list.forEach((item) => {
					item.url =
						"/sub_pkg/goods_list/index?" + item.navigator_url.split("?")[1];
				});
			});
			this.floorList = res.message;
		},
		navClick(item) {
			if (item.name === "分类") {
				uni.switchTab({ url: "../cate/index" });
			}
		},
		searchClick() {
			uni.navigateTo({ url: "/sub_pkg/search/index" });
		},
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.getSwiperList(), this.getNavList(), this.getFloorList();
	},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {
	},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {
	},
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
	height: 330rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
.navList {
	display: flex;
	justify-content: space-around;
	margin: 10px 0;
	image {
		width: 140rpx;
		height: 140rpx;
	}
}
.floorTitle {
	height: 60rpx;
	width: 100%;
	display: flex;
}
.imgBox {
	display: flex;
	padding: 10rpx;
	padding-left: 15rpx;
	.rightBox {
		display: flex;
		flex-wrap: wrap;
		margin-left: 15rpx;
		image {
			display: block;
			margin: 5rpx 5rpx;
		}
	}
}
.searchBox {
	position: sticky;
	top: 0;
	z-index: 9999;
}
</style>
