import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as listInfoPopupActions from '../../../store/modules/listInfoPopup';
import { GetExpandForm } from '../../../functions/getExpandForm'
import * as listActions from '../../../store/modules/list';
import * as TYPE from '../../../stringType'

import icon_more from '../../../assets/images/icon_more.png'
import {SMSPush} from "../../../functions/UtilPopupInfo";

import moment from "moment/moment";
class CompanyItem extends Component {
    id = 0;
    state = {
        operatorInfo: {
            name: '',
            phoneNumber: ''
        },
        advertiserInfo: {
            name: '',
            phoneNumber: ''
        },
        blogList: [],
	      www: false,
    };

    www() {
    	let t = this.state;
    	t.www = !t.www;
	    this.setState(t);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { id, status, collapsible, moreOptionState } = this.props
        return (nextProps.id !== id) ||
            (nextProps.collapsible !== collapsible) ||
            (nextProps.moreOptionState !== moreOptionState) ||
            (nextState !== this.state) ||
            (nextProps.status !== status)
    }

    stateName() {
        const { status } = this.props;
        if (status === TYPE.SCRAP) {
            return '수집중'
        } else if (status === TYPE.COMPLETE) {
            return '수집완료'
        } else if (status === TYPE.SALES) {
            return '영업중'
        } else if (status === TYPE.MARKETING) {
            return '마케팅진행'
        } else if (status === TYPE.FINISH) {
            return '진행완료'
        } else if (status === TYPE.ERROR) {
            return '에러발생'
        }
    }
    
    handleExpand = async (id, name) => {
        const { listActions, collapsible } = this.props
        const flag = collapsible;
        await listActions.toggleExpand(id);
        if (flag) return
        let response = await GetExpandForm(name);
        await response.blogList.forEach((item) => {
            item.id = this.id++
        });
        await console.log(response);
        await this.setState({
            operatorInfo: {
                name: response.operator_name,
                phoneNumber: response.operator_phone
            },
            advertiserInfo: {
                name: response.advertiser_name,
                phoneNumber: response.advertiser_phone
            },
            blogList: response.blogList
        })
      console.log(this.state.advertiserInfo)
    };
    handleSMSPush = async () => {
	      await SMSPush()
    }
    render () {
        const { 
            id,
            name,
            day,
            marketing_start_date,
            marketing_end_date,
            advertiser_name,
            advertiser_phone,
            status,
            location,
            keyword,
            handleDelete,
            handleClick,
            handleRescrap,
            listActions,
            moreOptionState,
            listInfoPopupActions,
            category,
        } = this.props

        const keywords = keyword.map(
            (element, index) => {
               return (
                <span className="badge tag" key={element+index}>{element}
                </span>
               )
            }
        );

        return (
            <Fragment>
            <li>
                <div className={`status_item ${status}`}>
                    <span className="badge badge_sm radius list_order">{this.stateName()}</span>
                </div>
                    <div className="item_wrap">
                        <div className="table_block">
                          <span className="table_cell_50">
                              <div className="info_item">
                                <div className="info">
                                    <span className="store_name" onClick = {
                                      (e) => {
                                        handleClick(name, status)}}
                                          style={{cursor:'pointer'}}>
                                        {name}
                                    </span>
                                    <span className="store_add">{location}</span>
                                </div>
                                <div className="display-1">
                                  <div className="day_label_warp">
                                    <div className="day_label inline">
                                      <div className="day_bold_label table_cell">등록날짜</div>
                                      <span> </span>
                                      <div className="table_cell">{day}</div>
                                      
                                    </div>
	                                  {
		                                  (marketing_start_date !== '') &&
		                                  <div className="day_label inline">
			                                  <div className="day_bold_label table_cell">마케팅 날짜</div>
			                                  <span> </span>
			                                  <div className="table_cell">{moment(marketing_start_date).subtract(-1,'d').format("YYYY-MM-DD")}~{moment(marketing_end_date).subtract(-1,'d').format("YYYY-MM-DD")}</div>
		                                  </div>
	                                  }
	                                  {
		                                  (advertiser_name!=='') &&
		                                  <div className="day_label inline">
			                                  <div className="day_bold_label table_cell">광고주 이름</div>
			                                  <span> </span>
			                                  <div className="table_cell">{advertiser_name}</div>
		                                  </div>
	                                  }
	                                  {
		                                  (advertiser_phone!=='') &&
		                                  <div className="day_label inline">
			                                  <div className="day_bold_label table_cell">광고주 연락처</div>
                                        <span> </span>
			                                  <div className="table_cell">{advertiser_phone}</div>
		                                  </div>
	                                  }
                                  </div>
                                 </div>
                                <div className="tag_item">
                                  {keywords}
                                </div>
                                
                              </div>
    
                          </span>
                          
                        </div>
                    </div>
                    
                {
                  (status===TYPE.COMPLETE || status===TYPE.SALES) &&
                  <div className="edit_item">
                      <button className="btn btn_round purple i-edit" onClick={() => listInfoPopupActions.openPopup({id: id, name: name, status: status, location: location, popupStatus:''})}>추가 정보</button>
                  </div>
                }
                <div className="more_item" style={{cursor:'pointer', margin:'0', fontSize:'10px'}} onClick={() => {this.www(); listActions.toggleOption(id);}}>
	                <span style={{width: '7px',height: '20px'}}></span>
	                <img src={icon_more} alt='modify' style={{position: 'relative',width: '7px',top: '13px',left: '-26px'}}/>
	                {
                    moreOptionState &&
                    <div className="more_menu">
                        <ul>
                          <li  style={{cursor:'pointer'}} onClick={() => {handleDelete(name); listActions.closeOption(id)}}>삭제</li>
                          <li  style={{cursor:'pointer'}} onClick={() => {handleRescrap(name, location); listActions.closeOption(id)}}>다시 수집</li>
                          {
                              status === TYPE.MARKETING &&
                              <li  style={{cursor:'pointer'}} onClick={() => listInfoPopupActions.openPopup({id: id, name: name, status: status, location: location, popupStatus:''})}>추가정보 수정</li>
	
                          }
	                        {
		                        status === TYPE.MARKETING &&
		                        <li style={{cursor:'pointer'}} ><a target="_blank" href={`Analysis/${name}`} >영업 리포트</a></li>
		
	                        }
	                        {/*{*/}
		                        {/*status === TYPE.MARKETING &&*/}
		                        {/*<li style={{cursor:'pointer'}} onClick={() => {this.handleSMSPush(); listActions.closeOption(id)}}>sms전송</li>*/}
	                        
	                        {/*}*/}
	                        {
		                        status === TYPE.MARKETING &&
                            <li style={{cursor:'pointer'}} ><a target="_blank" href={`http://203.245.41.78:3000/${JSON.parse(sessionStorage.auth).user.username}_${name}`} >대시보드 링크 바로가기</a></li>
		
	                        }
                        </ul>
                    </div>
	                }
                </div>
            </li>
            </Fragment>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        listActions: bindActionCreators(listActions, dispatch),
        listInfoPopupActions: bindActionCreators(listInfoPopupActions, dispatch)
    })
)(CompanyItem)
