<template>
  <div>
      <mt-header fixed title="yyx的Vue商城系统">
          <mt-button icon="back" slot="left" @click='goback' v-if="isshow">返回</mt-button>
      </mt-header>
      <!--<div id="b"><mt-header fixed title="yyx的Vue商城系统"></mt-header>
      <a href="javascript:;" @click='goback' v-if="isshow">返回</a></div> -->
      <router-view id="marginTF"></router-view>
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/Home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/tabbar-with-chat">
          <span class="mui-icon mui-icon-email"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopcar">
          <span class="mui-icon mui-icon-contact">
            <span class="mui-badge" id="che">0</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/tabbar-with-map">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
		</nav>
  </div>
</template>
<script>
import {vm,inputNum} from './kits/myVm'
import lstorage from './kits/shopCar'
export default {
  data(){
    return {
      isshow:false
    }
  },
  watch:{
    '$route':function(n,o){
        if(n.path=="/Home"){
          this.isshow=false;
        }else{
          this.isshow=true;
        }
    }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    }
  },
  mounted(){
      document.getElementById("che").innerText=lstorage.getTotal();
  },
  created(){
    vm.$on('inputNum',function(v){
      document.getElementById("che").innerText=lstorage.getTotal();
    })
  }
}
</script>
<style scoped>
.mint-header{
  background-color: #990066;
}
.mint-header.is-fixed{
  z-index: 10;
}
#b{
  position: fixed;
  top: 0;
  z-index: 999;
}
#b a{
  text-decoration: none;
  color:#fff;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
  width: 40px;
}
</style>

