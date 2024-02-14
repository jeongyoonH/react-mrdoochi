import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from '../store/config/config'
import * as console from '../functions/functions'

export async function login(username, password) {
  let response;
  await axios.post(config.vars.URL+'account/auth/login/', {
        username: username,
        password: password,
    })
  .then(res => {
    response = res.data;
	  console.consolelog(res.data);
  })
  .catch(error => {
    // console.log(error);
    //alert("서버와 연결이 되지 않습니다.");
    Alert.error('<h4>Server Error!<h4> 로그인 과정에서 에러가 생겼습니다.', {
      position: 'bottom-right',
      effect: 'slide',
      html: true
    });
  })
  return response;
}