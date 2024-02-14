import React, { Component } from 'react';
import icon_edit from "../../../assets/images/icon_edit.png";
class ActivateKeywords extends Component {

	render() {
        let naver_ad = '';
        let naver_ad_arr = [];
        let naver_ad_state = [];
        const activateKeyword = () => {
            if(this.props.info!==''){
                naver_ad = this.props.info.myCompany.naver_ad;
                naver_ad_arr.push(this.props.info.myCompany.naver_ad.ad_keyword1)
                naver_ad_arr.push(this.props.info.myCompany.naver_ad.ad_keyword2)
                naver_ad_arr.push(this.props.info.myCompany.naver_ad.ad_keyword3)
                naver_ad_arr.push(this.props.info.myCompany.naver_ad.ad_keyword4)
                naver_ad_arr.push(this.props.info.myCompany.naver_ad.ad_keyword5)
	            
	            for(let i = 0; i<naver_ad_arr.length; ++i){
                naver_ad_state[i]=false
                if(Object.keys(naver_ad_arr[i]).length){
                  naver_ad_state[i]=true
                }
		              
	            }
            }
        }
        return (
            <React.Fragment>
                {activateKeyword()}
                <div className="card">
                    <div className="card_header"><span>키워드 활성화 정도</span></div>
                    <div className="card_body">
                        <table className="header_bg">
                            <thead>
                            <tr>
                                <th rowSpan="2">키워드</th>
                                <th colSpan="2">월간 검색 수</th>
                                <th colSpan="2">월 평균 클릭 수</th>
                                <th colSpan="2">월 평균 클릭률</th>
                                <th rowSpan="2">경쟁정도</th>
                                <th rowSpan="2">월 평균 노출 광고 수</th>
                            </tr>
                            <tr>
                                <th>PC</th>
                                <th>Mobile</th>
                                <th>PC</th>
                                <th>Mobile</th>
                                <th>PC</th>
                                <th>Mobile</th>
                            </tr>
                            </thead>
                            <tbody>
                            {naver_ad_state[0] === true &&
                              
		                            <tr>
			                            <td>
                                    <span className="badge tag i-edit">
                                    {naver_ad === '' ? "None" : naver_ad.ad_keyword1.keyword + ' '}
	                                    <img src={icon_edit} alt="icon_edit"/></span>
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.search_pc}
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.search_mobile}
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.nclick_pc}
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.nclick_mobile}
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.rclick_pc}
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.rclick_mobile}
			                            </td>
			                            <td className="rival_level">
				                            {naver_ad === '' ? 'none' : naver_ad.ad_keyword1.competition_degree}
			                            </td>
			                            <td>
				                            {naver_ad === '' ? 0 : naver_ad.ad_keyword1.ad_num}
			                            </td>
		                            </tr>
                            }
                            {naver_ad_state[1] === true &&
                            <tr>
	                            <td>
                                    <span className="badge tag i-edit">
                                    {naver_ad === '' ? "None" : naver_ad.ad_keyword2.keyword + ' '}
	                                    <img src={icon_edit} alt="icon_edit"/></span>
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.search_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.search_mobile}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.nclick_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.nclick_mobile}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.rclick_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.rclick_mobile}
	                            </td>
	                            <td className="rival_level">
		                            {naver_ad === '' ? 'none' : naver_ad.ad_keyword2.competition_degree}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword2.ad_num}
	                            </td>
                            </tr>
                            }
                            {naver_ad_state[2] === true &&
                            <tr>
                                <td>
                                    <span className="badge tag i-edit">
                                    { naver_ad===''?"None":naver_ad.ad_keyword3.keyword+' ' }
                                    <img src={icon_edit} alt="icon_edit"/></span>
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.search_pc }
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.search_mobile }
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.nclick_pc }
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.nclick_mobile }
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.rclick_pc }
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.rclick_mobile }
                                </td>
                                <td className="rival_level">
                                { naver_ad===''?'none':naver_ad.ad_keyword3.competition_degree }
                                </td>
                                <td>
                                { naver_ad===''?0:naver_ad.ad_keyword3.ad_num }
                                </td>
                            </tr>
                            }
                            {naver_ad_state[3] === true &&
                            <tr>
	                            <td>
                                    <span className="badge tag i-edit">
                                    {naver_ad === '' ? "None" : naver_ad.ad_keyword4.keyword + ' '}
	                                    <img src={icon_edit} alt="icon_edit"/></span>
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.search_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.search_mobile}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.nclick_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.nclick_mobile}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.rclick_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.rclick_mobile}
	                            </td>
	                            <td className="rival_level">
		                            {naver_ad === '' ? 'none' : naver_ad.ad_keyword4.competition_degree}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword4.ad_num}
	                            </td>
                            </tr>
                            }
                            {naver_ad_state[4] === true &&
                            <tr>
	                            <td>
                                    <span className="badge tag i-edit">
                                    {naver_ad === '' ? "None" : naver_ad.ad_keyword5.keyword + ' '}
	                                    <img src={icon_edit} alt="icon_edit"/></span>
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.search_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.search_mobile}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.nclick_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.nclick_mobile}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.rclick_pc}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.rclick_mobile}
	                            </td>
	                            <td className="rival_level">
		                            {naver_ad === '' ? 'none' : naver_ad.ad_keyword5.competition_degree}
	                            </td>
	                            <td>
		                            {naver_ad === '' ? 0 : naver_ad.ad_keyword5.ad_num}
	                            </td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ActivateKeywords;