<template>
  <view class="search" @click="searchClick">
    <view class="searchBox">
      <icon type="search" :size="mini" color="black"/>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "search",
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    searchClick(){
      this.$emit("click")
    }
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
.search{
  background-color: #c00000;
  padding: 20rpx;
  .searchBox{
    background-color: #fff;
    border-radius:30rpx;
    padding: 15rpx;
    font-size: 27rpx;
    text-align: center;
    icon{
      transform: translateY(5rpx);
    }
    text{
      margin-left: 7rpx;
    }
  }
}
</style>