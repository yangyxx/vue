<template>
    <div>
        <lunbo :imglist="list"></lunbo>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/photolist">
                    <span class="mui-icon mui-icon-email"></span>
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/goodslist">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></router-link></li>
        </ul> 
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import myUrl from "../kits/common";
import lunbo from "./subcom/lunbo";
export default {
  components:{
    lunbo
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getimg: function() {
      var url = myUrl.myUrl + "/api/getlunbo";
      this.$http.get(url).then(function(res) {
        if (res.body.status == 0) {
          this.list = res.body.message;
        } else {
          Toast("资源获取失败");
        }
      });
    }
  },
  created() {
    this.getimg();
  }
};
</script>
<style scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before{
  content: "";
  display: block;
  width: 40px;
  height: 41px;
  background-repeat: round;
}
.mui-icon-home:before {
  background-image: url(../assets/imgs/1.png);
}
.mui-icon-email:before {
  background-image: url(../assets/imgs/2.png);
}
.mui-icon-chatbubble:before {
  background-image: url(../assets/imgs/3.png);
}
.mui-icon-location:before {
  background-image: url(../assets/imgs/4.png);
}
.mui-icon-search:before {
  background-image: url(../assets/imgs/5.png);
}
.mui-icon-phone:before {
  background-image: url(../assets/imgs/6.png);
}
</style>