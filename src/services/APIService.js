import axios from 'axios'

const url = 'http://localhost:5000';

const client_id = '264b5c9d91034f98859966116bc673ad'
const client_secret = 'f37ea2e9662744a0aad6b767f9667093'
const redirect_uri = 'http://localhost:1212/callback'

export const apiService = {

    refreshAccessToken(data) {
        return axios
            .post(`${url}/api/auth/token`, data)
    },
    login(logs) {
        return axios
            .post(`${url}/api/auth/login`, logs)
    },
    get(ressource) {
        return axios.get(`${url}/api/${ressource}`)
    },
    post(ressource, data, param = {}) {
        return axios
            .post(`${url}/api/${ressource}`, data, param)
    },
    put(ressource, data) {
        return axios
            .put(`${url}/api/${ressource}`, data)
    },
    delete(ressource, data) {
        return axios
            .delete(`${url}/api/${ressource}`, data)
    },
}
  
