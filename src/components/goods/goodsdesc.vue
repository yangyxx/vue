<template>
  <div>
    <div>
        <div class="top">
            <h4>{{list.title}}</h4>
        </div>
        <div class="bottom" v-html="list.content">
        </div>
    </div>
  </div>
</template>
<script>
import u from '../../kits/common'
import {Toast} from 'mint-ui'
    export default{
        data(){
            return {
                id:0,
                list:{}
            }
        },
        created(){
            this.id=this.$route.params.goodsid;
            this.getlist()
        },
        methods:{
            getlist(){
                var url=u.myUrl+'/api/goods/getdesc/'+this.id;
                this.$http.get(url).then(function(res){
                    if(res.body.status==0){
                        this.list=res.body.message[0]
                    }else{
                        Toast("数据获取失败")
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
 h4{
     color:#0099ff;
 }
</style>
