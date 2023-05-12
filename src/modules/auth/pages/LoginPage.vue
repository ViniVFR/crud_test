<template>
  <q-card class="q-ma-xl">
    <div class="row my_card">
      <div class="col-12">
        <div class="row q-pa-sm q-pa-xl">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary montserrat">Login</div>
                </div>
              </div>
              <div class="q-my-lg">
                { Usuário: root Senha: root }
              </div>
              <q-form class="q-gutter-md" @submit="submitForm">
                <q-input v-model="user.username" label="Nome de usuário" name="username" v-bind="$input" />
                <q-input v-model="user.password" label="Senha" name="password" type="password" v-bind="$input" />
                <div>
                  <q-btn class="full-width montserrat" color="primary" label="Entrar" rounded type="submit"></q-btn>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'stores/all'

const $q = useQuasar()
const $authStore = useAuthStore
const $router = useRouter()
const $route = useRoute()

const user = reactive({})

const submitForm = async () => {
  if ($authStore.DO_LOGIN(user)) {
    const to = $route.query.to?.toString()
    $router.push(to || '/houses')
  } else {
    $q.notify({
      message: 'Usuário e senha inválidos!',
      position: 'top',
      color: 'negative',
      icon: 'error'
    })
  }
}
</script>

<style>
.my_card {
  width: 100%;
  max-width: 300px;
}
</style>
