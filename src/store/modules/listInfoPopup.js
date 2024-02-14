/*eslint-disable no-unused-vars*/
import { createAction, handleActions } from 'redux-actions'
import * as TYPE from '../../stringType'

// 액션 타입을 정의해줍니다.
const TOGGLESTATE = 'listInfoForm/TOGGLESTATE'
const OPENPOPUP = 'listInfoForm/OPENPOPUP'
const CLOSEPOPUP = 'listInfoForm/CLOSEPOPUP'
const NEXTSTATUS = 'listInfoForm/NEXTSTATUS'
const PREVSTATUS = 'listInfoForm/PREVSTATUS'
const HANDLEINPUT = 'listInfoForm/HANDLEINPUT'
const HANDLEMARKETINGTYPE = 'listInfoForm/HANDLEMARKETINGTYPE'
const HANDLEKEYWORD = 'listInfoForm/HANDLEKEYWORD'
const HANDELDELETEKEYWORD = 'listInfoForm/HANDELDELETEKEYWORD'
const HANDLEMARKETINGDATE = 'listInfoForm/HANDLEMARKETINGDATE'
const ADDINFO = 'listInfoForm/ADDINFO'
const DELINFO = 'listInfoForm/DELINFO'
const HANDLEINFOLISTINPUT = 'listInfoForm/HANDLEINFOLISTINPUT'
const UPDATESTATUS = 'listInfoForm/UPDATESTATUS'
const UPDATEDATESTATE = 'listInfoForm/UPDATEDATESTATE'
const SETSTATE = 'listInfoForm/SETSTATE'
const INITMARKETINGINFOLIST = 'listInfoForm/INITMARKETINGINFOLIST'

//액션을 생성해 줍니다
export const toggleState = createAction(TOGGLESTATE)
export const openPopup = createAction(OPENPOPUP)
export const closePopup = createAction(CLOSEPOPUP)
export const nextStatus = createAction(NEXTSTATUS)
export const prevStatus = createAction(PREVSTATUS)
export const handleInput = createAction(HANDLEINPUT)
export const handleMarketingType = createAction(HANDLEMARKETINGTYPE)
export const handleKeyword = createAction(HANDLEKEYWORD)
export const handleDeleteKeyword = createAction(HANDELDELETEKEYWORD)
export const handleMarketingDate = createAction(HANDLEMARKETINGDATE)
export const addInfo = createAction(ADDINFO)
export const delInfo = createAction(DELINFO)
export const handleInfoListInput = createAction(HANDLEINFOLISTINPUT)
export const updateStatus = createAction(UPDATESTATUS)
export const updateDateState = createAction(UPDATEDATESTATE)
export const setState = createAction(SETSTATE)
export const initMarketingInfoList = createAction(INITMARKETINGINFOLIST)


//초기 state를 정해줍니다
const initialState = {
  storeID: '',
  storeName: '',
  storeStatus: '',
  popupState: false,
	isDisabled: 'disabled',
	keyword: '',
  popupStatus: TYPE.STEP1,
	storeLocation: '',
  operatorInfo: {
    name: '',
    phoneNumber: ''
  },
  advertiserInfo: {
    name: '',
    phoneNumber: ''
  },
  marketingDate: {
    startDate: '',
    endDate: ''
  },
  marketingType: {
    블로그체험단: false,
    블로그운영대행: false,
    카페운영대행: false,
    카페체험단: false,
    페이스북체험단: false,
    페이스북운영대행: false,
    인스타그램체험단: false,
    인스타그램운영대행: false,
	  페이스북인스타그램광고대행:false
  },
  keywords: [],
  marketingInfoList: {
    blog_experience: [],
    blog_manage: [],
    cafe_experience: [],
    cafe_manage: [],
    facebook_experience : [],
    facebook_manage : [],
    insta_experience : [],
    insta_manage : [] ,
	  facebook_insta_ads : [] ,
  },
	marketingInfoListIndex: {
		blog_experience: 0,
		blog_manage: 0,
		cafe_experience: 0,
		cafe_manage: 0,
		facebook_experience : 0,
		facebook_manage : 0,
		insta_experience : 0,
		insta_manage : 0,
		facebook_insta_ads : 0,
	},
  blog_experience: {
    naver_id: ''
  }
}

//액션함수들을 정의해 줍니다
export default handleActions({
  [TOGGLESTATE]: (state, action) => {
    return {
      ...state,
      popupState: !state.popupState,
    }
  },
  [CLOSEPOPUP]: (state) => {
    const bodyTag = document.getElementsByTagName('body')[0]
    bodyTag.style.overflow = 'auto'
    state.marketingInfoListIndex.blog_experience = 0
	  state.marketingInfoListIndex.blog_manage= 0
	  state.marketingInfoListIndex.cafe_experience= 0
	  state.marketingInfoListIndex.cafe_manage= 0
	  state.marketingInfoListIndex.facebook_experience = 0
	  state.marketingInfoListIndex.facebook_manage = 0
	  state.marketingInfoListIndex.insta_experience = 0
	  state.marketingInfoListIndex.insta_manage = 0
	  state.marketingInfoListIndex.facebook_insta_ads = 0
	  window.location.reload();
  },
  [OPENPOPUP]: (state, action) => {
    const bodyTag = document.getElementsByTagName('body')[0]
    bodyTag.style.overflow = 'hidden'
    const { id, name, status, location, popupStatus} = action.payload
	  console.log(status)

    return {
      ...state,
      popupState: true,
      storeID: id,
      storeName: name,
	    popupStatus : popupStatus === '' ?  TYPE.STEP1 : popupStatus,
      storeStatus: status,
      storeLocation: location,
	    isDisabled : initialState.isDisabled,
	    operatorInfo:{
      	name:'',
		    phoneNumber:''
	    }
    }
  },
  [NEXTSTATUS]: (state) => {
    let nextStatus
    switch (state.popupStatus) {
      case TYPE.STEP1:
        nextStatus = TYPE.STEP2
        break;
      case TYPE.STEP2:
        nextStatus = TYPE.STEP3
        break;
      case TYPE.STEP3:
        nextStatus = TYPE.STEP4
        break;
      default:
          nextStatus = TYPE.STEP1
        break;
    }
    return {
      ...state,
      popupStatus: nextStatus
    }
  },
  [PREVSTATUS]: (state) => {
    let nextStatus
    switch (state.popupStatus) {
      case TYPE.STEP3:
        nextStatus = TYPE.STEP2
        break;
      case TYPE.STEP2:
        nextStatus = TYPE.STEP1
        break;
      default:
        nextStatus = TYPE.STEP1
        break;
    }
    return {
      ...state,
      popupStatus: nextStatus
    }
  },
  [HANDLEINPUT]: (state, action) => {    
    const target = action.payload.target
    const targetName = target.name.split('/')
    const targetValue = target.value
	  console.log(target);
	  console.log(targetName);
	  console.log(targetName.length);
	  // p = p.split('-').join('');
	
	  // var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
	
	  // return regPhone.test(p);
	
	
	
	  // const newValue = targetValue.replace(/^((01[1|6|7|8|9])-[1-9]+[0-9]{6,7})|-(010[1-9][0-9]{7})$/g, '')
	  let number = targetValue.replace(/[^0-9]/g, "");
	  let phone = "";
	  // const newValue = curValue.replace(/[^0-9]/g, '')
		if (targetName.length >= 2 && targetName[1] === 'phoneNumber'){
			
			
			
			
			if(number.length < 4) {
				phone = number
			} else if(number.length < 7) {
				phone += number.substr(0, 3);
				phone += "-";
				phone += number.substr(3);
			} else if(number.length < 11) {
				phone += number.substr(0, 3);
				phone += "-";
				phone += number.substr(3, 3);
				phone += "-";
				phone += number.substr(6);
			} else {
				phone += number.substr(0, 3);
				phone += "-";
				phone += number.substr(3, 4);
				phone += "-";
				phone += number.substr(7);
			}
		}else{
			phone = targetValue
		}
	  
	  // obj.value = phone;
	  // this.setState({value: newValue})
	  if( targetName.length <= 1 )
	  {
			const targetInfo = targetName[0]
			// const nextInfo = {...state.targetInfo}
			// nextInfo[targetInfo] = targetValue
		  
		  // const nextInfo = {...state[targetName[0]]}
		  // nextInfo[targetName[0]] = targetValue
			
		  console.log(target);
		  // console.log(nextInfo);
		  console.log(targetValue);
		  return {
			  ...state,
			  [targetInfo]: targetValue,
		  }
	  }
	  else
	  {
		  const nextInfo = {...state[targetName[0]]}
		  nextInfo[targetName[1]] = phone
		
		  console.log(phone);
		  return {
			  ...state,
			  [targetName[0]]: nextInfo,
		  }
	  }
   
  },
  [HANDLEMARKETINGTYPE]: (state, action) => {
    const target = action.payload
    const nextMarketingType = {...state.marketingType}
    nextMarketingType[target.value] = target.checked
    return {
      ...state,
      marketingType: nextMarketingType
    }
  },
  [HANDLEKEYWORD]: (state, action) => {
    return {
      ...state,
      keywords: action.payload !== '' ? state.keywords.concat(action.payload) : state.keywords
    }
  },
	[HANDELDELETEKEYWORD]:(state,action)=>{
				let nextkeywords = {...state.keywords}
				// console.log(action.payload)
				// nextkeywords = state.nextkeywords.filter(info => info.index !== action.payload.index);
				// state.nextkeywords--
				console.log(nextkeywords)
				nextkeywords = state.keywords.filter(info => info !== action.payload);
				state.keywords--
			return {
				...state,
				keywords: nextkeywords
			}
	},
  [HANDLEMARKETINGDATE]: (state, action) => {
    let nextMarketingDate = {...state.marketingDate};
    for (let key in action.payload) {
      nextMarketingDate[key] = action.payload[key];
    }
    return {
      ...state,
      marketingDate: nextMarketingDate
    }
  },
  [ADDINFO]: (state, action) => {
  	console.log(action.payload)
    let nextMarketingInfoList = {...state.marketingInfoList}
    switch (action.payload) {
      case 'BLOG_EXPERIENCE':
        nextMarketingInfoList.blog_experience = state.marketingInfoList.blog_experience.concat({index: state.marketingInfoListIndex.blog_experience++, id: ''})
        break;
      case 'BLOG_MANAGE':
        nextMarketingInfoList.blog_manage = state.marketingInfoList.blog_manage.concat({index: state.marketingInfoListIndex.blog_manage++, id: ''})
        break;
      case 'CAFE_MANAGE':
        nextMarketingInfoList.cafe_manage = state.marketingInfoList.cafe_manage.concat({index: state.marketingInfoListIndex.cafe_manage++, url: ''})
        break;
      case 'CAFE_EXPERIENCE':
        nextMarketingInfoList.cafe_experience = state.marketingInfoList.cafe_experience.concat({index: state.marketingInfoListIndex.cafe_experience++, url: '', id: ''})
        break;
      case 'FACEBOOK_EXPERIENCE':
        nextMarketingInfoList.facebook_experience = state.marketingInfoList.facebook_experience.concat({index: state.marketingInfoListIndex.facebook_experience++, url: ''})
        break;
      case 'FACEBOOK_MANAGE':
        nextMarketingInfoList.facebook_manage = state.marketingInfoList.facebook_manage.concat({index: state.marketingInfoListIndex.facebook_manage++,url:''})
        break;
      case 'INSTA_EXPERIENCE':
        nextMarketingInfoList.insta_experience = state.marketingInfoList.insta_experience.concat({index: state.marketingInfoListIndex.insta_experience++,url:''})
        break;
      case 'INSTA_MANAGE':
        nextMarketingInfoList.insta_manage = state.marketingInfoList.insta_manage.concat({index: state.marketingInfoListIndex.insta_manage++, url: ''})
        break;
      case 'FACEBOOK_INSTA_ADS':
        nextMarketingInfoList.facebook_insta_ads = state.marketingInfoList.facebook_insta_ads.concat({index: state.marketingInfoListIndex.facebook_insta_ads++, name:''})
        break;
      // case 'FACEBOOKINSTA':
      //   nextMarketingInfoList.facebookInstagramList = state.marketingInfoList.facebookInstagramList.concat({id: '', password: '', url: ''})
      //   break;
      default:
        break;
    }
    return {
      ...state,
      marketingInfoList: nextMarketingInfoList
    }
  },
	[DELINFO]: (state, action) => {
		let nextMarketingInfoList = {...state.marketingInfoList}
		console.log(action.payload)
		switch (action.payload.type) {
			case 'BLOG_EXPERIENCE':
				nextMarketingInfoList.blog_experience = state.marketingInfoList.blog_experience.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.blog_experience--
				console.log(nextMarketingInfoList.blog_experience)
				break;
			case 'BLOG_MANAGE':
				nextMarketingInfoList.blog_manage = state.marketingInfoList.blog_manage.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.blog_manage--
				// nextMarketingInfoList.blog_manage = state.marketingInfoList.blog_manage.filter(info => info.index !== action.payload.index);
				// state.marketingInfoListIndex.blog_manage--
				// console.log(nextMarketingInfoList.blog_manage)
				// nextMarketingInfoList.blog_manage = state.marketingInfoList.blog_manage.filter(num => num !== action.payload.index);
				break;
			case 'CAFE_MANAGE':
				nextMarketingInfoList.cafe_manage = state.marketingInfoList.cafe_manage.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.cafe_manage--
				// nextMarketingInfoList.cafe_manage = state.marketingInfoList.cafe_manage.filter(num => num !== action.payload.index);
				break;
			case 'CAFE_EXPERIENCE':
				// nextMarketingInfoList.cafe_experience = state.marketingInfoList.cafe_experience.concat({id: '', password: ''})
				nextMarketingInfoList.cafe_experience = state.marketingInfoList.cafe_experience.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.cafe_experience--
				break;
			case 'FACEBOOK_EXPERIENCE':
				nextMarketingInfoList.facebook_experience = state.marketingInfoList.facebook_experience.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.facebook_experience--
				// nextMarketingInfoList.facebook_experience = state.marketingInfoList.facebook_experience.concat({url: ''})
				break;
			case 'FACEBOOK_MANAGE':
				nextMarketingInfoList.facebook_manage = state.marketingInfoList.facebook_manage.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.facebook_manage--
				// nextMarketingInfoList.facebook_manage = state.marketingInfoList.facebook_manage.concat({ url: ''})
				break;
			case 'INSTA_EXPERIENCE':
				nextMarketingInfoList.insta_experience = state.marketingInfoList.insta_experience.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.insta_experience--
			  // nextMarketingInfoList.insta_experience = state.marketingInfoList.insta_experience.concat({ url: ''})
			  break;
			case 'INSTA_MANAGE':
				nextMarketingInfoList.insta_manage = state.marketingInfoList.insta_manage.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.insta_manage--
				// nextMarketingInfoList.insta_manage = state.marketingInfoList.insta_manage.concat({url: ''})
				break;
			case 'FACEBOOK_INSTA_ADS':
				// nextMarketingInfoList.facebook_insta_ads = state.marketingInfoList.facebook_insta_ads.concat({name: ''})
				// nextMarketingInfoList.facebook_insta_ads = state.marketingInfoList.facebook_insta_ads.filter(info => info.index !== action.payload.index);
				// state.marketingInfoListIndex.facebook_insta_ads--
				// console.log(nextMarketingInfoList.facebook_insta_ads)
				nextMarketingInfoList.facebook_insta_ads = state.marketingInfoList.facebook_insta_ads.filter(info => info.index !== action.payload.index);
				state.marketingInfoListIndex.facebook_insta_ads--
				break;
			default:
				break;
		}
		return {
			...state,
			marketingInfoList: nextMarketingInfoList
		}
	},
  [HANDLEINFOLISTINPUT]: (state, action) => {
    const target = action.payload.target
    const targetName = target.name.split('/')
    const targetValue = target.value
    let nextMarketingInfoList = {...state.marketingInfoList}
    switch (targetName[0]) {
      case 'blog_experience':
        nextMarketingInfoList.blog_experience[targetName[2]][targetName[1]] = targetValue
        break;
      case 'blog_manage':
        nextMarketingInfoList.blog_manage[targetName[2]][targetName[1]] = targetValue
        break;
      case 'cafe_manage':
        nextMarketingInfoList.cafe_manage[targetName[2]][targetName[1]] = targetValue
        break;
      case 'cafe_experience':
        nextMarketingInfoList.cafe_experience[targetName[2]][targetName[1]] = targetValue
        break;
      case 'facebook_experience':
        nextMarketingInfoList.facebook_experience[targetName[2]][targetName[1]] = targetValue
        break;
      case 'facebook_manage':
        nextMarketingInfoList.facebook_manage[targetName[2]][targetName[1]] = targetValue
        break;
      case 'insta_experience':
        nextMarketingInfoList.insta_experience[targetName[2]][targetName[1]] = targetValue
        break;
      case 'insta_manage':
        nextMarketingInfoList.insta_manage[targetName[2]][targetName[1]] = targetValue
        break;
	    case 'facebook_insta_ads':
		    nextMarketingInfoList.facebook_insta_ads[targetName[2]][targetName[1]] = targetValue
		    break;
      default:
        break;
    }
    return {
      ...state,
      marketingInfoList: nextMarketingInfoList
    }
  },
  [UPDATESTATUS]: (state, action) => {
	  // this.isDisabled = ''
	  console.log(action.payload)
	  
    return {
      ...state,
      storeStatus:  action.payload,
	    isDisabled : action.payload === 'none'? 'disabled': ''
    }
  },
	[UPDATEDATESTATE]: (state, action) => {
		// this.isDisabled = ''
		console.log(action.payload)
		if(action.payload.isDate === true){
			let startDate = initialState.marketingDate.startDate.toString() === '' ? '' : new Date(Date.parse(initialState.marketingDate.startDate))
			let endDate = initialState.marketingDate.endDate.toString() === '' ? '' : new Date(Date.parse(initialState.marketingDate.endDate))
			 if (startDate === '' || endDate === '') {
				 action.payload.isDate = 'disabled';
			 }
			 else {
				 action.payload.isDate = '';
			 }
		}
		return {
			...state,
			isDisabled : action.payload.isDate === ''? 'disabled': ''
		}
	},
  [SETSTATE]: (state = initialState, action) => {
    console.log(action.payload)
    const { operatorInfo, advertiserInfo, marketingDate, marketingType, keywords, marketingInfoList, storeStatus} = action.payload
    console.log(marketingInfoList)
    console.log(initialState.marketingInfoList)
    marketingDate.startDate = marketingDate.startDate.toString() === '' ? '' : new Date(Date.parse(marketingDate.startDate))
    marketingDate.endDate = marketingDate.endDate.toString() === '' ? '' : new Date(Date.parse(marketingDate.endDate))
	  // console.log("popupStatus");
	  // console.log(initialState.popupStatus);
	  // console.log("storestatus");
	  // console.log(initialState.storeStatus);
	  // console.log("start_DATE");
	  // console.log(marketingDate.startDate)
	  // let disabled = '';
	  // if( initialState.popupStatus === TYPE.STEP2 ){
		 //  if (marketingDate.startDate === '' || marketingDate.endDate === '') {
			//   disabled = 'disabled';
		 //  }
	  // }
	  // console.log("disabled");
	  // console.log(disabled)
    return {
      ...state,
	    storeStatus:storeStatus,
      operatorInfo: operatorInfo,
      advertiserInfo: advertiserInfo,
      marketingDate: marketingDate,
      marketingType: marketingType,
      keywords: keywords,
      marketingInfoList: marketingInfoList,
	    // disabled: disabled
    }
  },
	[INITMARKETINGINFOLIST]: (state = initialState, action) => {
		console.log(action.payload)
		let nextMarketingInfoList = {...state.marketingInfoList}
		console.log(nextMarketingInfoList)
		// const { blog_experience } = action.payload
		// console.log(blog_experience)
		// marketingDate.startDate = marketingDate.startDate.toString() === '' ? '' : new Date(Date.parse(marketingDate.startDate))
		// marketingDate.endDate = marketingDate.endDate.toString() === '' ? '' : new Date(Date.parse(marketingDate.endDate))
		// console.log("popupStatus");
		// console.log(initialState.popupStatus);
		// console.log("storestatus");
		// console.log(initialState.storeStatus);
		// console.log("start_DATE");
		// console.log(marketingDate.startDate)
		// let disabled = '';
		// if( initialState.popupStatus === TYPE.STEP2 ){
		//  if (marketingDate.startDate === '' || marketingDate.endDate === '') {
		//   disabled = 'disabled';
		//  }
		// }
		// console.log("disabled");
		// console.log(disabled)
		return {
			...state,
			marketingInfoList: nextMarketingInfoList,
			// disabled: disabled
		}
	}
}, initialState)
