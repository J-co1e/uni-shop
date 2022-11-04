<template>
	<view class="address">
		<view class="addressBox" v-if="JSON.stringify(address)==='{}'">
			<button type="warn" size="mini" class="addressBtn" @click="addressClick">收货地址></button>
		</view>
		<view class="addressInfo" v-else @click="addressClick">
			<view class="row1">
				<view class="row1Left">
					<view class="username">
						姓名:{{address.userName}}
					</view>
				</view>
				<view class="row1Right">
					<view class="phone">
						电话:{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2Left">收货地址:</view>
				<view class="row2Right">
          {{addstr}}
        </view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations,mapState,mapGetters } from "vuex";
export default {
	name: "myAddress",
	props: {},
	data() {
		return {
    };
	},
	computed: {
    ...mapState('myUser',['address']),
    ...mapGetters('myUser',['addstr'])
  },
	methods: {
    async addressClick(){
      let [err,succ] =  await uni.chooseAddress().catch(err=>err)
      if (err===null && succ.errMsg === 'chooseAddress:ok') {
        console.log(succ);
        this.address = succ
        this.updateAddress(succ)
      }
    },
    ...mapMutations('myUser',['updateAddress'])
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
.address {
	.addressBox {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid #c00000;
		background-color: #fff;
	}
	.addressInfo {
		background-color: #fff;
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-bottom: 2px solid #ccc;
		padding: 5px;
		.row1 {
			display: flex;
			justify-content: space-between;
			.row1Right {
        display: flex;
        justify-content: space-between;
			}
		}
    .row2{
      display: flex;
      align-items: center;
      margin-top: 10px;
      .row2Left{
        white-space: nowrap;
      }
    }
	}
}
</style>