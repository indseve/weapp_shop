import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'complex-table',
        component: () => import('@/views/table/complexTable'),
        name: '管理商品',
        meta: {
          title: '管理商品',
          icon: 'table'
        }
      },
      {
        path: 'addProduct',
        component: () => import('@/views/addProduct/addProduct'),
        name: '添加商品',
        meta: {
          title: '添加商品',
          icon: 'form'
        }
      }

    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '订单管理',
        component: () => import('@/views/table/order'),
        meta: { title: '订单管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '活动管理',
    meta: { title: '活动管理', icon: 'example' },
    children: [
      {
        path: 'complex-table',
        component: () => import('@/views/table/complexTable'),
        name: '活动列表',
        meta: {
          title: '活动列表',
          icon: 'table'
        }
      },
      {
        path: 'addProduct',
        component: () => import('@/views/addProduct/addProduct'),
        name: '发布活动',
        meta: {
          title: '发布活动',
          icon: 'form'
        }
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

