import axios from 'axios';
import store from '../store/configure'
import * as config from "../store/config/config";
import * as TYPE from '../stringType'

export async function SMSPush(name='',rphone='',sphone1='',sphone2='',sphone3='',msg='') {
	// console.log(Name, OperatorInfo, AdvertiserInfo)
	const popupInfo = store.getState().listInfoPopup
	const username = JSON.parse(sessionStorage.auth).user.username
	let response;
	await axios.post(config.vars.URL+'sendSMS/', {
		user_id: 'innonext',
		secure:'f36808b4d38970dd87c064622b892d29',
		msg:msg,
		rphone:rphone,
		sphone1:sphone1,
		sphone2:sphone2,
		sphone3:sphone3
	})
	.then(res => {
		response = res.data;
		console.log(response)
	})
	.catch(error => {
		console.log(error);
	})
	return response;
	}