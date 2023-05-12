<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Manage Rules
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/all'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const $router = useRouter()
    const $store = useAuthStore
    const logout = () => {
      $store.SIGN_OUT()
      $router.push('/login')
    }
    return {
      logout,
      $store
    }
  }
})

</script>
