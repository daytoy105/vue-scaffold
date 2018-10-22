export default {
  state: {
    count: 1
  },
  mutations: {
    add(state) {
      state.count++
    },
    sub(state) {
      state.count--
    }
  }
}
