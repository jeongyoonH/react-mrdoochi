import axios from 'axios';
// import Alert from 'react-s-alert';
import * as config from "../../store/config/config";

export async function getMemberInfo (username='',store='',location='') {
	let response = '';
	await axios.get(config.vars.URL+'getMemberInfo/',{
		params: {
			username : username,
			store:store,
			location:location
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
