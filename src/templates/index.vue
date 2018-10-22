<template>
<div id="root">
  <router-view></router-view>
</div>
</template>
<script>
export default {
  data() {
    return {
      text: 'Hello world',
      inputText: '',
      child: ''
    }
  },
  components: {

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

    }
  }
}
</script>
