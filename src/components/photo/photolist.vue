<template>
    <div>
        <div class="top">
            <ul :style="{width:wid+'px'}">
                <li @click="getimg(0)">全部</li>
                <li v-for='(v,i) in title' :key="i" @click="getimg(v.id)">
                    {{v.title}}
                </li>
            </ul>
        </div>
        <div class="imgs">
            <ul>
                <li v-for='(v,i) in imglist' :key="i">
                    <router-link :to="'/photoinfo/'+v.id">
                        <img v-lazy="v.img_url">
                        <div class="txt">
                            <h4>{{v.title}}</h4> <br>
                            <div>{{v.zhaiyao}}</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import myurl from '../../kits/common';
import {Toast} from 'mint-ui';
    export default{
        data(){
            return {
                title:[],
                imglist:[],
                wid:0
            }
        },
        methods:{
            getnav(){
                var url=myurl.myUrl+'/api/getimgcategory';
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.title=res.body.message;
                        this.wid=(res.body.message.length+2)*80;
                    }else{
                        Toast('数据获取失败')
                    }
                })
            },
            getimg(id){
                var url=myurl.myUrl+'/api/getimages/'+id;
                this.$http.get(url).then(function(res){
                     if(res.body.status==0){
                        this.imglist=res.body.message;
                    }else{
                        Toast('数据获取失败')
                    }
                })
            }
        },
        created(){
            this.getnav();
            this.getimg(0)
        }
    }
</script>
<style scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
*{
    margin: 0;
    padding: 0;
}
.top{
    overflow-x: auto;
    height: 40px;
}
.top li{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    color:#f40;
}
.top li:hover{
    background-color: #630;
}
.imgs img {
    display: block;
    width: 100%;
    height: 300px;
}
.imgs li{
    position: relative;
}
.txt{
    width: 100%;
    padding: 5px;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: rgba(0,0,0,0.3);
}
.txt div{
    font-size: 12px;
}
</style>