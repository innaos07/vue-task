import Main from '../pages/Main.vue';
import PostPage from '../pages/PostPage.vue';
import PostWithStore from '../pages/PostWithStore.vue';
import PostWithComposite from '../pages/PostWithComposite.vue';
import About from '../pages/About.vue';
import Post from '../pages/Post.vue';
import {createRouter, createWebHashHistory} from 'vue-router';


const routes = [
  { path: '/', component: Main },
  { path: '/posts', component: PostPage },
  { path: '/about', component: About },
  { path: '/posts/:id', component: Post },
  { path: '/store', component: PostWithStore },
  { path: '/composite', component: PostWithComposite },

]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router;