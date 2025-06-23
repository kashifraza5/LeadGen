import axios from 'axios'
const TOKEN_TYPE = 'Bearer ';
const REQUEST_HEADER_AUTH_KEY = 'Authorization';
const PERSIST_STORE_NAME = 'persist:root';
import store from '../store'
import { onSignOutSuccess } from '../store/auth/sessionSlice'
// import appConfig from 'configs/app.config'
import { useSelector } from 'react-redux'


const unauthorizedCode = [401, 403]

const isNumString = (str) => !isNaN(Number(str))

function deepParseJson(jsonString) {
  if (typeof jsonString === 'string') {
      if (isNumString(jsonString)) {
          return jsonString
      }
      try {
          return deepParseJson(JSON.parse(jsonString))
      } catch (err) {
          return jsonString
      }
  } else if (Array.isArray(jsonString)) {
      return jsonString.map((val) => deepParseJson(val))
  } else if (typeof jsonString === 'object' && jsonString !== null) {
      return Object.keys(jsonString).reduce((obj, key) => {
          const val = jsonString[key]
          obj[key] = isNumString(val) ? val : deepParseJson(val)
          return obj
      }, {})
  } else {
      return jsonString
  }
}

console.log("🚀 ~ import.meta.env.VITE_API_URL:", import.meta.env.VITE_API_URL)

const api = axios.create({
  // baseURL: "https://b4a2-103-184-0-162.ngrok-free.app/api/v1/", 
  baseURL: "https://demo.iclosefaster.com/api/v1/", 
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 10000000000),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    let accessToken = persistData?.auth?.session?.token
    console.log("🚀 ~ api.interceptors.request.use ~ accessToken:", accessToken)

    if (!accessToken) {
      const { auth } = store.getState()
      accessToken = auth?.session?.token
    }

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
    }

    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(onSignOutSuccess())
    }

    return Promise.reject(error)
  }
)

export default api
