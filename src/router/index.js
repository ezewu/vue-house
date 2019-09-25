import Vue from 'vue'
import Router from 'vue-router'

import login from '@/login/login'
import index from '@/index/index'
import vselect from '@/vselect/vselect'
import listing from '@/listing/listing'
import collect from '@/collect/collect'
import mesource from '@/mesource/mesource'
import protocol from '@/protocol/protocol'
import me from '@/me/me'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        navShow: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/vselect',
      name: 'vselect',
      component: vselect,
      children: [{
          path: '/vselect/listing',
          name: 'listing',
          component: listing
        },
        {
          path: '/vselect/collect',
          name: 'collect',
          component: collect
        }
      ]
    },
    {
      path: '/mesource',
      name: 'mesource',
      component: mesource
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: protocol
    },
    {
      path: '/me',
      name: 'me',
      component: me
    }
  ]
})


router.beforeEach((to, from, next) => {
  let getToken = window.localStorage.getItem('token')
  if (getToken) {
    next()
  } else {
    if (to.name === 'login') {
      next()
      return
    }
    next({
      path: '/login',
    })
  }
})

export default router
