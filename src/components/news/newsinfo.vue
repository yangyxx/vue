<template>
    <div>
        <div class="top">
            <h4>{{list.title}}</h4>
            <p>{{list.add_time|datefmt('YYYY-MM-DD')}}&nbsp; {{list.click}}次浏览</p>
        </div>
        <div class="bottom" v-html="list.content">
        </div>
        <comment :artid="newsid"></comment>
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
                newsid:this.$route.params.newsId,
                list:{}
            }
        },
        created(){
            this.getinfo();
            
        },
        methods:{
            getinfo(){
                var url=myurl.myUrl+'/api/getnew/'+this.newsid;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.list=res.body.message[0]
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
</style>