import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import mintUi from 'mint-ui';
import 'mint-ui/lib/style.min.css';
import './assets/hello-mui/css/mui.css';
import './assets/css/global.css';
import moment from 'moment';
import VuePreview from 'vue-preview'

import App from './App.vue';
import Home from './components/Home.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodsComm from './components/goods/goodsComm.vue';
import shopcar from './components/shopcar/shopcar.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(mintUi);
Vue.use(moment);
Vue.use(VuePreview);
Vue.filter('datefmt',function(inp,fmtstr){
    return moment(inp).format(fmtstr)
})
var router=new VueRouter({
    linkActiveClass:"mui-active",
    routes:[
        {path:'/',redirect:'/Home'},
        {path:'/Home',component:Home},
        {path:'/newslist',component:newslist},
        {path:'/newsinfo/:newsId',component:newsinfo},
        {path:'/photolist',component:photolist},
        {path:'/photoinfo/:imgId',component:photoinfo},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsid',component:goodsinfo},
        {path:'/goodsdesc/:goodsid',component:goodsdesc},
        {path:'/goodsComm/:id',component:goodsComm},
        {path:'/shopcar',component:shopcar},
    ]
})
new Vue({
    el:"#app",
    render:c=>c(App),
    // render:function(creat){
    //     return creat(App)
    // }
    router
})