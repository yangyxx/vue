<template>
    <div class="clas">
        <div @click="jian">-</div><div>{{num}}</div><div @click="add">+</div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                num:1
            }
        },
        methods:{
            add(){
                this.num++;
                this.sendcount()
            },
            jian(){
                this.num--;
                if(this.num<1){
                    this.num=1
                }
                this.sendcount()
            },
            sendcount(){
                this.$emit("count",this.num)
            }
        }
    }
</script>
<style scoped>
.clas div{
    width: 30px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    border:1px solid #ccc;
    margin: 0 0px;
}
.clas div:nth-of-type(2){
    width: 40px;
}
</style>