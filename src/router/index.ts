import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store/index";
import PokedexStats from '../views/PokedexStats.vue'
import PokemonGenerator from '../views/PokemonGenerator.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pokedex',
    component: PokedexStats
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  },
  {
    path: '/PokemonGenerator',
    name: 'pokeGen',
    component: () => import(/* webpackChunkName: "Style" */ '../views/PokemonGenerator.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/style'];
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
