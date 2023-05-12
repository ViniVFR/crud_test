export default [
  {
    path: '/login',
    component: () => import('./layouts/MainLayout.vue'),
    children: [
      {
        name: 'Login Page',
        path: '',
        component: () => import('./pages/LoginPage.vue')
      }
    ]
  }
]
