import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '../utils/userInfo'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/category/:cate',
        name: 'category',
        component: () => import('../views/Home.vue'),
        meta: { title: '分类', params: 'cate' }
    },
    {
        path: '/search/:words',
        name: 'search',
        component: () => import('../views/Home.vue'),
        meta: { title: '搜索', params: 'words' }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: { title: '关于' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/user/Register.vue'),
        meta: { title: '注册' }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/user/Main.vue'),
        meta: { title: '个人中心', isAuth: true }
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/user/MyArticle.vue'),
        meta: { title: '文章管理', isAuth: true }
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/user/Setting.vue'),
        meta: { title: '更改资料', isAuth: true }
    },
    {
        path: '/edit/:articleId',
        name: 'editArticle',
        component: () => import('../views/EditArticle.vue'),
        props: true,
        meta: { title: '编辑文章', isAuth: true, params: 'articleId' }
    },
    {
        path: '/friend',
        name: 'friend',
        component: () => import('../views/Friend.vue'),
        meta: { title: '友链' }
    },
    {
        path: '/addArticle',
        name: 'addArticle',
        component: () => import('../views/AddArticle.vue'),
        meta: { title: '新文章', isAuth: true }
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Articles.vue'),
        meta: { title: '文章' }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    let title = "Ricardo's blog"
    if (to.meta.isAuth) { // 判断是否需要进行导航守卫
        const token = getToken()
        if (token != "") {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
    if (to.meta.params) {
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    } else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.dispatch('setLoading', true);
    }
    next();
})
router.afterEach((to, from) => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.dispatch('setLoading', false);
    }, 500)
})
export default router
