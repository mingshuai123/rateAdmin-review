import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
// 注册
  {
    path: '/register',
    name:'register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
// 提交真实姓名
  {
    path: '/Myform',
    name:'Myform',
    component: () => import('@/views/form/index'),
    hidden: true,
  },
  {
    path: '/Myform2',
    name:'Myform2',
    component: () => import('@/views/form/index2'),
    hidden: true,
  },
// 个人首页
  {
    path: '/',
    component: Layout,
    redirect: '/console',
    name:'personal',
    meta: { title: '个人首页', icon: 'dashboard'},
    children: [
        {
        path: 'console',
        name: 'console',
        component: () => import('@/views/console/index'),
        meta: { title: '控制台', icon: 'dashboard'}
      },
      {
        path: 'myTask',
        name: 'myTask',
        component: () => import('@/views/myTask/layout'),
        redirect: '/myTask/Mytasklist',
        meta: { title: '任务列表', icon: 'dashboard'},
        children:[
          {
            path:'Mytasklist',
            name:'Mytasklist',
            component:() => import('@/views/myTask/index.vue'),
            meta:{title:'',icon:'dashboard',activeMenu:'/myTask'},
            hidden:true
          },
          {
            path:'taskDetail',
            name:'Detail',
            component:() => import('@/views/myTask/details.vue'),
            meta:{title:'任务详情',icon:'dashboard'},
            hidden:true
          },
          {
            path:'statDetail',
            name:'Stat',
            component:() => import('@/views/myTask/Stat.vue'),
            meta:{title:'检查项目',icon:'dashboard'},
            hidden:true
          }
        ]
      }
    ]
  },
// 星评委首页
  {
    path: '/judge',
    component: Layout,
    redirect: '/judge/judgeTask',
    name:'judge',
    meta: { title: '星评委首页', icon: 'dashboard'},
    children: [
        {
        path: 'judgeindex',
        name: 'judgeindex',
        component: () => import('@/views/judgeindex/index'),
        meta: { title: '星评员管理', icon: 'dashboard'}
      },
      {
        path: 'judgeTask',
        name: 'judgeTask',
        component: () => import('@/views/myTask/index'),
        meta: { title: '星评员任务', icon: 'dashboard'}
      },
    ]
  },

 
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export const dynamicRouter = [
  // 组织结构
  {
    path: '/Organization',
    component: Layout,
    redirect: '/Organization/city',
    name:'Organization',
    meta:{title: '组织结构管理',icon: 'star',roles:1},
    alwaysShow:true,
    children: [
        {
        path: 'province',
        name: 'province',
        component: () => import('@/views/organization/province'),
        meta: { title: '省星评委管理', icon: 'star',roles:2 }
      },
      {
        path: 'city',
        name: 'city',
        component: () => import('@/views/organization/city'),
        meta: { title: '市星评委管理', icon: 'star' ,roles:1 }
      },
    ]
  },
// 文档下载
  {
    path: '/download',
    name:'download',
    redirect: '/download/download1',
    component: Layout,
    meta: { title: '', icon: 'documentation',roles: 0},
    // alwaysShow:true,
    children:[
      {
        path: 'download1',
        name: 'download1',
        component: () => import('@/views/table'),
        meta: { title: '文档下载', icon: 'documentation',roles:0}
      },
    ]
  } ,

  { path: '*', redirect: '/404', hidden: true ,meta:{roles: 0}}
];

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
