import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'http://localhost:3333'
})

export default httpClient
