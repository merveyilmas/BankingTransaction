import axios from "axios"
import HostAndPortInfo from "../enums/HostAndPortInfo";

const ipAdress = HostAndPortInfo.HOSTNAME
const port = HostAndPortInfo.PORT

export default class UserService {
   

     login(datas) {

      return axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${ipAdress}:${port}/api/users/login`,
        data: datas
      })
    }

    registerNewUser(datas) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/api/users/register`,
            data: datas            
        })
    }  
  

}