import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import MarketingPrepareTemplate from './modules/MarketingPrepareTemplate';
// import * as GetAnalysis from '../lib/getAnalysis';
import { getAnalysis } from '../../functions/getAnalysis'

import KeywordAnalysis from './modules/KeywordAnalysis';
import ChannelAnalysis from './modules/ChannelAnalysis';
import front_logo from '../../assets/images/front_logo.png'
import pf_ic from '../../assets/images/pf_ic.png'
import pf_kbs from '../../assets/images/pf_kbs.png'
import pf_bb from '../../assets/images/pf_bb.png'
import pf_ss from '../../assets/images/pf_ss.png'
import pf_el from '../../assets/images/pf_el.png'
import pf_gv from '../../assets/images/pf_gv.png'
import pf_dn01 from '../../assets/images/pf_dn01.png'
import pf_dn02 from '../../assets/images/pf_dn02.png'
import price_basic from '../../assets/images/price_basic.png'
import price_adv from '../../assets/images/price_adv.png'
import price_prem from '../../assets/images/price_prem.png'
import table_y from '../../assets/images/table_y.png'
import table_n from '../../assets/images/table_n.png'
import info_blog from '../../assets/images/info_blog.png'
import info_fb from '../../assets/images/info_fb.png'
import info_insta from '../../assets/images/info_insta.png'
import dc_01 from '../../assets/images/dc_01.png'
import dc_02 from '../../assets/images/dc_02.png'
import dc_03 from '../../assets/images/dc_03.png'
import dc_04 from '../../assets/images/dc_04.png'
import dc_05 from '../../assets/images/dc_05.png'
import dc_06 from '../../assets/images/dc_06.png'
import dc_07 from '../../assets/images/dc_07.png'
import pf_blog from '../../assets/images/pf_blog.png'

class AnalysisComponet extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: '',
            userInfo: '',
	          info_result:false,
	          status:''
        }
    }
    initialAnalysis = async () => {
    	
	    let response = await getAnalysis(JSON.parse(sessionStorage.auth).user.username, this.props.match.params.name);
	    console.log("response")
	    console.log(JSON.parse(sessionStorage.auth).user.username)
	    console.log(this.props.match.params.name)
	    console.log(response)
	    this.setState({
		    info: response.data.analysis,
		    userInfo: response.data.userInfo,
	    });
	    if( "Rival1" in response.data.analysis){
		    this.setState({
			    info_result:true,
			    status:response.status
		    });
	    }
	    
    }
    componentDidMount(){
        if(sessionStorage.auth === undefined){
            Alert.info('로그인이 필요한 페이지 입니다!', {
                position: 'top-right',
                effect: 'slide'
            });
            this.props.history.push('/');
            
        }
        else this.initialAnalysis();
    }
    render(){
        const { info, userInfo } = this.state;
        const phonFunc = () => {
            let arr = []
            arr.push((userInfo.phoneNumber).substr(0,3))
            arr.push((userInfo.phoneNumber).substr(3,4))
            arr.push((userInfo.phoneNumber).substr(7))
            return arr.join('-')
        }
        return(
            <div>
	            {this.state.info_result !== true ?
		            
		            	this.state.status !=='' ? <div>영업 리포트가 존재하지 않습니다</div> :
			            <div></div>
		            :
		            <div>
                <div className="print_front contents">
                    <div className="logo_title">
                        <div className="logo_img"><img src={front_logo} alt="front_logo"/></div>
                        <div className="print_title">마케팅 분석 레포트</div>
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
                                    <td>{userInfo ? phonFunc() : ''}</td>
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
		                    }</span></h2>
			            <div className="sub_title analytics_page"><span>
		                    {
			                    info ? info.myCompany.info.location : ''
		                    }</span></div>
		            </div>
	            <div className="contents">
		            <MarketingPrepareTemplate
			            info={info}
		            />
		            <ChannelAnalysis
			            info={info}
		            />
		            <KeywordAnalysis
			            info={info}
		            />
	            </div>
	            <div className="print_doochi contents">
		            <div className="section">
			            <img src={dc_01} alt="sectionImg"/>
		            </div>
	            </div>
	            <div className="print_flow contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">미스터 두치 온라인 마케팅 인공지능 시스템</div>
			            <div className="section_desc">중소기업청 기술개발사업을 통해 개발된 미스터 두치에서만 경험할 수 있는 인공지능 마케팅 솔루션</div>
			            <div className="row">
				            <img src={dc_02} alt="img"/>
			            </div>
			            <div className="top_border mt-p"></div>
			            <div className="section_title">미스터 두치 특허기술</div>
			            <div className="section_desc">미스터 두치 믿을 수 있는 이유, 보유 기술력 특허</div>
			            <div className="row">
				            <img src={dc_03} alt="img"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_marketing contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">디지털 마케팅 최적화</div>
			            <div className="section_desc">미스터 두치만의 디지털 마케팅 최적화 방법을 소개합니다.</div>
			            <div className="row">
				            <img src={dc_04} alt="img"/>
			            </div>
			            <div className="top_border mt-p"></div>
			            <div className="section_title">디지털 마케팅 최적화 후 산출 자료</div>
			            <div className="section_desc">미스터 두치 서비스 이용 후 놀라운 변화를 눈으로 확인하세요.</div>
			            <div className="row">
				            <img src={dc_05} alt="img"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_prove contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">디지털 마케팅 최적화 후 산출 자료</div>
			            <div className="section_desc">미스터 두치 서비스 이용 후 놀라운 변화를 눈으로 확인하세요.</div>
			            <div className="row">
				            <img src={dc_06} alt="img"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_portfolio contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">포트폴리오</div>
			            <div className="section_desc">미스터 두치가 마케팅에 날개를 달아드리겠습니다.</div>
			            <div className="row">
				            <div className="row-3">
					            <div className="card">
						            <div className="card_header"><span>페이스북 마케팅</span></div>
						            <div className="card_body">
							            <div className="row">
								            <div className="row-4-4 column">
									            <img src={pf_kbs} alt="pf_kbs"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_ss} alt="pf_ss"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_ic} alt="pf_ic"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_bb} alt="pf_bb"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_el} alt="pf_el"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_gv} alt="pf_gv"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_dn01} alt="pf_dn01"/>
								            </div>
								            <div className="row-4-4 column">
									            <img src={pf_dn02} alt="pf_dn02"/>
								            </div>
							            </div>
						            </div>
					            </div>
				            </div>
			            </div>
			            <div className="row">
				            <div className="row-3">
					            <div className="card">
						            <div className="card_header"><span>네이버 블로그 마케팅</span></div>
						            <div className="card_body">
							            <img src={pf_blog} alt="img"/>
						            </div>
					            </div>
				            </div>
			            </div>
		            </div>
	            </div>
	            <div className="print_blog print_info contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">네이버 블로그 마케팅</div>
			            <div className="section_desc">
				            <p>사람들은 심리학적으로 확실하지 않은 상황에서 다수의 결정을 따라하고 신뢰합니다.</p>
				            <p>네이버 블로그에는 <span>블로거들의 경험을 통한 후기와 추천 콘텐츠가 많기 때문에 사람들이 정보를 찾는 과정에서 가장 많이 이용</span>합니다.
					            인스타그램의 영향으로 블로그도 감성을 중시하게 되면서 젊은층이 많이 유입되고 있습니다.</p>
			            </div>
			            <div className="row">
				            <img src={info_blog} alt="info_blog"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_fb print_info contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">페이스북 마케팅</div>
			            <div className="section_desc">
				            <p><span>전세계 11억명, 국내 1,600만명 이상의 사용자를 보유</span>하고 있는 거대한 소셜 네트워크인 페이스북.</p>
				            <p>페이스북 사용자들은 브랜드나 관심 있는 콘텐츠들에 ‘좋아요’ 버튼이나 ‘공유하기’ 등을 통해 관심을 드러내고 본인을 나타내고자 합니다. 좋은 브랜딩과 충성도 높은 고객을
					            유치하기에 적합한 마케팅입니다.</p>
			            </div>
			            <div className="row">
				            <img src={info_fb} alt="info_fb"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_insta print_info contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">인스타그램 마케팅</div>
			            <div className="section_desc">
				            <p>인스타그램은 <span>월간 ‘실’사용자 6억명, 콘텐츠 참여율이 가장 높은 SNS</span>입니다.</p>
				            <p>단 한장의 사진이 글보다 강력한 효과를 준다는 사실은 유명합니다. 인스타그램은 사진 기반형 SNS로서, 간단하지만 직관적으로 구매자들에게 동기를 부여합니다.</p>
			            </div>
			            <div className="row">
				            <img src={info_insta} alt="info_insta"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_price contents">
		            <div className="section">
			            <div className="top_border"></div>
			            <div className="section_title">가격정책</div>
			            <div className="section_desc">미스터 두치가 마케팅에 날개를 달아드리겠습니다.</div>
			            <div className="row">
				            <div className="price_table">
					            <table>
						            <thead>
						            <tr>
							            <th></th>
							            <th>
								            <img src={price_basic} alt="pice_base"/>
								            <div className="price_table_tit">BASIC</div>
							            </th>
							            <th>
								            <img src={price_adv} alt="price_adb"/>
								            <div className="price_table_tit">ADVANCED</div>
							            </th>
							            <th>
								            <img src={price_prem} alt="price_prem"/>
								            <div className="price_table_tit">PREMIUM</div>
							            </th>
						            </tr>
						            </thead>
						            <tbody>
						            <tr>
							            <th>
								            <div className="cont_tit">가격</div>
								            <div className="cont_desc">월별 가격 안내</div>
							            </th>
							            <td><span>150,000원</span> / 월</td>
							            <td><span>300,000원</span> / 월</td>
							            <td><span>500,000원</span> / 월</td>
						            </tr>
						            <tr>
							            <th>
								            <div className="cont_tit">네이버 블로그 체험단</div>
								            <div className="cont_desc">네이버 블로그 체험단 포스팅</div>
							            </th>
							            <td><span>5건</span></td>
							            <td><span>11건</span></td>
							            <td><span>22건</span></td>
						            </tr>
						            <tr>
							            <th>
								            <div className="cont_tit">인플루언서 마케팅 (페이스북)</div>
								            <div className="cont_desc">인플루언서를 활용한 페이스북 마케팅</div>
							            </th>
							            <td><span>3건</span></td>
							            <td><span>6건</span></td>
							            <td><span>10건</span></td>
						            </tr>
						            <tr>
							            <th>
								            <div className="cont_tit">인플루언서 마케팅 (인스타그램)</div>
								            <div className="cont_desc">인플루언서를 활용한 인스타그램 마케팅</div>
							            </th>
							            <td><span>3건</span></td>
							            <td><span>6건</span></td>
							            <td><span>10건</span></td>
						            </tr>
						            <tr>
							            <th>
								            <div className="cont_tit">인플루언서 마케팅 (카카오스토리)</div>
								            <div className="cont_desc">인플루언서를 활용한 카카오스토리 마케팅</div>
							            </th>
							            <td><img src={table_n} alt="table_n"/></td>
							            <td><img src={table_n} alt="table_n"/></td>
							            <td><span>10건</span></td>
						            </tr>
						            <tr>
							            <th>
								            <div className="cont_tit">인플루언서 마케팅 동영상</div>
								            <div className="cont_desc">인플루언서를 활용한 동영상 마케팅</div>
							            </th>
							            <td><img src={table_n} alt="table_n"/></td>
							            <td><img src={table_n} alt="table_n"/></td>
							            <td><img src={table_y} alt="table_y"/></td>
						            </tr>
						            </tbody>
					            </table>
					            <div className="best_label">제일 인기!</div>
				            </div>
			            </div>
		            </div>
	            </div>
	            <div className="print_last content">
		            <div className="section">
			            <div className="row">
				            <img src={dc_07} alt="img"/>
			            </div>
		            </div>
	            </div>
	            <div className="print_footer"></div>
		            </div>
	            }
            </div>
        )
    }
}

export default connect(
    (state) => ({
      userState: state.auth.userState
    })
)(AnalysisComponet);
