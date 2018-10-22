import Vue from 'vue';
Vue.component('test-com', {
  props: ['title', 'value', 'postTitle'],
  template: `
    <div>
      <p @click="$emit('handleClick','child-value')">Props向父组件传值： {{title}} -  {{postTitle}}</p>
      <input :value="value" @input="$emit('input', $event.target.value)" />
      <div>
        <slot></slot>
      </div>
      <span @click="comClick">组件click</span>
    </div>`,
  methods: {
    comClick() {
      
    }
  }
})
