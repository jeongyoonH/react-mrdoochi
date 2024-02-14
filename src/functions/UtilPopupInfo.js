import axios from 'axios';
import store from '../store/configure'
import * as config from "../store/config/config";
import * as TYPE from '../stringType'
export async function setPopupInfo () {
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
  await axios.post(config.vars.URL+'setPopupInfo/', {
        username: username,
        storeName: popupInfo.storeName,
        storeStatus: popupInfo.storeStatus,
        storeLocation: popupInfo.storeLocation,
        operatorInfo: popupInfo.operatorInfo,
        advertiserInfo: popupInfo.advertiserInfo,
        marketingDate: popupInfo.marketingDate,
        marketingType: popupInfo.marketingType,
        keywords: popupInfo.keywords,
        marketingInfoList: popupInfo.marketingInfoList
    })
  .then(res => {
    response = res.data;
  })
  .catch(error => {
      console.log(error);
  })
  return response;
}
export async function SMSPush(name='',rphone='',sphone1='',sphone2='',sphone3='') {
	const username = JSON.parse(sessionStorage.auth).user.username
	const popupInfo = store.getState().listInfoPopup
	console.log(popupInfo)
  // const url = 'http://203.245.41.78:3000/'
  const msg = '게시글 상황 대시보드 전송'
	if (popupInfo.storeStatus === TYPE.SALES) {

	} else {
		if (popupInfo.advertiserInfo.phoneNumber === '' ||popupInfo.operatorInfo.phoneNumber === '') {
			alert('전화번호 값은 필수 입니다.')
			return
		}
	}
	
	let response;
	await axios.post(config.vars.URL + 'sendSMS/', {
		username: username,
		storeName: popupInfo.storeName,
		storeStatus: popupInfo.storeStatus,
		storeLocation: popupInfo.storeLocation,
		operatorInfo: popupInfo.operatorInfo,
		advertiserInfo: popupInfo.advertiserInfo,
		link_id: encodeURIComponent(username + '_' +popupInfo.storeName),
		msg:msg,
		rphone:rphone,
		sphone1:sphone1,
		sphone2:sphone2,
		sphone3:sphone3
	})
	.then(res => {
		response = res.data;
	})
	.catch(error => {
		console.log(error);
	})
	return response;
}

export async function getPopupInfo (storeName) {
  // console.log(Name, OperatorInfo, AdvertiserInfo)
  const popupInfo = store.getState().listInfoPopup
  const username = JSON.parse(sessionStorage.auth).user.username
  let response;
  await axios.post(config.vars.URL+'getPopupInfo/', {
        username: username,
        storeName: storeName,
        storeLocation: popupInfo.storeLocation
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