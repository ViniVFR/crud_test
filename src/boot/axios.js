import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://sys-dev.searchandstay.com/' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token
}
const deleteToken = () => delete api.defaults.headers.common.Authorization

export { api, setToken, deleteToken }
