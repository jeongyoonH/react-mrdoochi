import axios from 'axios';
import * as config from "../store/config/config";
export async function taskList() {
  
  const options = {
    method: 'GET',
    url: config.vars.URL+'taskListInfo/'
  }

  let response ;
  await axios(options)
  .then(res => {
    response = res.data;
	  console.log(response)
  })
  .catch(error => {
    console.log(error);
    // Alert.error(`<h4>Server Error!<h4> ${error}`, {
    //   position: 'top-right',
    //   effect: 'slide',
    //   html: true
    // });
  })
  return response;
}