import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listInfoPopupActions from '../../../store/modules/listInfoPopup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import icon_minus from '../../../assets/images/icon_close.png'
class Popup2 extends Component {
	constructor(props) {
		super(props);
		this.scrollpos = React.createRef();
	}
	async componentDidMount () {
		const { updateDateState } = this.props.listInfoPopupActions;
		updateDateState({isDate: ''})
		// const { storeStatus,updateStatus } = this.props.listInfoPopupActions;
		// updateStatus(storeStatus)
		
		
		document.getElementsByClassName('popup_box_body')[0].addEventListener('scroll',this.scrollToOrigin,true);
		
		
	}

	state = {
		keywordInput: '',
		preHeight: 0
	};
	scrollToOrigin = () => {

		const tesNode = document.getElementsByClassName('popup_box_body')[0];
		
		if(this.state.height !== tesNode.scrollTop && (tesNode.scrollTop === 0 ) ){
			console.log(tesNode.clientHeight)
			console.log(tesNode.scrollTop)
			console.log(tesNode.scrollHeight)
			document.getElementsByClassName('popup_box_body')[0].scrollTo(0,this.state.preHeight);
		}
		
		
		this.setState({
			preHeight: tesNode.scrollTop
		});
		// tesNode.scrollIntoView({  behavior: 'smooth' });
		// window.scrollTo(0, this.scrollpos.offsetTop)
		//const tesNode = ReactDOM.findDOMNode(this.refs.test);
		// tesNode.scrollIntoView({  behavior: 'smooth' });
		// console.log(this.scrollpos)
	};
	handleChange = e => this.setState({ keywordInput: e.target.value })
	handleKeydown = e => {
		const { keywordInput } = this.state
		const { handleKeyword } = this.props.listInfoPopupActions
		if (e.key === 'Enter') { handleKeyword(keywordInput); this.setState({ keywordInput: '' }) }
	};
	
	// async handleDeleteKeywords (item){
	// 	const { handleDeleteKeyword } = this.props.listInfoPopupActions.handleDeleteKeyword(item)
	// 	handleDeleteKeyword(item)
	//
	// }
			handleChangeStart = date => this.props.listInfoPopupActions.handleMarketingDate({startDate: date});
	handleChangeEnd = date => this.props.listInfoPopupActions.handleMarketingDate({endDate: date});
	handleChecked = e =>{
		// const {marketingType} = this.props
		// const tesNode = document.getElementsByClassName('popup_box_body')[0];
		let type = ''
		// let test = marketingType.블로그체험단
		// console.log(tesNode.clientHeight)
		// console.log(tesNode.scrollTop)
		// console.log(tesNode.scrollHeight)
		console.log(e.target.checked)
		this.props.listInfoPopupActions.handleMarketingType(e.target);
		if(e.target.checked === true){
			// console.log(type)
			// console.log(test)
			// console.log(marketingType.블로그운영대행)
			// console.log("e.target.value")
			// console.log(e.target.value)
			// console.log(marketingType.블로그운영대행==e.target.value)
			// console.log(marketingType.블로그운영대행==test)
			switch (e.target.value) {
				case '블로그체험단':
					type = 'BLOG_EXPERIENCE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '블로그운영대행':
					type = 'BLOG_MANAGE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '카페운영대행':
					type = 'CAFE_MANAGE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '카페체험단':
					type = 'CAFE_EXPERIENCE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '페이스북체험단':
					type = 'FACEBOOK_EXPERIENCE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '페이스북운영대행':
					type = 'FACEBOOK_MANAGE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '인스타그램체험단':
					type = 'INSTA_EXPERIENCE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '인스타그램운영대행':
					type = 'INSTA_MANAGE'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				case '페이스북인스타그램광고대행':
					type = 'FACEBOOK_INSTA_ADS'
					this.props.listInfoPopupActions.addInfo(type);
					break;
				// case 'FACEBOOKINSTA':
				//   nextMarketingInfoList.facebookInstagramList = state.marketingInfoList.facebookInstagramList.concat({id: '', password: '', url: ''})
				//   break;
				default:
					break;
			}
		}
			else{
				switch (e.target.value) {
					case '블로그체험단':
						type = 'BLOG_EXPERIENCE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '블로그운영대행':
						type = 'BLOG_MANAGE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '카페운영대행':
						type = 'CAFE_MANAGE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '카페체험단':
						type = 'CAFE_EXPERIENCE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '페이스북체험단':
						type = 'FACEBOOK_EXPERIENCE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '페이스북운영대행':
						type = 'FACEBOOK_MANAGE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '인스타그램체험단':
						type = 'INSTA_EXPERIENCE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '인스타그램운영대행':
						type = 'INSTA_MANAGE'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					case '페이스북인스타그램광고대행':
						type = 'FACEBOOK_INSTA_ADS'
						this.props.listInfoPopupActions.delInfo(type);
						break;
					// case 'FACEBOOKINSTA':
					//   nextMarketingInfoList.facebookInstagramList = state.marketingInfoList.facebookInstagramList.concat({id: '', password: '', url: ''})
					//   break;
					default:
						break;
				}
		}
	}
	handleChangeStart = date => {
		const { updateDateState } = this.props.listInfoPopupActions
		updateDateState({isDate: true});
		this.props.listInfoPopupActions.handleMarketingDate({startDate: date});
		
	}
	handleChangeEnd = date => {
		const { updateDateState } = this.props.listInfoPopupActions
		updateDateState({isDate: true});
		this.props.listInfoPopupActions.handleMarketingDate({endDate: date});
	}
	// handleKeywordList (){
	// 	const { keywords } = this.props;
	// 	keywords.map((item, index)=> {
	// 		return (
	// 			<span className="badge tag" key={index}>{item} </span>)
	//
	// 	});
	// }

    render () {
      const { handleChange, handleKeydown, handleChecked } = this;
      const { keywordInput } = this.state;
      const { marketingDate, marketingType,keywords } = this.props;

	    // const keywordList = keywords.map((item, index) => { return ( <span className="badge tag" key={index}>{item} <button onClick={handleDeleteKeywords(item)} ><img src={icon_minus} alt="" /></button></span> ) });
	
	    return (
        <div className="popup_box_body">
          <div className="popup_box_row row">
            <form>
              <div className="form_group">
                <label>마케팅 일정 선택</label>
                <div className="schedule_wrap">
                  <DatePicker
                      selected={marketingDate.startDate}
                      selectsStart
                      startDate={marketingDate.startDate}
                      endDate={marketingDate.endDate}
                      onChange={this.handleChangeStart}
                      isClearable={true}
                      dateFormat="yyyy/MM/dd"
                      placeholderText="시작일"
                      className="schedule"
                  />
                  <span>~ </span>
                  <DatePicker
                      selected={marketingDate.endDate}
                      selectsEnd
                      startDate={marketingDate.startDate}
                      endDate={marketingDate.endDate}
                      onChange={this.handleChangeEnd}
                      minDate={marketingDate.startDate}
                      isClearable={true}
                      dateFormat="yyyy/MM/dd"
                      placeholderText="종료일"
                      className="schedule"
                  />
                </div>
                <div className="sub_info">
                  <p>종료일이 되면 자동으로 ‘진행 완료’ 상태로 변경됩니다.</p>
                </div>
              </div>
              <div className="form_group"  ref={ref => {this.scrollpos = ref}}>
                <div className="form_title">마케팅 유형 선택</div>
                <div className="check_wrap">
                  <input type="checkbox" id="c01" value="블로그체험단" checked={marketingType.블로그체험단} onChange={handleChecked} onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c01">
                    <div className="ck_bx">
                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">블로그 체험단</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c02" value="블로그운영대행" checked={ marketingType.블로그운영대행} onChange={handleChecked} onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c02">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">블로그 운영 대행</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c03" value="카페운영대행" checked={marketingType.카페운영대행} onChange={handleChecked} onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c03">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">카페 운영 대행</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c04" value="카페체험단" checked={marketingType.카페체험단} onChange={handleChecked } onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c04">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">카페 침투 마케팅</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c05" value="페이스북체험단" checked={marketingType.페이스북체험단} onChange={handleChecked } onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c05">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 인플루언서</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c06" value="페이스북운영대행" checked={marketingType.페이스북운영대행} onChange={handleChecked } onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c06">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 페이지 운영 대행</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c07" value="인스타그램체험단" checked={marketingType.인스타그램체험단} onChange={handleChecked } onClick={this.scrollToOrigin} readOnly />
                  <label htmlFor="c07">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">인스타그램 인플루언서</span>
                    </div>
                  </label>
                </div>
                <div className="check_wrap">
                  <input type="checkbox" id="c08" value="인스타그램운영대행" checked={marketingType.인스타그램운영대행} onChange={handleChecked} onClick={this.scrollToOrigin} readonly/>
                  <label htmlFor="c08">
                    <div className="ck_bx">
                      <span className="ck_bx_shape"></span> <span className="ck_bx_text">인스타그램 계정 운영 대행</span>
                    </div>
                  </label>
                </div>
	              {/*<div className="check_wrap">*/}
		              {/*<input type="checkbox" id="c09" value="페이스북인스타그램광고대행" checked={marketingType.페이스북인스타그램광고대행} onChange={handleChecked} onClick={this.scrollToOrigin} readonly/>*/}
		              {/*<label htmlFor="c09">*/}
			              {/*<div className="ck_bx">*/}
				              {/*<span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북, 인스타그램 광고 대행</span>*/}
			              {/*</div>*/}
		              {/*</label>*/}
	              {/*</div>*/}
              </div>
              <div className="form_group">
                <label>키워드 (최소 세 개)</label>
                <input
                  type="text"
                  placeholder="영업점의 키워드를 입력해 주세요"
                  value={keywordInput}
                  onChange={handleChange}
                  onKeyUp={handleKeydown}/>
                <div className="tag_wrap">
	                {
	                keywords.map((item, index) => {
	                	return ( <span className="badge tag " key={index} >{item}
				               <img src={icon_minus} alt=""  onClick={() =>  this.props.listInfoPopupActions.handleDeleteKeyword(item)} />
	                	</span>
		                )
	                })
                }
	               
                </div>
                <div className="sub_info">
                  <p>각 키워드는 엔터키로 구분할 수 있습니다.</p>
                </div>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

export default connect (
  (state) => ({
    marketingDate: state.listInfoPopup.marketingDate,
    marketingType: state.listInfoPopup.marketingType,
    keywords: state.listInfoPopup.keywords
  }),
  (dispatch) => ({
    listInfoPopupActions: bindActionCreators(listInfoPopupActions, dispatch)
  })
)(Popup2)