import { mapGetters } from "vuex";
export default{
  computed:{
    ...mapGetters('myCart',['total'])
  },
  methods: {
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  },
  onShow() {
    this.setBadge()
  },
  watch: {
    total:{
      immediate:true,
      handler(newVal){
        uni.setTabBarBadge({
          index:2,
          text:newVal+''
        })
        if (newVal===0) {
          uni.hideTabBarRedDot({ index: 2 })
        }
      }
    }
  },

}