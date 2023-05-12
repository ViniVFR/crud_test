import { useAuthStore } from 'stores/all'

export const addBeforeEach = (Router) => {
  const store = useAuthStore
  store.CHECK_TOKEN()

  Router.beforeEach((to, from, next) => {
    const destination = to.name
    const isAuthenticated = store.authenticated.value

    if (destination !== 'Login Page' && !isAuthenticated) {
      next({
        path: '/login',
        replace: true
      })
    }
    if (destination === 'Login Page' && isAuthenticated) {
      next('/houses')
    } else {
      next()
    }
  })
}
