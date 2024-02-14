import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from '../../../store/modules/list'
import * as listInfoPopupActions from '../../../store/modules/listInfoPopup';
import * as TYPE from '../../../stringType'

class Popup1 extends Component {
    componentDidMount () {
	    // const { storeStatus,updateStatus } = this.props.listInfoPopupActions;
	    // updateStatus(storeStatus)
    }

		
    render () {
        const {  operatorInfo, advertiserInfo } = this.props
        const { handleInput, updateStatus } = this.props.listInfoPopupActions
        return (
          <div className="popup_box_body">
              <div className="row">
                  <form>
                      <div className="form_title">상태 설정하기</div>
                      <select onChange={(e) => updateStatus(e.target.value)}>
                        <option value={TYPE.NONE}>상태를 변경해 주세요 </option>
                        <option value={TYPE.SALES}>영업중</option>
                        <option value={TYPE.MARKETING}>마케팅 진행</option>
                      </select>
                      <div className="sub_info">
                          <p>‘영업중’으로 변경시 기본 정보를 입력해 주세요.</p>
                          <p>‘마케팅 진행’으로 변경시 마케팅 집행을 위한 추가 정보를 입력해 주세요.</p>
                      </div>
                  </form>
              </div>
              <div className="row">
                  <form>
                      <div className="form_group">
                          <label>영업자 이름</label>
                          <input
                            type="text"
                            placeholder="담당 영업자 이름을 작성해 주세요."
                            name="operatorInfo/name"
                            autoComplete="off"
                            onChange={handleInput}
                            value={operatorInfo.name}/>
                      </div>
                      <div className="form_group">
                          <label>영업자 전화번호</label>
                          <input
                            type="text"
                            placeholder="담당 영업자 전화번호를 작성해 주세요."
                            name="operatorInfo/phoneNumber"
                            autoComplete="off"
                            onChange={handleInput}                       
                            value={operatorInfo.phoneNumber}/>
                      </div>
                      <div className="form_group">
                          <label>광고주 이름</label>
                          <input
                            type="text"
                            placeholder="광고주 이름을 작성해 주세요."
                            name="advertiserInfo/name"
                            autoComplete="off"
                            onChange={handleInput}                       
                            value={advertiserInfo.name}/>
                      </div>
                      <div className="form_group">
                          <label>광고주 전화번호</label>
                          <input
                            type="text"
                            placeholder="광고주 전화번호를 작성해 주세요."
                            name="advertiserInfo/phoneNumber"
                            autoComplete="off"
                            onChange={handleInput}                       
                            value={advertiserInfo.phoneNumber}/>
                      </div>
                  </form>
              </div>
          </div>
        )
    }
}

export default connect (
    (state) => ({
        storeStatus: state.listInfoPopup.storeStatus,
        operatorInfo: state.listInfoPopup.operatorInfo,
        advertiserInfo: state.listInfoPopup.advertiserInfo
    }),
    (dispatch) => ({
        listActions: bindActionCreators(listActions, dispatch),
        listInfoPopupActions: bindActionCreators(listInfoPopupActions, dispatch)
    })
)(Popup1)
