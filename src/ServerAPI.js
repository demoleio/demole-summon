import Axios from "axios";
import { API_ENDPOINT } from './constants/index'

export const getState = (chain, address) => {
    return new Promise ( (resolve,reject) => {
        Axios.get(`${API_ENDPOINT}/getState/${chain}/${address}`)
        .then(res => (resolve(res.data)))
        .catch(error => (reject(error.response.data)))
    })
}

export const getHistories = (chain) => {
    return new Promise ( (resolve,reject) => {
        Axios.get(`${API_ENDPOINT}/getHistories/${chain}`)
        .then(res => (resolve(res.data)))
        .catch(error => (reject(error.response.data)))
    })
}