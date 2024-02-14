import React, { Component } from 'react'
import Popup1 from './Popup1'
import Popup2 from './Popup2'
import Popup3 from './Popup3'
import Popup4 from './Popup4'
import Popup5 from './Popup5'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from '../../../store/modules/list'
import * as listInfoPopupActions from '../../../store/modules/listInfoPopup';
import * as TYPE from '../../../stringType'
import { setPopupInfo, getPopupInfo, SMSPush } from '../../../functions/UtilPopupInfo'
import Alert from "react-s-alert";
import * as sendRival from "../../../functions/sendRival";

class InfoPopupContainer extends Component {
    async componentDidMount () {
        const { listInfoPopupActions, storeName } = this.props
        if(storeName !== ''){
	        const response = await getPopupInfo(storeName)
	        // console.log("response: " + response)
	        // console.log(response)
	        if (response !== null) {
		        listInfoPopupActions.setState(response)
		        // const {marketingInfoList, marketingType} = this.props
	        }
        }
    }
	sendMyRivalToServer = async () => {
		const { storeName, storeLocation, keyword } = this.props;
		console.log(storeLocation)
		let locationArray = storeLocation.split(' ')
  
		// let menus = menu.split('>');
		// menus = menus[menus.length  - 1].split(',');
		// let menuKey = menus[0];
		let locationKey = '';
		await locationArray.some(item => {
			if(item[item.length - 1] === '시') {
				locationKey = item;
				return true;
			}
			return false;
		});
		
		await locationArray.some(item => {
			if (item[item.length - 1] === '구'){
				// location = item.slice(0, item.length - 1);
				locationKey = item;
				return true;
			}
			return false;
		});
		// let keywords = new Array(3)
		let keywords_arr = new Array(3)
		keywords_arr[0] = {'id': 0, 'item': keyword}
		keywords_arr[1] = {'id': 1, 'item': locationKey + ' ' + keyword}
		await locationArray.some(item => {
			if (item[item.length - 1] === '동'){
				// location = item.slice(0, item.length - 1);
				locationKey = item;
				return true;
			}
			return false;
		});
		keywords_arr[2] = {'id': 2, 'item': locationKey + ' ' + keyword}
		// keywords.push({id: 1, item: locationKey + ' ' + keyword});
		Alert.info('데이터 수집을 시작합니다.', {
			position: 'top-right',
			effect: 'slide'
		});
		try {
			const tmpList = [] ;
			const username = JSON.parse(sessionStorage.auth).user.username;

			// keywords_arr[2] = {'id': 2, 'item': locationKey + ' ' + keyword}
			const response = await sendRival.sendMyRival(username, tmpList, storeName, keywords_arr, storeLocation);
			console.log("동시에...")
			// window.location.href="/Marketing";
			if(response === "success"){
				await Alert.success('저장완료!.', {
					position: 'top-right',
					effect: 'slide'
				});
				await this.props.history.push('/Marketing')
				window.location.href="/Marketing";
			// }
			
			}
		}
		catch (e) {
			await console.log(e);
			await this.props.history.push('/Marketing')
		}
	};
    handleSubmit = async () => {
        const { listInfoPopupActions, listActions, storeStatus, storeName } = this.props
        
        if (await setPopupInfo() === TYPE.SUCCESS) {
            await listActions.handleStatus({name: storeName, status: storeStatus})
	          console.log('여기는 서브밋, sms응답하라')
	          if(storeStatus === TYPE.MARKETING){
		          console.log('sms 전이다 오바')
            	await SMSPush()
		          console.log('sms 완료했다 오바')
		          
	          }
	          
        }
        await listInfoPopupActions.closePopup()
    }

    render () {
        const { listInfoPopupActions, popupStatus, storeStatus,isDisabled } = this.props
        const { handleSubmit,sendMyRivalToServer  } = this
       

        return (
        
        <section id="wrap">
            <div className="contents no_contents one_page center">
                <div className="popup">
                    <div className="popup_inner">
                        <div className="popup_box">
                            <button className="popup_close" onClick={() => listInfoPopupActions.closePopup()}></button>
                            <div className="popup_box_header">
                                <h2 className="popup_box_header_title">추가 정보 입력하기</h2>
                            </div>
                            { popupStatus === TYPE.STEP1 && <Popup1/> }
                            { popupStatus === TYPE.STEP2 && <Popup2/> }
                            { popupStatus === TYPE.STEP3 && <Popup3/> }
                            { popupStatus === TYPE.STEP4 && <Popup4/> }
                            { popupStatus === TYPE.STEP5 && <Popup5/> }
                            <div className="popup_box_footer">
                                <div className="popup_footer_left_space">
                                    {
                                        popupStatus !== TYPE.STEP1 &&
                                        popupStatus !== TYPE.STEP4 &&
                                        popupStatus !== TYPE.STEP5 &&
                                        <button
                                            className="btn purple line i-prev"
                                            onClick={() => listInfoPopupActions.prevStatus()}>
                                            이전
                                        </button>
                                    }
                                </div>
                              { storeStatus === TYPE.STEP5?
                                <div className= {isDisabled+" popup_footer_right_space"}>
                                  {/*{storeStatus}*/}
                                  {/*{isDisabled}*/}
                                  {
	                                  <button
		                                  className="btn purple"
		                                  onClick={sendMyRivalToServer}>
		                                  기업 추가
	                                  </button>
                                  }
                                </div>:
	                              <div className= {isDisabled+" popup_footer_right_space"}>
		                              {/*{storeStatus}*/}
		                              {/*{isDisabled}*/}
		                              {
			
			                              storeStatus === '' ||
			                              storeStatus === TYPE.NONE ||
			                              storeStatus === TYPE.SALES ||
			                              storeStatus === TYPE.COMPLETE ||
			                              popupStatus === TYPE.STEP4 ||
			                              popupStatus === TYPE.STEP5 ?
				                              <button
					                              className="btn purple"
					                              onClick={handleSubmit}
					                              disabled = {isDisabled}
				                              >
					
					                              완료
				                              </button> :
				                              <button
					                              className="btn purple i-next"
					                              onClick={() => listInfoPopupActions.nextStatus()}
					                              disabled = {isDisabled}
				                              >
					                              다음 선택
				                              </button>
			
		                              }
	                              </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default connect(
    (state) => ({
        storeName: state.listInfoPopup.storeName,
	      storeLocation: state.listInfoPopup.storeLocation,
        storeStatus: state.listInfoPopup.storeStatus,
        popupStatus: state.listInfoPopup.popupStatus,
	      isDisabled: state.listInfoPopup.isDisabled
    }),
    (dispatch) => ({
        listActions: bindActionCreators(listActions, dispatch),
        listInfoPopupActions: bindActionCreators(listInfoPopupActions, dispatch)
    })
)(InfoPopupContainer)