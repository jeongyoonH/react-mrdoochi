import axios from 'axios';
import * as config from '../../../store/config/config'

export async function getMarketingInfo (advertiser ='', storename ='', storelocation ='') {
	let response = '';
	await axios.get(config.vars.URL+'getMarketingInfo/',
		{
			params: {
				advertiser_name : advertiser,
				storename: storename,
				storelocation: storelocation,
				// store_id : storename + "_" + storelocation
			}
		}).then(
		res => {
			response = res.data
		}
	).catch(
		error => {
			console.log(error)
		}
	)
	return response;
}