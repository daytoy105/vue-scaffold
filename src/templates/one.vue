<template>
<div>
  <h1 @click="show">{{renderText}}</h1>
  <test-com v-model="inputText" title="components test" :post-title="text" @handleClick="child=$event">这里是插入slot的内容······</test-com>
  <h2>获得子组件的值 ：{{child}}</h2>
  <h2>组件v-model绑定的值 ：{{inputText}}</h2>
  <div>
    <h4>计数: {{$store.state.count}}</h4>
    <button type="button" name="add" @click="add">+</button>
    <button type="button" name="sub" @click="sub">-</button>
  </div>
  <router-link :to="{ name: 'other', params: {id:3} }">其他页面</router-link>
  <router-link to= '/two/34'>页面二</router-link>
</div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Hello world',
      inputText: '',
      child: '',
      count:''
    }
  },
  created(){
    //this.data.count = this.$store.state.count
    console.log('one',this.$store.state.count)
  },
  computed: {
    //计算属性是基于它们的依赖进行缓存的
    renderText() {
      return this.text.split('').reverse().join('')
    }
  },
  methods: {
    async show() {
      let res = await axios.get('http://qy.gd95105888.com/gimc/yueyouren/qy_dongtai/get_evently_nav?userid=15625013340')
      console.log(res)
    },
    handleInput() {

    },
    add(){
      this.$store.commit('add')
    },
    sub(){
      this.$store.commit('sub')
    }
  }
}
</script>
