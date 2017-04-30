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
import Login from '@/components/User/Login.vue'

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
    component: AllBookItems
  }, {
    path: '/editbookitem',
    name: 'editbookitem',
    component: EditBookItem
  }, {
    path: '/publicedbookdetails',
    name: 'publicedbookdetails',
    component: PublicedDetail
  }]
})

export default router
