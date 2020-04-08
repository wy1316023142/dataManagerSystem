import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: {name: 'index'},
            component: () => import('@/views/layout.vue'),
            children: [
                {
                    path: 'video',
                    name: 'video',
                    component: () => import('@/views/video/video.vue'),
                },
                {
                    path: 'index',//首页
                    name: 'index',
                    component: () => import('@/views/index/index.vue'),
                },
                {
                    path: 'deviceList',//设备列表
                    name: 'deviceList',
                    component: () => import('@/views/deviceList/deviceList.vue'),
                },
                {
                    path: 'parameterSetting',//参数设置
                    name: 'parameterSetting',
                    component: () => import('@/views/parameterSetting/parameterSetting.vue'),
                },
            ]
        }

    ]
})

/*router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('ccb-token') || ''
    if (to.meta.skipAuth) {
        next()
    } else if (!to.meta.skipAuth && (!token)) {
        next({
            name: 'login',
            query: {
                name:'login'
            }
        })
    } else {
        next();
    }
})*/

export default router