import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store/index";
import PokemonStatsView from '../views/PokemonStatsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pokemonStats',
    component: PokemonStatsView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  
  store.dispatch("authentication/confirmUser")
    .then(result=>{
      if (authRequired && !result) {
        next('/login');
      } else {
        next();
      }
    })
  

});
