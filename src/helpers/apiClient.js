import axios from 'axios'
import getCookie from '../utils/get_cookie'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/mahi_app/`,
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCookie('mahi_csrftoken'),
    'Content-Type': 'application/json'
  }
})

export const apiClientAuth = axios.create({
  baseURL: `http://127.0.0.1:8000/auth/`,
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCookie('mahi_csrftoken'),
    'Content-Type': 'application/json'
  }
})

export default apiClient
