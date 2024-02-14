import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";

export async function deleteCompany(userid ='' , storeid = '') {
  const username = JSON.parse(sessionStorage.auth).user.username;
  const options = {
    method: 'GET',
    headers: {
    },
    params: {
      'userID': username,
      'storeID': storeid,
    },
    url: config.vars.URL+'deleteItem'
  }

  let response ;
  await axios(options)
  .then(res => {
	  response = res.data;
	  window.location.reload();
	  Alert.info(`'${storeid}'제거 완료`, {
      position: 'top-right',
      effect: 'slide'
    });
  })
  .catch(error => {
    console.log(error);
    //alert("서버와 연결이 되지 않습니다.");
    Alert.error('<h4>Server Error!<h4> company를 삭제하는 과정에서 에러가 발생했습니다.', {
      position: 'bottom-right',
      effect: 'slide',
      html: true
    });
  })
  return response;
}