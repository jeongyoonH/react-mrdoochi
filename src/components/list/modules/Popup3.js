/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listInfoPopupActions from '../../../store/modules/listInfoPopup';
import icon_plus from '../../../assets/images/icon_plus_w.png'
import icon_minus from '../../../assets/images/icon_close.png'
// import {getPopupInfo} from "../../../functions/UtilPopupInfo";
// import * as config from "../../../store/config/config";

class Popup3 extends Component {
		async componentDidMount () {
			const {  initMarketingInfoList } = this.props.listInfoPopupActions
			// console.log(blog_experience);
			initMarketingInfoList()

		}
    handleAdd = (type) => e => {
        e.preventDefault();
        const { addInfo } = this.props.listInfoPopupActions
        
        addInfo(type)
    }
    handleDel = (type, i) => e => {
      e.preventDefault();
      const { delInfo } = this.props.listInfoPopupActions
	    const options = {
		    type: type,
		    index: i
	    }
      delInfo(options)
    }
    render () {
        const { handleAdd } = this
        const { handleDel } = this
        const { marketingType, marketingInfoList} = this.props
        const { handleInfoListInput } = this.props.listInfoPopupActions

        // this.props.marketingInfoList.blogExperienceList=[]
        // this.props.marketingInfoList.blogManageList=[]
        // this.props.marketingInfoList.cafeExperienceList=[]
        // this.props.marketingInfoList.cafeManageList=[]
        // this.props.marketingInfoList.facebookExperienceList=[]
        // this.props.marketingInfoList.facebookManageList=[]
        // this.props.marketingInfoList.instaExperienceList=[]
        // this.props.marketingInfoList.instaManageList=[]

        // console.log("1 " + marketingInfoList);
        // console.log("2 " + marketingInfoList.blog_experience);
        const blogExperienceList = marketingInfoList.blog_experience.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                  <span className="del_mk" onClick={handleDel('BLOG_EXPERIENCE',item.index)}><img src={icon_minus}/></span>
                    <div className="ck_contents_form">
                        <label>네이버 아이디</label>
                        <input
                            type="text"
                            placeholder="네이버 아이디를 작성해 주세요."
                            name={`blog_experience/id/${index}`}
                            value={item.id}
                            onChange={handleInfoListInput}/>
                    </div>
                </div>
            )
        });
        const blogManageList = marketingInfoList.blog_manage.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                  <span className="del_mk" onClick={handleDel('BLOG_MANAGE',index)}><img src={icon_minus}/></span>
                    <div className="ck_contents_form">
                        <label>네이버 아이디</label>
                        <input
                            type="text"
                            placeholder="네이버 아이디를 작성해 주세요."
                            name={`blog_manage/id/${index}`}
                            value={item.id}
                            onChange={handleInfoListInput}/>
                    </div>
                </div>
            )
        });
        const cafeExperienceList = marketingInfoList.cafe_experience.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                  <span className="del_mk" onClick={handleAdd('CAFE_EXPERIENCE')}><img src={icon_minus}/></span>
                    <div className="ck_contents_form">
                        <label>네이버 카페 닉네임</label>
                        <input
                            type="text"
                            placeholder="카페 닉네임을 작성해 주세요."
                            name={`cafe_experience/id/${index}`}
                            value={item.id}
                            onChange={handleInfoListInput}/>
                    </div>
                    <div className="ck_contents_form">
                        <label>카페 URL</label>
                        <input
                            type="text"
                            placeholder="카페 URL을 작성해 주세요."
                            name={`cafe_experience/url/${index}`}
                            value={item.url}
                            onChange={handleInfoListInput}/>
                    </div>
                </div>
            )
        });
        const cafeManageList = marketingInfoList.cafe_manage.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                <span className="del_mk" onClick={handleAdd('CAFE_MANAGE')}><img src={icon_minus}/></span>
	                <div className="ck_contents_form">
		                <label>카페 URL</label>
		                <input
			                type="text"
			                placeholder="카페 URL을 작성해 주세요."
			                name={`cafe_manage/url/${index}`}
			                value={item.url}
			                onChange={handleInfoListInput}/>
	                </div>
                </div>
            )
        });
        const facebookExperienceList = marketingInfoList.facebook_experience.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                <span className="del_mk" onClick={handleAdd('FACEBOOK_EXPERIENCE')}><img src={icon_minus}/></span>
	                <div className="ck_contents_form">
                        <label>페이스북 실명</label>
                        <input
                            type="text"
                            placeholder="페이스북 가입된 실명을 입력해 주세요"
                            name={`facebook_experience/url/${index}`}
                            value={item.url}
                            onChange={handleInfoListInput}/>
                    </div>
                </div>
            )
        });
        const facebookManageList = marketingInfoList.facebook_manage.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                <span className="del_mk" onClick={handleAdd('FACEBOOK_MANAGE')}><img src={icon_minus}/></span>

                    <div className="ck_contents_form">
                        <label>페이스북 페이지 url</label>
                        <input
                            type="text"
                            placeholder="페이지 url을 입력해 주세요"
                            name={`facebook_manage/url/${index}`}
                            value={item.url}
                            onChange={handleInfoListInput}/>
                    </div>
                </div>
            )
        });
        const instaExperienceList = marketingInfoList.insta_experience.map((item, index) => {
          return (
            <div className="ck_contents" key={index}>
              <span className="del_mk" onClick={handleAdd('INSTA_EXPERIENCE')}><img src={icon_minus}/></span>

              <div className="ck_contents_form">
                <label>인스타그램 아이디</label>
                <input
                  type="text"
                  placeholder="인스타그램 아이디를 입력해 주세요"
                  name={`insta_experience/url/${index}`}
                  value={item.url}
                  onChange={handleInfoListInput}/>
              </div>
            </div>
          )
        });
        const instaManageList = marketingInfoList.insta_manage.map((item, index) => {
            return (
                <div className="ck_contents" key={index}>
	                <span className="del_mk" onClick={handleAdd('INSTA_MANAGE')}><img src={icon_minus}/></span>
	                
                    <div className="ck_contents_form">
                        <label>운영 계정 아이디</label>
                        <input
                            type="text"
                            placeholder="인스타그램 아이디를 입력해 주세요"
                            name={`insta_manage/url/${index}`}
                            value={item.url}
                            onChange={handleInfoListInput}/>
                    </div>
                </div>
            )
        });
	    // const facebookInstaAds = marketingInfoList.facebook_insta_ads.map((item, index)=> {
		   //  return (
			 //    <div className="ck_contents" key={index}>
				//     <span className="del_mk" onClick={handleAdd('FACEBOOK_INSTA_ADS')}><img src={icon_minus}/></span>
	    //
				//     <div className="ck_contents_form">
				// 	    <label>운영 계정 URL</label>
				// 	    <input
				// 		    type="text"
				// 		    placeholder="링크를 입력해 주세요"
				// 		    name={`facebook_insta_ads/url/${index}`}
				// 		    value={item.url}
				// 		    onChange={handleInfoListInput}/>
				//     </div>
			 //    </div>
		   //  )
	    // });
	    
        return (
          <div className="popup_box_body">
            <div className="row">
                <form>
                    <div className="form_group">
                        <div className="form_title">마케팅 유형 선택</div>
                        {
                            marketingType.블로그체험단
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c01" checked={marketingType.블로그체험단} readOnly/>
                                <label htmlFor="c01">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">블로그 체험단 <span>{`(${marketingInfoList.blog_experience.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('BLOG_EXPERIENCE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {blogExperienceList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.블로그운영대행
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c02" checked={marketingType.블로그운영대행} readOnly/>
                                <label htmlFor="c02">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">블로그 운영대행 <span>{`(${marketingInfoList.blog_manage.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('BLOG_MANAGE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {blogManageList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.카페운영대행
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c03" checked={marketingType.카페운영대행} readOnly/>
                                <label htmlFor="c03">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">카페 운영 대행 <span>{`(${marketingInfoList.cafe_manage.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('CAFE_MANAGE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {cafeManageList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.카페체험단
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c04" checked={marketingType.카페체험단} readOnly/>
                                <label htmlFor="c04">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">카페 침투 마케팅 <span>{`(${marketingInfoList.cafe_experience.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('CAFE_EXPERIENCE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {cafeExperienceList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.페이스북체험단
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c05" checked={marketingType.페이스북체험단} readOnly/>
                                <label htmlFor="c05">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 인플루언서<span>{`(${marketingInfoList.facebook_experience.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('FACEBOOK_EXPERIENCE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {facebookExperienceList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.페이스북운영대행
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c06" checked={marketingType.페이스북운영대행} readOnly/>
                                <label htmlFor="c06">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 페이지 운영 대행<span>{`(${marketingInfoList.facebook_manage.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('FACEBOOK_MANAGE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {facebookManageList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.인스타그램체험단
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c07" checked={marketingType.인스타그램체험단} readOnly/>
                                <label htmlFor="c07">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">인스타그램 인플루언서<span>{`(${marketingInfoList.insta_experience.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('INSTA_EXPERIENCE')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                { <div className="ck_contents_wrap">
                                    {instaExperienceList}
                                </div> }
                            </div>
                        }
                        {
                            marketingType.인스타그램운영대행
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c08" checked={marketingType.인스타그램운영대행} readOnly/>
                                <label htmlFor="c08">
	                                <div className="ck_bx">
		                                <span className="ck_bx_shape"></span> <span className="ck_bx_text">인스타그램 운영 대행<span>{`(${marketingInfoList.insta_experience.length})`}</span></span>
		                                <span className="add_mk" onClick={handleAdd('INSTA_MANAGE')}><img src={icon_plus}/></span>
	                                </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {instaManageList}
                                </div>
                            </div>
                        }
	                    {
		                    // marketingType.페이스북인스타그램광고대행
		                    // &&
		                    // <div className="check_wrap">
			                   //  <input type="checkbox" id="c09" checked={marketingType.페이스북인스타그램광고대행} readOnly/>
			                   //  <label htmlFor="c09">
				                 //    <div className="ck_bx">
					               //      <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 인스타그램 광고 대행
					               //      <span>0</span>
					               //      {/*<span>{`(${marketingInfoList.facebook_insta_ads.length})`}</span>*/}
				                 //    </span>
					               //      <span className="add_mk" onClick={handleAdd('FACEBOOK_INSTA_ADS')}><img src={icon_plus}/></span>
				                 //    </div>
			                   //  </label>
			                   //  { <div className="ck_contents_wrap">
				                 //    {/*{facebookInstaAds}*/}
			                   //  </div> }
		                    // </div>
	                    }
                        {/* {
                            marketingType.페이스북인스타그램피드작성
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c05" checked={marketingType.페이스북인스타그램피드작성} readOnly/>
                                <label htmlFor="c05">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 or 인스타그램 피드작성<span>{`(${marketingInfoList.blogList.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('FACEBOOKINSTA')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {facebookInstagramList}
                                </div>
                            </div>
                        }
                        {
                            marketingType.페이스북인스타그램운영
                            &&
                            <div className="check_wrap">
                                <input type="checkbox" id="c06" checked={marketingType.페이스북인스타그램운영} readOnly/>
                                <label htmlFor="c06">
                                    <div className="ck_bx">
                                        <span className="ck_bx_shape"></span> <span className="ck_bx_text">페이스북 or 인스타그램 운영<span>{`(${marketingInfoList.blogList.length})`}</span></span>
                                        <span className="add_mk" onClick={handleAdd('FACEBOOKINSTA')}><img src={icon_plus}/></span>
                                    </div>
                                </label>
                                <div className="ck_contents_wrap">
                                    {facebookInstagramList}
                                </div>
                            </div>
                        } */}
                    </div>
                </form>
            </div>
        </div>
        )
    }
}
export default connect (
    (state) => ({
        marketingType: state.listInfoPopup.marketingType,
        marketingInfoList: state.listInfoPopup.marketingInfoList
    }),
    (dispatch) => ({
        listInfoPopupActions: bindActionCreators(listInfoPopupActions, dispatch)
    })
)(Popup3)
