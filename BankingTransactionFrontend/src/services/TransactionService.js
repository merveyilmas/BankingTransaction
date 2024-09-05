import axios from "axios"
import HostAndPortInfo from "../enums/HostAndPortInfo";

const ipAdress = HostAndPortInfo.HOSTNAME
const port = HostAndPortInfo.PORT

export default class TransactionService {


    transferMoney(transferDatas) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/api/transactions/transfer`,
            data: transferDatas,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    }

    getTransactionsByAccountId(accountId) {

        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/api/transactions/${accountId}`,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    }


}