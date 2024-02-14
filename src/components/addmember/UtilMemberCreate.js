import axios from 'axios';
// import Alert from 'react-s-alert';
import * as config from "../../store/config/config";

export async function insertMemberCreate (id='',pw='',email='',phoneNumber='',username='') {
	let response = '';
	await axios.get(config.vars.URL+'insertMember/',{
		params: {
			id : id,
			pw:pw,
			email:email,
			phoneNumber:phoneNumber,
			username:username
			
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
