import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from '../store/config/config'

export async function ChangeStatus(Name, Status) {
    // console.log(Name, OperatorInfo, AdvertiserInfo)
    const username = JSON.parse(sessionStorage.auth).user.username
    let response;
    await axios.put(config.vars.URL+'changeStatus/', {
            username: username,
            name: Name,
            status: Status
      })
    .then(res => {
      response = res.data;
    })
    .catch(error => {
        console.log(error);
        Alert.error(`<h4>Change Status 에러<h4> ${error}`, {
        position: 'top-right',
        effect: 'slide',
        html: true
        });
    })
    return response;
}