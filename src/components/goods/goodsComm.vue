<template>
  <div>
      <comment :artid='id'></comment>
  </div>
</template>
<script>
import comment from '../subcom/comment'
export default {
  data(){
      return {
          id:0
      }
  },
  created(){
      this.id=this.$route.params.id;
  },
  components:{
      comment
  }
}
</script>
<style scoped>

</style>

