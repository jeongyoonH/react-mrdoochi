import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from '../store/config/config'

export async function getAPOD(data = '') {

  const options = {
    method: 'GET',
    headers: {
    },
    params: {
      'query': data
    },
    url: config.vars.URL+'api/local'
    // url: 'http://localhost:8000/api/local'
  }

  let response ;
  await axios(options)
  .then(res => {
    response = res.data;
  })
  .catch(error => {
    console.log(error);
    //alert("서버와 연결이 되지 않습니다.");
    Alert.error('<h4>Server Error!<h4> api를 가지고 오는 과정에서 에러가 생겼습니다.', {
      position: 'bottom-right',
      effect: 'slide',
      html: true
    });
  })
  return response;
}