import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from '../store/config/config'

export async function employed(username) {
  let response;
  await axios.post(config.vars.URL+'employed_status/', {
        username: username,
    })
  .then(res => {
    response = res.data;
    console.log(res.data)
    console.log(response)
  })
  .catch(error => {
    console.log(error);
    //alert("서버와 연결이 되지 않습니다.");
    Alert.error('<h4>Server Error!<h4> employ 과정에서 에러가 생겼습니다.', {
      position: 'bottom-right',
      effect: 'slide',
      html: true
    });
  })
  return response;
}