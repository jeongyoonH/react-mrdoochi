import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";

export function DeleteBlogUrl(Name,Url) {
    // console.log(Name, OperatorInfo, AdvertiserInfo)
    const username = JSON.parse(sessionStorage.auth).user.username
    let response;
    axios.delete(config.vars.URL+'deleteBlogUrl/', {
            data: {
                username: username,
                name: Name,
                url: Url
            }
      })
    .then(res => {
      response = res.data;
    })
    .catch(error => {
        console.log(error);
        Alert.error(`<h4>블로그 URL 삭제 에러<h4> ${error}`, {
        position: 'top-right',
        effect: 'slide',
        html: true
        });
    })
    return response;
}

export function RegisteBlogUrl(Name,Url) {
  // console.log(Name, OperatorInfo, AdvertiserInfo)
  const username = JSON.parse(sessionStorage.auth).user.username
  let response;
  axios.post(config.vars.URL+'registBlogUrl/', {
        username: username,
        name: Name,
        url: Url
    })
  .then(res => {
    response = res.data;
  })
  .catch(error => {
      console.log(error);
      Alert.error(`<h4>블로그 URL 등록 에러<h4> ${error}`, {
      position: 'top-right',
      effect: 'slide',
      html: true
      });
  })
  return response;
}