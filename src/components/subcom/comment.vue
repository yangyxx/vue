<template>
    <div class="comm">
        <h4>提交评论</h4>
        <hr>
        <textarea placeholder="请输入评论内容..." v-model.trim="comtext"></textarea>
        <mt-button type="primary" size="large" @click="addcomm">发表</mt-button>
        <hr>
        <h4>评论列表</h4>
        <hr>
        <div class="mui-card" v-for='(v,i) in list' :key="i">
            <div class="mui-card-header">
                <span>{{i+1}}楼 发布者:{{v.user_name}}</span><span>发布时间:{{v.add_time|datefmt("YYYY-MM-DD hh:mm:ss")}}</span>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    {{v.content}}
                </div>
            </div>
		</div>
        <mt-button type="danger" size="large" plain @click="morecom">加载更多</mt-button>
    </div>
</template>
<script>
import myurl from '../../kits/common';
import {Toast} from 'mint-ui';
    export default{
        props:["artid"],
        methods:{
            getcomm(p){
                p=p||1;
                var url=myurl.myUrl+'/api/getcomments/'+this.artid+'?pageindex='+p;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.list=this.list.concat(res.body.message);
                    }else{
                        Toast('资源获取失败')
                    }
                })
            },
            addcomm(){
                if(this.comtext==""){
                    Toast('评论内容不能为空');
                    return
                }
                var url=myurl.myUrl+'/api/postcomment/'+this.artid;
                this.$http.post(url,{content:this.comtext},{emulateJSON:true}).then(function(res){
                     Toast(res.body.message);
                })
                this.list=[{
                    "user_name": "",
                    "add_time": new Date(),
                    "content": this.comtext
                }].concat(this.list);
                this.comtext=""
            },
            morecom(){
                this.page++;
                this.getcomm(this.page);
            }
        },
        data(){
            return {
                page:1,
                list:[],
                comtext:""
            }
        },
        created(){
            this.getcomm(1);
        }
    }
</script>
<style scoped>
.comm{
    padding: 10px;
}
hr{
    margin-bottom: 20px;
}
.mui-card-header{
    background-color: #eee;
    font-size: 14px;
}
</style>