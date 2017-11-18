<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for='(item,index) in list' :key="index">
                <router-link :to="'/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>{{item.add_time|datefmt("YY-MM-DD HH:mm:ss")}}</span>
                            <span class="numclick">{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import myUrl from '../../kits/common';
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            list:[]
        }
    },
    methods:{
        getnews(){
            var url=myUrl.myUrl+'/api/getnewslist';
            this.$http.get(url).then(function(res){
                if(res.body.status==0){
                    this.list=res.body.message;
                }else{
                    Toast("资源获取失败")
                }
            })
        }
    },
    created(){
        this.getnews();
    }
};
</script>
<style scoped>
.mui-table-view .mui-media-object.mui-pull-left{
    width: 80px;
    height: 80px;
}
.mui-table-view .mui-media-object{
    max-width: 80px;
    line-height: 80px;
}
.mui-table-view-cell>a{
    position: relative;
}
.mui-table-view-cell p{
    color:#0099ff;
    position: absolute;
    bottom: 15px;
    width: 100%;
}
.mui-table-view-cell p .numclick{
     position: absolute;
     right: 120px;
}
.mui-media-body{
    padding-top: 5px;
}

</style>