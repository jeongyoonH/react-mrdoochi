import axios from 'axios';
import store from '../store/configure'
import * as config from "../store/config/config";
import * as TYPE from '../stringType'
export async function kakaoPush () {
	const username = JSON.parse(sessionStorage.auth).user.username
	const popupInfo = store.getState().listInfoPopup
	if(popupInfo.storeStatus === TYPE.SALES){
	
	}else{
		if (popupInfo.marketingDate.startDate === '' || popupInfo.marketingDate.endDate === '') {
			alert('날짜 값은 필수 입니다.')
			return
		}
	}
	
	let response;
	await axios.post('https://dapi.kakao.com/v2/local/search/address.json', {
		headers: { Authorization: 'KakaoAK e138dd583112fa6de45d660fa62be6c9' },
		params: { query: data.roadAddress}
	})
	.then(res => {
		console.log(res)
		this.getMemberInputForm.latitude = res.data.documents[0].x*1
		this.getMemberInputForm.hardness = res.data.documents[0].y*1
	})
	.catch(error => {
		console.log(error);
	})
	return response;
}