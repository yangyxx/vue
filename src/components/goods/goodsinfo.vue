<template>
    <div>
        <lunbo :imglist="imglist" class="lunbo"></lunbo>
        <div class="shows">
            <h4>{{goodsParam.title}}</h4>
            <hr>
            <div class="pric">市场价：<del>￥{{goodsParam.market_price}}</del> &nbsp;&nbsp;销售价：<span>￥{{goodsParam.sell_price}}</span></div>
            <div class="ball">购买数量：<goodschajian class="cj" @count='getcount'></goodschajian>
            <transition name="isball"
                @before-enter='beforeE' @enter='isenter' @after-enter='afterE'>
                <span v-if='isshow'></span>
            </transition>
            </div>
            <div>
                <mt-button type="danger" size="small" >立即购买</mt-button>
                <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
            </div>
        </div>
         <div class="param">
            <h4>商品参数</h4>
            <hr>
            <div>商品货号：{{goodsParam.goods_no}}</div>
            <div>库存情况：{{goodsParam.stock_quantity}}件</div>
            <div>上架时间：{{goodsParam.add_time|datefmt("YYYY-MM-DD")}}</div>
        </div>
        <div class="btn">
            <router-link :to="'/goodsdesc/'+goodsid"><mt-button class="firs" type="primary" size="large" plain>图文介绍</mt-button></router-link>
            <router-link :to="'/goodsComm/'+goodsid"><mt-button type="danger" size="large" plain>商品评论</mt-button></router-link>
        </div>
    </div>
</template>
<script>
import u from '../../kits/common'
import {Toast} from 'mint-ui'
import lunbo from '../subcom/lunbo'
import goodschajian from '../subcom/goodschajian'
import lstorage from '../../kits/shopCar'
import {vm,inputNum} from '../../kits/myVm'
    export default{
        components:{
            lunbo,
            goodschajian
        },
        data(){
            return {
                goodsid:0,
                imglist:[],
                goodsParam:{},
                inputNumber:1,
                isshow:false
            }
        },
        created(){
            this.goodsid=this.$route.params.goodsid;
            this.getimg()
            this.getgoodsP()
        },
        methods:{
            beforeE(el){
                 el.style.transform="translate(-60px,2px)";
            },
            isenter(el,done){
                el.offsetWidth;
                el.style.transform="translate(100px,300px)";
                done()
            },
            afterE(el){
                this.isshow=!this.isshow;
            },
            getimg(){
                var url=u.myUrl+"/api/getthumimages/"+this.goodsid;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.imglist=res.body.message.map(function(v){
                            return {"img":v.src}
                        });
                    }else{
                        Toast("数据获取失败")
                    }
                })
            },
            getgoodsP(){
                var url=u.myUrl+"/api/goods/getinfo/"+this.goodsid;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.goodsParam=res.body.message[0];
                    }else{
                        Toast("数据获取失败")
                    }
                })
            },
            getcount(v){
                this.inputNumber=v
            },
            addCar(){
                this.isshow=!this.isshow;
                Toast({
                    message: '加入购物车成功',
                    iconClass: 'mui-icon mui-icon-checkmarkempty',
                    duration: 1000
                    //iconClass: 'icon icon-success'
                })
                lstorage.setCar(this.goodsid,this.inputNumber)
                vm.$emit(inputNum, this.inputNumber)
            }
        }
    }

</script>
<style scoped>
/*<style scoped lang='less'>*/
.cj{
    display: inline-block;
}
.ball span{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    transition: transform 0.6s ease;
}
.lunbo,.lunbo div,.shows,.btn,.param{
    margin: 5px;
    margin-top: 0;
    border-radius: 8px;
    border: 2px solid #ddd;
}
.shows,.btn,.param{
    padding: 5px;
}
.shows>div{
    padding: 5px 0;
    padding-left: 10px;
}
.shows h4{
    padding-left: 10px;
    color:#0094ff;
}
.pric{
    font-size: 14px;
    color:#aaa;
}
.pric span{
    color:red;
    font-size: 18px;
}
.pric del{
    color:#333;
}
.btn .firs{
    margin-bottom: 15px;
}
.param{
    color:#666;
}
.param h4{
    padding-left: 10px;
}
.param div{
    padding-left: 10px;
    font-size: 14px;
}
</style>