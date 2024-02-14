import React, { Component } from 'react';
import thBlog from "../../../assets/images/th_blog.png";
import thFb from "../../../assets/images/th_fb.png";
import thInsta from "../../../assets/images/th_insta.png";

class ImpressionState extends Component {
    render(){
        let info = '';
        let arrayRate =  new Array(8)
        const activateKeyword = () => {
            if(this.props.info!==undefined){
                info = this.props.info;
                // console.log(info.myCompany)
                if (info !== '') {
                    const companyArr = ['naver', 'instagram', 'facebook','naver_mobile']
                    var index = 0;
                    for(let i = 0; i < 4; i++) {
                        for(let j = 2; j <= 3; j++) {
                            if (info.myCompany['keyword' + j.toString()].data[companyArr[i]].my_top10 > 0) arrayRate[index] = 'A'
                            else if (info.myCompany['keyword' + j.toString()].data[companyArr[i]].my_top50 > 0) arrayRate[index] = 'B'
                            else if (info.myCompany['keyword' + j.toString()].data[companyArr[i]].my_top100 > 0) arrayRate[index] = 'C'
                            else arrayRate[index] = 'D'
                            index++
                        }
                    }
                      for(let i = 0; i < 4; i++) {
                        for(let j = 2; j <= 3; j++) {
                          if (info.Rival1['keyword' + j.toString()].data[companyArr[i]].my_top10 > 0) arrayRate[index] = 'A'
                          else if (info.Rival1['keyword' + j.toString()].data[companyArr[i]].my_top50 > 0) arrayRate[index] = 'B'
                          else if (info.Rival1['keyword' + j.toString()].data[companyArr[i]].my_top100 > 0) arrayRate[index] = 'C'
                          else arrayRate[index] = 'D'
                          index++
                        }
                      }
	                for(let i = 0; i < 4; i++) {
		                for(let j = 2; j <= 3; j++) {
			                if (info.Rival2['keyword' + j.toString()].data[companyArr[i]].my_top10 > 0) arrayRate[index] = 'A'
			                else if (info.Rival2['keyword' + j.toString()].data[companyArr[i]].my_top50 > 0) arrayRate[index] = 'B'
			                else if (info.Rival2['keyword' + j.toString()].data[companyArr[i]].my_top100 > 0) arrayRate[index] = 'C'
			                else arrayRate[index] = 'D'
			                index++
		                }
	                }
	                for(let i = 0; i < 4; i++) {
		                for(let j = 2; j <= 3; j++) {
			                if (info.Rival3['keyword' + j.toString()].data[companyArr[i]].my_top10 > 0) arrayRate[index] = 'A'
			                else if (info.Rival3['keyword' + j.toString()].data[companyArr[i]].my_top50 > 0) arrayRate[index] = 'B'
			                else if (info.Rival3['keyword' + j.toString()].data[companyArr[i]].my_top100 > 0) arrayRate[index] = 'C'
			                else arrayRate[index] = 'D'
			                index++
		                }
	                }
                 
                }
            }
        }
        const listItem = (keyword, platform) => {
            let cssPlatform;
            let first_val = "10"
            let secon_val = "50"
            let third_val = "100"
            if (platform === 'naver' || platform === 'naver_mobile') {
	            first_val = "10"
              secon_val = "20"
              third_val = "30"
	            cssPlatform = 'blog'
             
            }
            
            else if (platform === 'instagram') {
                cssPlatform = 'insta'
            }
            else {
                cssPlatform = 'fb'
            }
            return (
                <td>
                    <div className="page"><span className={`badge badge_sm ${cssPlatform}_count`}>상위 {first_val}개</span> <span>게시글</span> <span className="page_count">
                    {info===''?'':info.myCompany[keyword].data[platform].my_top10}개</span></div>
                    <div className="page"><span className={`badge badge_sm ${cssPlatform}_count`}>상위 {secon_val}개</span> <span>게시글</span> <span className="page_count">
                    {info===''?'':info.myCompany[keyword].data[platform].my_top50}개</span></div>
                    <div className="page"><span className={`badge badge_sm ${cssPlatform}_count`}>상위 {third_val}개</span> <span>게시글</span> <span className="page_count">
                    {info===''?'':info.myCompany[keyword].data[platform].my_top100}개</span></div>
                </td>
            )
        }
        const gradePoint = (grade, platform) => {
            return (
                <td>
                    <div className={platform+"_grade_bg  grade_bg"}>
                        <span className='active'>
                            <div className="grade">{grade}</div>
                            <div className="grade_meta">등급</div>
                        </span>
                    </div>
                </td>
            )
        }
        return (
            <React.Fragment>
                {activateKeyword()}
                <div className="card">
                    <div className="card_header"><span>핵심 키워드별 상위 노출 상태</span></div>
                    <div className="card_body">
                        <table className="header_bg">
                            <thead>
                            <tr>
                                <th>채널</th>
                                <th>키워드</th>
                                <th>PC 노출 랭킹</th>
                                <th className="score_th">점수</th>
                                <th>Mobile 노출 랭킹</th>
                                <th className="score_th">점수</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td rowSpan="3" className="channel">
	                                <img src={thBlog} alt="blog_icon"></img><span>네이버 블로그</span>
                                </td>
                            </tr>
                            <tr>
                                <td>#{info===''?'':info.myCompany.keyword2.keyword_name}</td>
                                {listItem('keyword2', 'naver')}
                                {gradePoint(arrayRate[0], 'naver')}
                                {listItem('keyword2', 'naver_mobile')}
                                {gradePoint(arrayRate[6], 'naver')}
                            </tr>
                            <tr>
                                <td>#{info===''?'':info.myCompany.keyword3.keyword_name}</td>
                                {listItem('keyword3', 'naver')}
                                {gradePoint(arrayRate[1], 'naver')}
                                {listItem('keyword3', 'naver_mobile')}
                                {gradePoint(arrayRate[7], 'naver')}
                            </tr>
                            <tr>
                                <td rowSpan="3" className="channel">
	                                <img src={thInsta} alt="insta_icon"></img><span>인스타그램</span>
                                </td>
                            </tr>
                            <tr>
                                <td>#{info===''?'':info.myCompany.keyword2.keyword_name}</td>
                                {listItem('keyword2', 'instagram')}
                                {gradePoint(arrayRate[2], 'insta')}
                                {listItem('keyword2', 'instagram')}
                                {gradePoint(arrayRate[2], 'insta')}
                            </tr>
                            <tr>
                                <td>#{info===''?'':info.myCompany.keyword3.keyword_name}</td>
                                {listItem('keyword3', 'instagram')}
                                {gradePoint(arrayRate[3], 'insta')}
                                {listItem('keyword3', 'instagram')}
                                {gradePoint(arrayRate[3], 'insta')}
                            </tr>
                            <tr>
                                <td rowSpan="3" className="channel">
	                                <img src={thFb} alt="facebook_icon"></img><span>페이스북</span>
                                </td>
                            </tr>
                            <tr>
                                <td>#{info===''?'':info.myCompany.keyword2.keyword_name}</td>
                                {listItem('keyword2', 'facebook')}
                                {gradePoint(arrayRate[4], 'fb')}
                                {listItem('keyword2', 'facebook')}
                                {gradePoint(arrayRate[4], 'fb')}
                            </tr>
                            <tr>
                                <td>#{info===''?'':info.myCompany.keyword3.keyword_name}</td>
                                {listItem('keyword3', 'facebook')}
                                {gradePoint(arrayRate[5], 'fb')}
                                {listItem('keyword3', 'facebook')}
                                {gradePoint(arrayRate[5], 'fb')}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ImpressionState;