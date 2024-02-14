import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";
export async function getCompanys(page) {
  const username = JSON.parse(sessionStorage.auth).user.username;
  const options = {
    method: 'GET',
    headers: {
    },
    params: {
      'username': username,
      'page': page,
    },
    url: config.vars.URL+'myCompanys/'
  }

  let response ;
  await axios(options)
  .then(res => {
    response = res.data;
    // console.log(response)
  })
  .catch(error => {
    console.log(error);
    Alert.error(`<h4>Server Error!<h4> ${error}`, {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
  })
  return response;
}