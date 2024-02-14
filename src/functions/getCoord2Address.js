import axios from 'axios';
import store from '../store/configure'
import * as config from "../store/config/config";
import * as TYPE from '../stringType'
import Alert from "react-s-alert";
export function getCoord2Address (x='',y='',input_coord='') {
	let response ;
	console.log(x)
	axios.get('https://dapi.kakao.com/v2/local/geo/coord2address.json',
		{
			headers: { Authorization: 'KakaoAK 2b61c3eb1c004ba56a26586ad5082627' },
			params: {'x': x,
				'y': y}
		})
	.then(res => {
		const result_arr = {
			data : res.data,
			status : 'succese'
		}
		console.log(result_arr)
		// this.getMemberInputForm.latitude = res.data.documents[0].x*1
		// this.getMemberInputForm.hardness = res.data.documents[0].y*1
	})
	
	return response;
}
// export async function getCoord2Address (x='',y='',input_coord='') {
// // const popupInfo = store.getState().listInfoPopup
// // const username = JSON.parse(sessionStorage.auth).user.username
// 	let response;
// 	await axios.post('https://dapi.kakao.com/v2/local/geo/coord2address.json',
//
//
// 		{
// 			headers: { Authorization: 'KakaoAK e138dd583112fa6de45d660fa62be6c9' },
// 			x: x,
// 			y:y
// 		})
// 	.then(res => {
// 		response = res.data;
// 		console.log(response)
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	})
// 	return response;
// }
// // export async function getCoord2Address () {
// // 	const username = JSON.parse(sessionStorage.auth).user.username
// // 	const popupInfo = store.getState().listInfoPopup
// // 	if(popupInfo.storeStatus === TYPE.SALES){
// //
// // 	}else{
// // 		if (popupInfo.marketingDate.startDate === '' || popupInfo.marketingDate.endDate === '') {
// // 			alert('날짜 값은 필수 입니다.')
// // 			return
// // 		}
// // 	}
// //
// // 	let response;
// //
// // 	await axios.post('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
// // 		headers: { Authorization: 'KakaoAK c5037c8f143171a4297061c77d067df9' },
// // 		params: { query: data.roadAddress}
// // 	})
// // 	.then(res => {
// // 		console.log(res)
// // 		this.getMemberInputForm.latitude = res.data.documents[0].x*1
// // 		this.getMemberInputForm.hardness = res.data.documents[0].y*1
// // 	})
// // 	.catch(error => {
// // 		console.log(error);
// // 	})
// // 	return response;
// // }