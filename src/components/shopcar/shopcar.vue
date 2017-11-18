<template>
    <div>
        <ul class="mui-table-view">
            <li v-for='(v,i) in list' :key="i" class="mui-table-view-cell mui-media">
                <div class="mui-media-object mui-pull-left w">
                    <mt-switch v-model="v.statu" @change="money()"></mt-switch>
                </div>
                <div class="mui-media-body">
                    <li class="mui-table-view-cell mui-media n">
                        <div class="mui-media-object mui-pull-left ll">
                            <img :src="v.thumb_path">
                        </div>
                        <div class="mui-media-body nr">
                            <router-link :to="'/goodsinfo/'+v.id"><h4>{{v.title}}</h4></router-link>
                            <div class='mui-ellipsis'>
                                <span>￥{{v.sell_price}}</span>
                                <div class="cj">
                                    <div @click="jian(v.id,v.cou,i)">-</div><div>{{v.cou}}</div><div @click="add(v.id,v.cou,i)">+</div>
                                </div>
                                <button @click="del(v.id,i)">删除</button>
                            </div>
                        </div>
                    </li>
                </div>
            </li>
        </ul>
        <div class="total">
            <h4>总计(不含运费):</h4>
            <p>已经选择商品<span>{{num}}</span>件，总价<span>￥{{allmoney}}</span>元</p>
            <mt-button type="danger" size="normal" class="suan">去结算</mt-button>
        </div>
    </div>
</template>
<script>
import lstorage from '../../kits/shopCar'
import u from '../../kits/common'
import {Toast} from 'mint-ui'
import {vm,inputNum} from '../../kits/myVm'
export default {
  data(){
      return {
          allmoney:0,
          num:0,
          list:[]
      }
  },
  created(){
      this.getlist()
  },
  methods:{
      money(){
          var n=0,m=0;
          this.list.forEach(function(v){
              if(v.statu===true){
                  n+=v.cou;
                  m+=v.cou*v.sell_price
              }
          })
          this.num=n;
          this.allmoney=m;
      },
      jian(id,c,i){
          c--;
          if(c<=0){
              c=1;
              return
          }
          lstorage.resetCar(id,c);
          this.list[i].cou=c;
          vm.$emit(inputNum,id);
          this.money();
      },
      add(id,c,i){
          c++;
          lstorage.resetCar(id,c);
          this.list[i].cou=c;
          vm.$emit(inputNum,id);
          this.money();
      },
      getlist(){
          this.num=0;
          this.allmoney=0;
          var ls=lstorage.getCar();
          var idarr=ls.map(function(v){
              return v.goodsid
          })
          if(idarr.length==0){
              this.list=[];
              return
          }
          var url=u.myUrl+'/api/goods/getshopcarlist/'+idarr.join(',');
          this.$http.get(url).then(function(res){
              if(res.body.status==0){
                this.list=res.body.message.map(function(v){
                    for(var i=0;i<ls.length;i++){
                        if(v.id==ls[i].goodsid){
                            v.cou=ls[i].count;
                            v.statu=false;
                        }
                    }
                    return v;
                });
              }else{
                  Toast("数据获取失败")
              }
          })
      },
      del(id,i){
          lstorage.removeCar(id);
          this.list.splice(i,1);
          vm.$emit(inputNum,id)
          this.money();
      }
  }
}
</script>
<style scoped>
.mui-table-view,.total{
    border: 1px solid #aaa;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px #999;
}
.total{
    background-color: rgba(0,0,0,0.1);
    padding: 10px;
    position: relative;
}
.total .suan{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}
.total span{
    color: red;
    font-size: 16px;
    font-weight: 700;
}
.total p{
    margin-bottom: 0px;
    margin-top: 15px;
}
.mui-pull-left.ll{
    height: 100%;
    left: 62px;
}
.mui-pull-left.ll>img{
    display: block;
    height: 100%;
}
.mui-table-view-cell.mui-active{
    background-color: #fff;
}
.mui-media.n{
    padding: 0;
    height: 80px;
}
.mui-table-view .mui-media-object{
    max-width: 60px;
}
.mui-table-view-cell.mui-media{
    position: relative;
}
.mui-table-view .mui-media-object,.mui-media-body.nr{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.mui-media-body.nr{
    left: 150px;
    height: 100%;
    width: 80%;
}
.mui-pull-left.w{
    z-index: 3;
}
.cj{
    display: inline-block;
}
.cj div{
    width: 30px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    border:1px solid #ccc;
    margin: 0 0px;
}
.cj div:nth-of-type(2){
    width: 40px;
}
.nr h4{
    color:#0096ff;
    white-space: nowrap;
}
.nr button{
    padding: 2px 0;
    width: 60px;
    color:#0096ff;
}
.nr .mui-ellipsis{
    transform: translateY(20px);
}
.nr .mui-ellipsis span{
    display: inline-block;
    color:red;
    font-weight: 700;
    width: 70px;
}
</style>

