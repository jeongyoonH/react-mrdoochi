import React, { Component } from 'react';
import Alert from 'react-s-alert'
// import axios from 'axios';
import { connect } from 'react-redux';

import Blogexper from '../components/analysis/modules/Blogexper';
import Blogmanage from '../components/analysis/modules/Blogmanage';
import Cafeexper from '../components/analysis/modules/Cafeexper';
import BlogexperDetailInfo from '../components/analysis/modules/BlogexperDetailInfo';
import BlogmanageDetailInfo from '../components/analysis/modules/BlogmanageDetailInfo';
import BlogexperScreenshot from '../components/analysis/modules/BlogexperScreenshot';
import BlogmanageScreenshot from '../components/analysis/modules/BlogmanageScreenshot';
import front_logo from '../assets/images/front_logo.png'
import CafeexperDetailInfo from '../components/analysis/modules/CafeexperDetail';
import CafeexperScreenshot from '../components/analysis/modules/CafeexperScreenshot';
import Cafemanage from '../components/analysis/modules/Cafemanage';
import CafemanageDetailInfo from '../components/analysis/modules/CafemangeDetailInfo';
import CafemanageScreenshot from '../components/analysis/modules/CafemanageScreenshot';
import Facebookexper from '../components/analysis/modules/Facebookexper';
// import FacebookexperScreenshot from '../components/analysis/modules/FacebookexperScreenshot';
import Facebookmanage from '../components/analysis/modules/Facebookmanage';
import FacebookmanageDetailInfo from '../components/analysis/modules/FacebookmanageDetailInfo';
import FacebookmanageScreenshot from '../components/analysis/modules/FacebookmanageScreenshot';
import Paymarketing from '../components/analysis/modules/Paymarketing';
import Instaexper from '../components/analysis/modules/Instaexper';
// import InstaexperScreenshot from '../components/analysis/modules/InstaexperScreenshot';
import Exposure from '../components/analysis/modules/Exposure';
import Instamanage from '../components/analysis/modules/Instamanage';
import InstamanageDetailInfo from '../components/analysis/modules/InstamanageDetailInfo';
import InstamanageScreenshot from '../components/analysis/modules/InstamanageScreenshot';
import {getMarketingInfo} from '../components/analysis/modules/UtilMarketingInfo';
import {getAnalysis} from "../functions/getAnalysis";
import {getCompleteInfo} from "../components/analysis/modules/UtilCompleteInfo";



class Completereport extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			블로그체험단 : false,
			블로그운영대행 : false,
			카페운영대행: false,
			카페체험단: false,
			페이스북체험단: false,
			페이스북운영대행: false,
			인스타그램체험단: false,
			인스타그램운영대행: false,
			인스타그램광고대행: false,
			페이스북인스타그램광고대행: false,
			info: '',
			userInfo: '',
			info_result:false,
			addinfo:'',
			status:'',
			completedb:'',
			blog_experience:[],
			insta_experience:[],
			facebook_experience:[],
			
		}
	}
	initialAnalysis = async () => {
		
	
	}
	async componentDidMount(){
		if(sessionStorage.auth === undefined){
			Alert.info('로그인이 필요한 페이지 입니다!', {
				position: 'top-right',
				effect: 'slide'
			});
			this.props.history.push('/');
			
		}
		else {
			const username = JSON.parse(sessionStorage.auth).user.username;
			const name = this.props.match.params.name;
			let response = await getAnalysis(username, name);
			console.log(response)
			
			if( "Rival1" in response.data.analysis){
				this.setState({
					info_result:true,
					status:response.status
				});
			}
			const completedb = await getCompleteInfo(username, name, '');
			
			console.log("completedb")
			console.log(completedb)
			const addinfodb = await getMarketingInfo(username, name, '');
			console.log("addinfodb")
			console.log(addinfodb)
			this.setState({
				info: response.data.analysis,
				userInfo: response.userInfo,
				addinfo: addinfodb,
				completedb:completedb,
				blog_experience:[],
				insta_experience:[],
				facebook_experience:[],
			});
			if (addinfodb['marketingType']['블로그체험단'] === true){
				this.setState({블로그체험단: true})
			}
			if (addinfodb['marketingType']['블로그운영대행'] === true){
				this.setState({블로그운영대행: true})
			}
			if (addinfodb['marketingType']['카페운영대행'] === true){
				this.setState({카페운영대행: true})
			}
			if (addinfodb['marketingType']['카페체험단'] === true){
				this.setState({카페체험단: true})
			}
			if (addinfodb['marketingType']['페이스북체험단'] === true){
				this.setState({페이스북체험단: true})
			}
			if (addinfodb['marketingType']['페이스북운영대행'] === true){
				this.setState({페이스북운영대행: true})
			}
			if (addinfodb['marketingType']['인스타그램체험단'] === true){
				this.setState({인스타그램체험단: true})
			}
			if (addinfodb['marketingType']['인스타그램운영대행'] === true){
				this.setState({인스타그램운영대행: true})
			}
			if (addinfodb['marketingType']['인스타그램광고대행'] === true){
				this.setState({인스타그램광고대행: true})
			}
			if (addinfodb['marketingType']['페이스북인스타그램광고대행'] === true){
				this.setState({페이스북인스타그램광고대행: true})
			}
			
			
			
			
		}
	}
	
   

    render(){
	    const { info, userInfo,addinfo,completedb} = this.state;
	    console.log(info)
	    console.log(userInfo)
	    console.log(addinfo)
	    console.log(completedb)
	    // const phonFunc = () => {
		   //  let arr = []
		   //  arr.push((userInfo.phoneNumber).substr(0,3))
		   //  arr.push((userInfo.phoneNumber).substr(3,4))
		   //  arr.push((userInfo.phoneNumber).substr(7))
		   //  return arr.join('-')
	    // }
        // const {info} = this.props;
        return(
            <div>
                <div className="print_front contents">
                    <div className="logo_title">
                        <div className="logo_img"><img src={front_logo} alt="front_logo"/></div>
                        <div className="print_title">마케팅 완료 보고서</div>
                    </div>
                    <div className="print_bottom">
	                    <div className="print_service_name">{info ? info.myCompany.info.name : ''}</div>
	                    <div className="print_service_address">{info ? info.myCompany.info.location : ''}</div>
	                    <div className="print_table">
		                    <table>
			                    <tbody>
			                    <tr>
				                    <th>컨설턴트 이름</th>
				                    <td>{userInfo ? userInfo.user_name : ''}</td>
			                    </tr>
			                    <tr>
				                    <th>컨설턴트 연락처</th>
				                    <td>{userInfo ? userInfo.phoneNumber : ''}</td>
			                    </tr>
			                    <tr>
				                    <th>컨설턴트 이메일</th>
				                    <td>{userInfo ? userInfo.e_mail: ''}</td>
			                    </tr>
			                    </tbody>
		                    </table>
	                    </div>
                    </div>
                </div>
                <div className="title_line">
                    <h2 className="page_title analytics_page"><span>
                    {
                        info ? info.myCompany.info.name : ''
                        // "이모네 왕파전"
                    }</span></h2>
                    <div className="sub_title analytics_page"><span>
                    {
                        info ? info.myCompany.info.location : ''
                        // "부산광역시 영도구"
                    }</span></div>
                </div>
                <div className="contents">
                    {   
                        this.state.블로그체험단
                        &&
                        <div>
                            <Blogexper
	                            name={ this.props.match.params.name}
	                            info = {addinfo}
	                            userInfo={userInfo}
	                            addinfo={addinfo}
	                            completedb={completedb}

                            />
                            <BlogexperDetailInfo
	                            name={ this.props.match.params.name}
	                            info = {addinfo}
	                            userInfo={userInfo}
	                            addinfo={addinfo}
	                            completedb={completedb}
                            />
                            <div className="section_title">3. 블로그 컨텐츠 상위 노출 화면</div>
                            <div className="section_desc">운영중인 블로그가 상위에 노출된 실제 화면입니다.</div>
                            <BlogexperScreenshot
                                category={"pc"}
                                info = {addinfo}
                                completedb={completedb}
                            />
                            <BlogexperScreenshot
                                category={"mobile"}
                                info = {addinfo}
                                completedb={completedb}
                            />
                        </div>
                    }
                    {   
                        this.state.블로그운영대행
                        &&
                        <React.Fragment>
                            <Blogmanage/>
                            <BlogmanageDetailInfo/>
                            <div className="section_title">3. 블로그 컨텐츠 상위 노출 화면</div>
                            <div className="section_desc">운영중인 블로그가 상위에 노출된 실제 화면입니다.</div>
                            <BlogmanageScreenshot
                                category={"pc"}
                                info = {addinfo}
                                userInfo={userInfo}
                                addinfo={addinfo}
                                completedb={completedb}
                            />
                            <BlogmanageScreenshot
                            category={"mobile"}
                            info = {addinfo}
                            userInfo={userInfo}
                            addinfo={addinfo}
                            completedb={completedb}
                            />
                        </React.Fragment> 
                    }
                    {   
                        this.state.카페운영대행
                        &&
                        <React.Fragment>
                            <Cafemanage/>
                            <CafemanageDetailInfo/>
                            <div className="section_title">3. 블로그 콘텐츠 상위 노출 화면</div>
                            <div className="section_desc">운영중인 블로그가 상위에 노출된 실제 화면입니다.</div>
                            <CafemanageScreenshot
                                category={"pc"}
                                info={addinfo}
                            />
                            <CafemanageScreenshot
                                category={"mobile"}
                                info={addinfo}
                            />
                        </React.Fragment> 
                    }
                    {   
                        this.state.카페체험단
                        &&
                        <div>
                            <Cafeexper/>
                            <CafeexperDetailInfo/>
                            <div className="section_title">3. 블로그 컨텐츠 상위 노출 화면</div>
                            <div className="section_desc">운영중인 블로그가 상위에 노출된 실제 화면입니다.</div>
                            <CafeexperScreenshot
                                category={"pc"}
                                info = {addinfo}
                                userInfo={userInfo}
                                addinfo={addinfo}
                                completedb={completedb}
                            />
                            <CafeexperScreenshot
                                category={"mobile"}
                                info = {addinfo}
                                userInfo={userInfo}
                                addinfo={addinfo}
                                completedb={completedb}
                            />
                        </div>
                    }
                    {   
                        this.state.페이스북체험단
                        &&
                        <div>
                            <Facebookexper
	                            info = {addinfo}
	                            userInfo={userInfo}
	                            addinfo={addinfo}
	                            completedb={completedb}
                            />
                            {/*<div className="section_title">2. 콘텐츠 실제 화면</div>*/}
                            {/*<div className="section_desc">상위에 노출된 실제 화면입니다.</div>*/}
                            {/*<FacebookexperScreenshot*/}
                                {/*category={"Facebook"}*/}
                                {/*info = {addinfo}*/}
                                {/*userInfo={userInfo}*/}
                                {/*addinfo={addinfo}*/}
                                {/*completedb={completedb}*/}
                                {/*name={ this.props.match.params.name}*/}
                                {/**/}
                            {/*/>*/}
                        </div>
                    }
                    {   
                        this.state.인스타그램체험단
                        &&
                        <div>
                            <Instaexper
	                            info = {addinfo}
	                            userInfo={userInfo}
	                            addinfo={addinfo}
	                            completedb={completedb}
                            />
                            {/*<div className="section_title">2. 콘텐츠 실제 화면</div>*/}
                            {/*<div className="section_desc">상위에 노출된 실제 화면입니다.</div>*/}
                            {/*<InstaexperScreenshot*/}
                                {/*category={"Instagram"}*/}
                                {/*info = {addinfo}*/}
                                {/*userInfo={userInfo}*/}
                                {/*addinfo={addinfo}*/}
                                {/*completedb={completedb}*/}
                                {/*name={ this.props.match.params.name}*/}
                            
                            {/*/>*/}
                        </div>
                    }
                    {   
                        this.state.페이스북운영대행
                        &&
                        <React.Fragment>
                            <Facebookmanage/>
                            <FacebookmanageDetailInfo/>
                            <div className="section_title">3. 콘텐츠 실제 화면</div>
                            <div className="section_desc">상위에 노출된 실제 화면입니다.</div>
                            <FacebookmanageScreenshot
                                category={"Facebook"}
                                info={addinfo}
                            />
                            <div className="section_title">4. 유료 마케팅 집행</div>
                            <div className="section_desc">유료 집행한 마케팅 분석을 볼 수 있습니다.</div>
                            <Paymarketing
                                category={"Ads"}
                                info={addinfo}
                            />
                            <Exposure/>
                        </React.Fragment> 
                    }
                    {   
                        this.state.인스타그램운영대행
                        &&
                        <React.Fragment>
                            <Instamanage/>
                            <InstamanageDetailInfo/>
                            <div className="section_title">3. 콘텐츠 실제 화면</div>
                            <div className="section_desc">상위에 노출된 실제 화면입니다.</div>
                            <InstamanageScreenshot/>
                                category={"Facebook"}
                                info={addinfo}
                            />
                            <div className="section_title">4. 유료 마케팅 집행</div>
                            <div className="section_desc">유료 집행한 마케팅 분석을 볼 수 있습니다.</div>
                            <Paymarketing
                                category={"Ads"}
                                info={addinfo}
                            />
                            <Exposure/>
                        </React.Fragment> 
                    }
	                {
		                this.state.인스타그램광고대행
		                &&
		                <React.Fragment>
			                <Instamanage/>
			                <InstamanageDetailInfo/>
			                <div className="section_title">3. 콘텐츠 실제 화면</div>
			                <div className="section_desc">상위에 노출된 실제 화면입니다.</div>
			                <InstamanageScreenshot/>
			                category={"Facebook"}
			                info={addinfo}
			                />
			                <div className="section_title">4. 유료 마케팅 집행</div>
			                <div className="section_desc">유료 집행한 마케팅 분석을 볼 수 있습니다.</div>
			                <Paymarketing
				                category={"Ads"}
				                info={addinfo}
			                />
			                <Exposure/>
		                </React.Fragment>
	                }
	                {
		                this.state.페이스북인스타그램광고대행
		                &&
		                <div>
			                <Instamanage/>
			                <InstamanageDetailInfo/>
			                <div className="section_title">3. 콘텐츠 실제 화면</div>
			                <div className="section_desc">상위에 노출된 실제 화면입니다.</div>
			                <InstamanageScreenshot/>
			                category={"Facebook"}
			                info={addinfo}
			                />
			                <div className="section_title">4. 유료 마케팅 집행</div>
			                <div className="section_desc">유료 집행한 마케팅 분석을 볼 수 있습니다.</div>
			                <Paymarketing
				                category={"Ads"}
				                info={addinfo}
			                />
			                <Exposure/>
		                </div>
	                }
                </div>  
            </div>
        )
    }

}

export default connect(
	(state) => ({
		userState: state.auth.userState
	})
)(Completereport);
