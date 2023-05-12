export default [
  {
    path: '/houses/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        name: 'Houses',
        path: '',
        component: () => import('./pages/HouseRulesPage.vue')
      }
    ]
  }
]
