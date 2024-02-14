import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from "../store/config/config";

export async function getAnalysis(advertiser, storename) {
	let response;
	await axios.get(config.vars.URL+'analysis/',{
      params: {
	      advertiser_name : advertiser,
	      storename: storename,
	      // storelocation: storelocation
      }
  })
  .then(res => {
	  const result_arr = {
		  data : res.data,
		  status : 'succese'
	  }
      response = result_arr;
  })
  .catch(error => {
    // console.log(error);
    Alert.error('<h4>Server Error!<h4>'+error, {
	    position: 'bottom-right',
	    effect: 'slide',
	    html: true
    });
  })
  return response;
}