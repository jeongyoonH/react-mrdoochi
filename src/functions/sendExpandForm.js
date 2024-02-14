import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";

export async function sendExpandForm(Name, OperatorInfo, AdvertiserInfo) {
    // console.log(Name, OperatorInfo, AdvertiserInfo)
    const username = JSON.parse(sessionStorage.auth).user.username
    let response;
    await axios.post(config.vars.URL+'expandInfo/', {
            username: username,
            name: Name,
            operatorInfo: OperatorInfo,
            advertiserInfo: AdvertiserInfo
      })
    .then(res => {
      response = res.data;
      console.log(response)
    })
    .catch(error => {
        console.log(error);
        Alert.error(`<h4>Info 저장 에러<h4> ${error}`, {
        position: 'top-right',
        effect: 'slide',
        html: true
        });
    })
    return response;
}
