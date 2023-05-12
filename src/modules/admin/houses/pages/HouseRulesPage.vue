<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      :loading="loading"
      :rows-per-page-options="[]"
      @request="handleRequest"
    >
      <template v-slot:top>
        Houses Rules
          <q-space />
          <q-btn
            color="primary"
            :disable="loading"
            label="Add New rule"
            @click="addNewRule"
          />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props" @click="onRowClick(props.row)">
              {{ props.row.name}}
          </q-td>
          <q-td key="active" :props="props" @click="onRowClick(props.row)">
              {{ props.row.active === 1 ? 'true' : 'false'}}
          </q-td>
          <q-td key="delete" :props="props" @click="deleteRule(props.row)">
              <q-btn
                size="sm"
                color="negative"
                icon="delete"
              />
          </q-td>
        </q-tr>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

    <q-dialog v-model="dialog">
      <q-card>
        <q-bar>
          <div>{{ data.name ? data.name : 'New Rule' }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form @submit.prevent="submit(data.id)">
            <div class="q-gutter-md row">
              <q-input
                dense
                filled
                v-model="name"
                label="Name *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Required field']"
              />
              <q-toggle
                :false-value="0"
                :true-value="1"
                v-model="active"
                color="green"
              />
            </div>
            <div class="row justify-end">
              <q-btn
                type="submit"
                :loading="loadingSubmit"
                label="Save"
                class="q-mt-md"
                color="positive"
              />
            </div>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'

const $q = useQuasar()

const dialog = ref(false)
const data = ref({})
const name = ref('')
const active = ref(0)

const rows = ref([])
const loading = ref(true)
const loadingSubmit = ref(false)

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    field: 'name',
    align: 'left'
  },
  {
    name: 'active',
    disable: true,
    required: true,
    label: 'Active',
    field: 'active',
    align: 'left'
  },
  {
    name: 'delete'
  }
]

const pagination = ref({
  page: 0,
  rowsPerPage: 10,
  rowsNumber: 0
})

const getHouseRules = (page = 0) => {
  api.get('api/admin/house_rules', {
    params: { page }
  }).then(res => {
    loading.value = false

    rows.value = res.data.data.entities
    pagination.value.page = res.data.data.pagination.current_page
    pagination.value.rowsPerPage = res.data.data.pagination.per_page
    pagination.value.rowsNumber = res.data.data.pagination.total
  })
}

const handleRequest = (props) => {
  getHouseRules(props.pagination.page)
}

const onRowClick = (row) => {
  dialog.value = true

  api.get(`api/admin/house_rules/${row.id}`).then(res => {
    data.value = res.data.data
    name.value = res.data.data.name
    active.value = res.data.data.active
  })
}

const addNewRule = () => {
  dialog.value = true

  data.value = {}
  name.value = ''
  active.value = 0
}

const deleteRule = (row) => {
  api.delete(`api/admin/house_rules/${row.id}`).then(res => {
    const newRows = rows.value.filter(item => item.id !== row.id)
    rows.value = newRows
    $q.notify({
      message: res.data.message,
      position: 'top',
      color: 'positive',
      icon: 'done'
    })
  }).catch(error => {
    $q.notify({
      message: error.response.data.message,
      position: 'top',
      color: 'negative',
      icon: 'error'
    })
  })
}

const submit = (id) => {
  loadingSubmit.value = true

  const body = {
    house_rules: {
      name: name.value,
      active: active.value
    }
  }
  const save = id ? api.put(`api/admin/house_rules/${id}`, body) : api.post('api/admin/house_rules/', body)

  save.then(res => {
    const index = rows.value.findIndex(item => item.id === res.data.data.id)
    index === -1 ? rows.value.push(res.data.data) : rows.value[index] = res.data.data

    $q.notify({
      message: res.data.message,
      position: 'top',
      color: 'positive',
      icon: 'done'
    })
  }).catch(error => {
    $q.notify({
      message: error.response.data.message,
      position: 'top',
      color: 'negative',
      icon: 'error'
    })
  }).finally(() => {
    dialog.value = false
    loadingSubmit.value = false
  })
}

getHouseRules()

</script>
