<template>
    <div>
        <div class="top">
            <h4>{{list.title}}</h4>
            <p>{{list.add_time|datefmt('YYYY-MM-DD')}}&nbsp; {{list.click}}次浏览</p>
        </div>
        <div class="ii"> 
            <div v-for='(v,i) in piclist' :key="i">
                <img class="preview-img" :src="v.src" @click='$preview.open(i,piclist)'>
            </div>
        </div>
        <div class="bottom" v-html="list.content">
        </div>
        <comment :artid="myid"></comment>
    </div>
</template>
<script>
import myurl from '../../kits/common';
import {Toast} from 'mint-ui';
import comment from '../subcom/comment.vue'
    export default{
        components:{
            comment
        },
        data(){
            return {
                myid:0,
                list:[],
                piclist:[]
            }
        },
        created(){
            this.myid=this.$route.params.imgId;
            this.getinfo();
            this.getpic()
        },
        methods:{
            getinfo(){
                var url=myurl.myUrl+'/api/getimageInfo/'+this.myid;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.list=res.body.message[0]
                    }else{
                        Toast('数据获取失败')
                    }
                })
            },
            getpic(){
                var url=myurl.myUrl+'/api/getthumimages/'+this.myid;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        res.body.message.forEach(function(v){
                            // v.w=400;
                            // v.h=400;
                            var img=document.createElement('img');
                            img.src=v.src;
                            img.onload=function(){
                                v.w=img.width;v.h=img.height;
                            }
                        });
                        this.piclist=res.body.message;
                    }else{
                        Toast('数据获取失败')
                    }
                })
            }
        }
    }
</script>
<style scoped>
.top,.bottom{
     padding: 10px;
 }
 .top{
     border-bottom: 1px solid #ccc;
 }
 .top p{
     margin-top: 10px;
     margin-bottom: 0px;
     color:#999;
 }
 h4{
     color:#0099ff;
 }
.ii{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.ii>div{
     width: 33.33%;
    text-align: center;
}
.ii img{
    margin-top: 10px;
    width: 70%;
    display: inline-block;
}
</style>