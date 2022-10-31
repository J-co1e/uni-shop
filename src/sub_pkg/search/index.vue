<template>
	<view class="search" :style="{height:w+'px'}">
		<view class="searchCont">
			<view class="searchBox">
				<icon type="search" :size="mini" color="black" />
				<input v-model="searchKey" placeholder="请输入搜索内容" placeholder-style="font-size:28rpx" focus=false @input="input" />
			</view>
		</view>

		<view class="searchHistory">
			<view class="history1">
				<view>搜索历史</view>
				<image src="../../static/trash.png" @click="deleteHistory"/>
			</view>
			<view class="history2">
				<view class="historyItem" v-for="(item,i) in historyList" :key="i" @click="historyClick(item)">
					<view>{{item}}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="searchList" v-show="!isNull">
			<view class="searchItem" v-for="(item,i) in searchList" :key="i" @click="itemClick(item)">
				<icon type="search" :size="mini" color="black" />
				<view>{{item.goods_name}}</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
export default {
	name: "search",
	components: {},
	props: {},
	data() {
		return {
			searchKey: "",
			timer: null,
			w: 0,
			isNull: true,
			searchList: [],
			historyList: [],
		};
	},
	computed: {},
	methods: {
		input() {
			if (this.searchKey == null || this.searchKey.length <= 0) {
				this.isNull = true;
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.getSearchList();
			}, 500);
		},
		async getSearchList() {
			let kw = this.searchKey.replace(/\s*/g, "");
			this.saveHistory(kw);
			if (kw == null || kw <= 0) return;
			if (kw !== "") {
				this.isNull = false;
			}
			let { data: res } = await uni.$http.get(
				`/api/public/v1/goods/qsearch?query=${kw}`
			);
			if (res.meta.status !== 200) return uni.$showMsg();
			this.searchList = res.message;
		},
		changeColor(result) {
			//result为接口返回的数据
			result.map((item, index) => {
				if (this.keyword) {
					/**
					 * 使用正则表达式进行全文匹配关键词
					 * ig : 表示 全文查找 ,忽略大小写
					 *  i : 忽略大小写
					 *  g : 全文查找
					 *
					 * 使用字符串的replace方法进行替换
					 * stringObject.replace('被替换的值',替换的值)
					 */
					let replaceReg = new RegExp(this.keyword, "ig");
					let replaceString = `<span style="color: #ed4014">${this.keyword}</span>`;
					result[index].title = item.title.replace(replaceReg, replaceString);
					result[index].content = item.content.replace(
						replaceReg,
						replaceString
					);
				}
			});
			this.records = result;
		},
		getHeight() {
			this.w = uni.getSystemInfoSync().windowHeight;
		},
		itemClick(item) {
			uni.navigateTo({
				url: `/sub_pkg/goods_detail/index?goods_id=${item.goods_id}`,
			});
		},
		saveHistory(kw) {
			if (kw == null || kw <= 0) return;
			this.historyList.unshift(kw.trim());
			this.historyList = [...new Set(this.historyList)]
			uni.setStorageSync('keyword', JSON.stringify(this.historyList))
		},
		deleteHistory(){
			uni.showModal({
				title: '提示',
				content: '确定要删除历史记录吗?',
				success: (res) => {
					if (res.confirm) {
						this.historyList=[]
						uni.clearStorageSync("keyword")
					}
				}
			})
		},
		historyClick(item){
			this.searchKey=item
			this.getSearchList()
		}
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.getHeight();
		this.historyList = JSON.parse(uni.getStorageSync('keyword')||'[]')
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
.search {
	background-color: #fff;
	.searchCont {
		background-color: #c00000;
		padding: 7px;
		.searchBox {
			display: flex;
			background-color: white;
			border-radius: 15px;
			padding: 7px;
			icon {
				transform: translateY(10rpx);
				margin: 0 10rpx;
			}
			input {
				flex: 1;
			}
		}
	}
	.searchHistory {
		.history1 {
			display: flex;
			justify-content: space-between;
			width: 90%;
			margin: 0 auto;
			border-bottom: 1px solid #ccc;
			padding: 5px;
			font-size: 14px;
			font-weight: 900;
			image {
				width: 20px;
				height: 20px;
			}
		}
		.history2 {
			display: flex;
			flex-wrap: wrap;
			padding: 0 13px;
			max-height: 73px;
			overflow: hidden;
			.historyItem {
				view {
					background-color: rgb(235, 235, 235);
					margin: 0 5px;
					margin-top: 10px;
					padding: 3px 5px;
				}
			}
		}
	}
	.searchList {
		height: 439px;
		margin: 10px 0;
		box-shadow: 0 -1px 6px #aaa;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: white;
		.searchItem {
			padding: 13px;
			border-bottom: 1px solid #aaa;
			display: flex;
			icon {
				transform: translateY(5rpx);
				margin-right: 7rpx;
			}
			view {
				font-size: 13px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				width: 95%;
			}
		}
	}
}
</style>