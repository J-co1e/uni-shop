<template>
	<view>
		<mySearch @click="gotoSearch"></mySearch>
		<view class="scrollBox">
			<scroll-view scroll-y="true" :style="{height:sh+'px'}" class="scrollLeft">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['leftItem',i===active? 'active':'']" @click="leftItemClick(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height:sh+'px'}" class="scrollRight" :scroll-top="scrollTop">
				<view v-for="(item2,i2) in cateList2" :key="i2">
					<view class="rightTitle">/{{item2.cat_name}}/</view>
					<view class="rightList">
						<view class="rightItem" v-for="(item3,i3) in item2.children" :key="i3" @click="itemClick(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
import mySearch from '../../components/mySearch/index.vue'
import badgeMix from '../../mixins/tabbar-badge'
export default {
	name: "cate",
	components: {mySearch},
	props: {},
	mixins:[badgeMix],
	data() {
		return {
			sh: 0,
			active: 0,
			scrollTop: 0,
			cateList: [],
			cateList2: [],
			cateList3: [],
		};
	},
	computed: {},
	methods: {
		getScreenHeight() {
			let s = uni.getSystemInfoSync();
			this.sh = s.windowHeight-50;
		},
		async getCateList() {
			let { data: res } = await uni.$http.get("/api/public/v1/categories");
			if (res.meta.status !== 200) return uni.$showMsg();
			this.cateList = res.message;
			this.cateList2 = res.message[0].children;
			this.cateList3 = this.cateList2[0].children;
		},
		leftItemClick(i) {
			this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			this.active = i;
			this.cateList2 = this.cateList[i].children;
			this.cateList3 = this.cateList2[i].children;
		},
		itemClick(item) {
			uni.navigateTo({ url: `/sub_pkg/goods_list/index?cid=${item.cat_id}` });
		},
		gotoSearch(){
			uni.navigateTo({ url: '/sub_pkg/search/index' })
		},
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.getScreenHeight(), this.getCateList()
	},

	// 页面周期函数--监听页面初次渲染完成
	onReady() {
	},
	// 页面周期函数--监听页面显示(not-vue)
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
	// 页面处理函数--监听页面滚动(not-vue)
	// onPageScroll(event) {},
	// 页面处理函数--用户点击右上角分享
	// onShareAppMessage(options) {},
};
</script>

<style scoped lang="less">
.scrollBox {
	display: flex;
	.scrollLeft {
		width: 120px;
		.leftItem {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active {
				background-color: #fff;
				position: relative;
				color: #c00000;
				&::before {
					content: "";
					display: block;
					width: 3px;
					height: 40px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	.scrollRight {
		.rightTitle {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 35px 0px;
		}
		.rightList {
			display: flex;
			flex-wrap: wrap;
			.rightItem {
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
				image {
					width: 60px;
					height: 60px;
				}
				text {
					font-size: 12px;
				}
			}
		}
	}
}
</style>