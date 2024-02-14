import axios from 'axios';
import * as config from '../../../store/config/config'

export async function getMarketingDetail (advertiser = '', storename = '',storelocation='') {
	let response;
	await axios.get(config.vars.URL+'getMarketingDetail/',{
		params: {
			advertiser_name : advertiser,
			storename: storename,
			storelocation: storelocation,
			// advertiser_name : advertiser,
			// store_id : storename + "_" + storelocation
		}
	})
	.then(res => {
		response = res.data;
		// console.log(response)
	})
	.catch(error => {
		console.log(error);
		// Alert.error('<h4>Server Error!<h4>'+error, {
		// 	position: 'bottom-right',
		// 	effect: 'slide',
		// 	html: true
		// });
	})
	return response;
}
