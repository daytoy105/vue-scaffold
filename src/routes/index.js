import other from 'templates/other.vue'
import index from 'templates/one.vue'
import two from 'templates/two.vue'
export default [{
  path: '/',
  component: index
}, {
  path: '/other/:id',
  name: 'other',
  component: other
}, {
  path: '/two/:id',
  component: two
}]
