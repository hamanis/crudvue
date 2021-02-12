import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'posts/',
        component: () => import('pages/Posts.vue'),
        children: [
          { path: 'create', component: () => import('components/EditComponent.vue')},
          { name: 'editpost', path: ':id/edit', component: () => import('components/EditComponent.vue')}
        ]
      },
      {
        path: 'users',
        component: () => import('pages/Users.vue'),
        children: [
          { path: 'create', component: () => import('components/EditComponent.vue')},
          { name: 'edituser', path: ':id/edit', component: () => import('components/EditComponent.vue')}
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
