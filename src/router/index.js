import Vue from 'vue'
import Router from 'vue-router'
import BooksHolder from '@/components/BooksCard/BooksHolder'
import PendingBook from '@/components/BooksCard/PendingBook'
import PublicedBooks from '@/components/BooksCard/PublicedBooks'
import UnsureBooks from '@/components/BooksCard/UnsureBooks'
import NoneUser from '@/components/BooksCard/NoneUser'
import AllBookItems from '@/components/BookItems/AllBookItems'
import EditBookItem from '@/components/BookItems/EditBookItem'
import PublicedDetail from '@/components/BooksCard/PublicedDetail'
import EditBook from '@/components/BooksCard/EditBook'
import Login from '@/components/User/Login.vue'

import { index_book } from '../state'
Vue.use(Router)

var router = new Router({
  routes: [{
    path: '/',
    name: 'BooksHolder',
    redirect: { path: 'pending' },
    component: BooksHolder,
    beforeEnter: ((to, from, next) => {
      if ( to.name === "none" ) {
        next();
      }
      if (localStorage.token) {
        next();
      } else {
        console.log("没有token, 调到none")
        next({
          path: '/none'
        })
      }
    }),
    children: [{
      path: 'none',
      name: 'none',
      component: NoneUser
    }, {
      path: 'pending',
      name: 'pending',
      component: PendingBook
    }, {
      path: 'publiced',
      name: 'publiced',
      component: PublicedBooks
    }, {
      path: 'unsure',
      name: 'unsure',
      component: UnsureBooks
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/allbookitems',
    name: 'allbookitems',
    component: AllBookItems,
    meta: { requireBook: true }
  }, {
    path: '/editbookitem',
    name: 'editbookitem',
    component: EditBookItem,
    meta: { requireBook: true }
  }, {
    path: '/publicedbookdetails',
    name: 'publicedbookdetails',
    component: PublicedDetail
  }, {
    path: '/editbook',
    name: 'editbook',
    component: EditBook,
    meta: { requireBook: true }
  }]
})

router.beforeEach( (to, from, next) => {
  if(to.matched.some( record => record.meta.requireBook)) {
    //去的那个路由确实需要验证该值
    if(!index_book.id) {
      next({
        path: '/pending',
      })
    } else {
      next()  //有值，可以跳
    }
  } else {
    next()   //不需要验证，可以跳
  }
})
export default router
