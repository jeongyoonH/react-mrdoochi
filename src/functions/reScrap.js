import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";
export async function rescrap(name,location) {
    const username = JSON.parse(sessionStorage.auth).user.username;
    const options = {
        method: 'POST',
        headers: {
        },
        data: {
        'username': username,
        'name': name,
          'location':location
          
        },
        url: config.vars.URL+'rescrap/'
    }

    let response ;
    await axios(options)
    .then(res => {
        response = res.data;
    })
    .catch(error => {
        console.log(error);
        Alert.error(`<h4>Server Error!<h4> '${name}'의 데이터 수집 재요청 과정에서 에러가 생겼습니다.`, {
        position: 'bottom-right',
        effect: 'slide',
        html: true
        });
    })

    return response;
}