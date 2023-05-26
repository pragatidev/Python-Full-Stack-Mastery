import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/components/PostList.vue'
import CreatePost from '@/components/CreatePost.vue'
import UpdatePost from '@/components/UpdatePost.vue'

const routes = [
  {
    path: '/',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/update/:id',
    name: 'UpdatePost',
    component: UpdatePost,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
