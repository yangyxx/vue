<template>
    <div>
         <mt-swipe :auto="4000">
            <mt-swipe-item v-for='(item,index) in imglist' :key='index'>
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        props:["imglist"]
    }
</script>
<style scoped>
.mint-swipe,
.mint-swipe-items-wrap,
.mint-swipe-items-wrap a,
.mint-swipe-items-wrap img {
  width: 100%;
  height: 300px;
}
.mint-swipe-items-wrap a {
  display: block;
}
</style>