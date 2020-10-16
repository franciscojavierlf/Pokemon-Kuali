import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Pokemon from '../views/PokemonView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authorized: true },
  },
  {
    path: '/pokemon/:id',
    name: 'Pokemon',
    component: Pokemon,
    meta: { authorized: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * Funcionalidad para permitir solo ciertos urls.
 */
router.beforeEach((to, from, next) => {
  if (!to.matched.some((x) => x.meta.authorized)) {
    next('/');
  } else {
    next();
  }
});

export default router;
