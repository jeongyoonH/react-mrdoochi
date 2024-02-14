import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";
export function sendMyRival(username,rivalList,name, keywords, location) {
  console.log(rivalList);
  const options = {
    method: 'POST',
    headers: {
    },
    data: {
      'username': username,
      'name': name,
      'location': location,
      'keywords': JSON.stringify(keywords),
      'rivalList': JSON.stringify(rivalList) 
    },
    url: config.vars.URL+'myRival/'
  }

  let response ;
  axios(options)
  .then(res => {
    response = res.data;
  })
  .catch(error => {
    console.log(error);
    Alert.error(`<h4>Server Error!<h4> '${name}'의 데이터 수집 과정에서 에러가 생겼습니다.`, {
      position: 'bottom-right',
      effect: 'slide',
      html: true
    });
  })
  
  return response;
}