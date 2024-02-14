import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";

export async function GetExpandForm(Name) {
    // console.log(Name, OperatorInfo, AdvertiserInfo)
    const username = JSON.parse(sessionStorage.auth).user.username
    let response;
    await axios.get(config.vars.URL+'getExpandInfo/', {
            params: {
                username: username,
                name: Name
            }
      })
    .then(res => {
      response = res.data;
      console.log(response)
    })
    .catch(error => {
        console.log(error);
        Alert.error(`<h4>GET Info 에러<h4> ${error}`, {
        position: 'top-right',
        effect: 'slide',
        html: true
        });
    })
    return response;
}
