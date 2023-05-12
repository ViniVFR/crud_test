import * as storage from 'src/modules/auth/storage'
import { ref } from 'vue'

const authenticated = ref(false)
const token = ref('')

export const authStore = (token, authenticated, {
  authenticated,
  token,
  isAuthenticated: state => state.authenticated,
  SET_TOKEN (payload) {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    token.value = payload
    authenticated.value = true
  },
  DO_LOGIN (payload) {
    if (payload.username === 'root' && payload.password === 'root') {
      this.SET_TOKEN('Bearer 40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8')
      return true
    }

    return false
  },
  SIGN_OUT () {
    storage.deleteLocalToken()
    storage.deleteHeaderToken()
    storage.deleteUser()
    this.user = {}
    this.token = ''
    authenticated.value = false
    this.blocked = false
  },
  CHECK_TOKEN () {
    const token = storage.getLocalToken()
    if (!token) return false
    this.SET_TOKEN(token)
    return true
  }
})
