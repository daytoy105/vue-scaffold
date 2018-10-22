<template>
  <div>
    <h1>{{text}}</h1>
    <h3>路由参数id: {{$route.params.id}}</h3>
    <router-link to='/'>首页</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: '第二个页面'
      }
    },
    created(){
      //console.log(this.$route)
    }
  }
</script>
