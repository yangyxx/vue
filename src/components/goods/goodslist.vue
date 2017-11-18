<template>
    <div>
        <div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li v-for="(v,i) in list" :key="i" class="mui-table-view-cell mui-media mui-col-xs-6">
		            <router-link :to="'/goodsinfo/'+v.id">
		                <img class="mui-media-object" :src="v.img_url">
		                <h4 class="mui-media-body" v-text="v.title"></h4>
                        <div class="hot">
                            <div><span class="red">￥{{v.sell_price}}</span><del>￥{{v.market_price}}</del></div>
                            <div class="seal">热卖中<span>剩{{v.stock_quantity}}件</span></div>
                        </div>
                    </router-link>
                </li>
		    </ul>    
		</div>
        <mt-button type="danger" size="large" @click="moregoods">加载更多</mt-button>
    </div>
</template>
<script>
import u from '../../kits/common'
import {Toast} from 'mint-ui'
export default {
    data(){
       return {
            list:[],
            page:1
       }
    },
    methods:{
        getlist(n){
            var url=u.myUrl+'/api/getgoods?pageindex='+n;
            this.$http.get(url).then(function(res){
                if(res.body.status==0){
                    if(res.body.message.length==0){
                         Toast("没有更多了");
                         return
                    }
                    this.list=this.list.concat(res.body.message)
                }else{
                    Toast("数据获取失败")
                }
            })
        },
        moregoods(){
            this.page++;
            this.getlist(this.page)
        }
    },
    created(){
        this.getlist(1)
    }
};
</script>
<style scoped>
.mui-content {
  overflow: hidden;
}
.mui-table-view.mui-grid-view {
  margin-top: 5px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell {
  text-align: left;
}
.mui-content,
.mui-table-view.mui-grid-view .mui-table-view-cell,
.mui-table-view.mui-grid-view {
  padding: 0px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell a {
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #bbb;
}
.hot {
  height: 70px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 10px;
}
.hot .red {
  color: red;
  font-size: 16px;
  margin-right: 20px;
}
.hot del {
  font-size: 14px;
}
.hot .seal {
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.hot .seal span {
  position: absolute;
  right: 20px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 18px;
    line-height: 18px;
    height: 18px;
    color:#0095ff;
}
</style>