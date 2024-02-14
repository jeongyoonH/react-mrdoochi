import axios from 'axios';
import * as config from '../../../store/config/config'

export async function getCompleteInfo (advertiser, storename, storelocation) {
  let response = '';
  await axios.get(config.vars.URL+'getCompleteInfo/',{
    params: {
      advertiser_name : advertiser,
	    storename: storename,
	    storelocation: storelocation
     
    }
  }).then(
    res => {
      response = res.data
      console.log(response)
    }
  ).catch(
    error => {
      console.log("에러")
      console.log(error)
    }
  )
  return response;
}
