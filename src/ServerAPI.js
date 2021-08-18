import Axios from "axios";
import { API_ENDPOINT } from './constants/index'

const ServerAPI = {
    getProof(chain, address) {
        return new Promise ( (resolve,reject) => {
            Axios.get(`${API_ENDPOINT}/getProof/${chain}/${address}`)
            .then(res => (resolve(res.data)))
            .catch(error => (reject(error.response.data)))
        })
    }
}

export default ServerAPI;