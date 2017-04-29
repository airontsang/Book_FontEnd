import Vue from 'vue'
import Router from 'vue-router'
import BooksHolder from '@/components/BooksCard/BooksHolder'
import PendingBook from '@/components/BooksCard/PendingBook'
import PublicedBooks from '@/components/BooksCard/PublicedBooks'
import AllBooks from '@/components/BooksCard/AllBooks'
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
      console.log(localStorage.token);
      if (localStorage.token) {
        next();
      } else {
        next({
          path: '/login'
        })
      }
    }),
    children: [{
      path: 'none',
      component: NoneUser
    }, {
      path: 'pending',
      component: PendingBook
    }, {
      path: 'publiced',
      component: PublicedBooks
    }, {
      path: 'all',
      component: AllBooks
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/allbookitems',
    component: AllBookItems
  }, {
    path: '/editbookitem',
    component: EditBookItem
  }, {
    path: '/publicedbookdetails',
    component: PublicedDetail
  }]
})

export default router
