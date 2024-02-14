/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import thFb from '../../../assets/images/th_fb.png';
import thBlog from '../../../assets/images/th_blog.png';
import thInsta from '../../../assets/images/th_insta.png';
import {getCompleteInfo} from "./UtilCompleteInfo";

class BlogexperDetailInfo extends Component {
    state = {
        arrayF: [],
        arrayI: [],
	    completedb:'',
	    landing_page_info:[],
	    landing_mob_page_info:[],
	    landing_numberth_info:[],
	    landing_mob_numberth_info:[],
      url:[],
      user_id:[],
      title:[],
    }
    async componentDidMount () {
        this.initFunc()
	      // console.log(this.props.completedb)
	      // const username = JSON.parse(sessionStorage.auth).user.username;
	      // const name = this.props.name;
	      // const completedb = await getCompleteInfo(username, name, '');
        const {info,completedb} = this.props;
        console.log(info)
        console.log(completedb)
        if (completedb != null){
          this.setState({
            landing_page_info:completedb['marketingType']['blog_experience']['landing_page_info'],
            landing_mob_page_info:completedb['marketingType']['blog_experience']['landing_mob_page_info'],
            landing_numberth_info:completedb['marketingType']['blog_experience']['landing_numberth_info'],
            landing_mob_numberth_info:completedb['marketingType']['blog_experience']['landing_mob_numberth_info'],
            url:completedb['marketingType']['blog_experience']['url'],
            user_id:completedb['marketingType']['blog_experience']['naver_id'],
            title:completedb['marketingType']['blog_experience']['title']
          });
        }
		   //  let completedb_arr = []
		   //  for (let i = 0; i < this.props.completedb['marketingType']['blog_experience']['naver_id'].length; i++) {
			 //    completedb_arr.append
			 //    this.setState({
				//     naver_id: completedb['marketingType']['blog_experience']['naver_id'][i],
				//     title : completedb['marketingType']['blog_experience']['title'][i],
				//     date : completedb['marketingType']['blog_experience']['date'][i],
				//     url : completedb['marketingType']['blog_experience']['url'][i],
				//     landing_sum_date : 0,//this.state.date + completedb['marketingType']['blog_experience']['date'][i],
				//     new_contents_count:this.state.new_contents_count + 1
			 //    })
		   //  }
	    // }
	
    
	   
    }
    /* info = ''
    n1 = 0
    n2 = 0
    n3 = 0
    n4 = 0
    arrayF = new Array(4)
    arrayI = new Array(4)
    */
    initFunc = () => {
        /* let { info, arrayF, arrayI } = this
        if(this.props.info !== ''){
            info = this.props.info;
            const n1_ = info.myCompany.info.review;
            const n2_= info.Rival1.info.totalReviewCount.replace(',','') * 1;
            const n3_= info.Rival2.info.totalReviewCount.replace(',','') * 1;
            const n4_= info.Rival3.info.totalReviewCount.replace(',','') * 1;
            if(n1_+n2_+n3_+n4_ !== 0){
                this.n1 = Math.round(n1_ / (n1_+n2_+n3_+n4_) * 100)
                this.n2 = Math.round(n2_ / (n1_+n2_+n3_+n4_) * 100)
                this.n3 = Math.round(n3_ / (n1_+n2_+n3_+n4_) * 100)
                this.n4 = Math.round(n4_ / (n1_+n2_+n3_+n4_) * 100)
            }
            
            const platFormArray = ['facebook', 'instagram']
            const companyArray = ['myCompany', 'Rival1', 'Rival2', 'Rival3']
            const topArray = ['10', '50', '100']
            let dataArray = ['my', 'rival1', 'rival2', 'rival3']
            
            platFormArray.map(platform => {
                companyArray.map((company, index) => {
                    let j;
                    for (j = 0; j < 3; j++){
                        let count = 0;
                        for (let i = 0; i < 3; i++){
                            count += info[company]['keyword' + String(i + 1)].data[platform][dataArray[index] + '_top' + topArray[j]];
                        }
                        if (platform === 'facebook' && count > 0) {
                            if (j === 0) arrayF[index] = 'A'
                            else if (j === 1) arrayF[index] = 'B'
                            else if (j === 2) arrayF[index] = 'C'
                            break;
                        }
                        else if (platform === 'instagram' && count > 0) {
                            if (j === 0) arrayI[index] = 'A'
                            else if (j === 1) arrayI[index] = 'B'
                            else if (j === 2) arrayI[index] = 'C'
                            break;                          
                        }
                    }
                    if (j === 3) {
                        if (platform === 'facebook') arrayF[index] = 'C'
                        else arrayI[index] = 'C'
                    }
                })
            })
        }
        this.setState({
            arrayF: arrayF,
            arrayI: arrayI
        })*/
    }
    description = (rank) => {
        if (rank === 'A') {
            return '상위 10개 이내에 게시물이 있습니다.'
        }
        else if (rank === 'B') {
            return '상위 50개 이내에 게시물이 있습니다.'
        }
        else if (rank === 'C') {
            return '상위 100개 이내에 게시물이 있습니다.'
        }
        else {
            return '최근 게시물이 없습니다.'
        }
    }
    render () {
        let { info } = this.props
        const { description, n1, n2, n3, n4 } = this
        const { arrayF, arrayI,landing_page_info,landing_mob_page_info,landing_numberth_info,landing_mob_numberth_info,url,user_id,title } = this.state
        const facebookGrade = arrayF.map(
            (item, index) => {
                return (
                    <td key = {index}>
                        <div className="grade_wrap">
                            <span className={item === 'A' ? 'active' : ''}>
                                <div className="grade">A</div>
                                <div className="grade_meta">등급</div>
                            </span>
                            <span className={item === 'B' ? 'active' : ''}>
                                <div className="grade">B</div>
                                <div className="grade_meta">등급</div>
                            </span>
                            <span className={item === 'C' ? 'active' : ''}>
                                <div className="grade">C</div>
                                <div className="grade_meta">등급</div>
                            </span>
                        </div>
                        <div className="grade_info">
                            <span>{description(item)}</span>
                        </div>
                    </td>
                )
            }
        )
        const instagramGrade = arrayI.map(
            (item, index) => {
                return (
                    <td key={index}>
                        <div className="grade_wrap">
                        <span className={item === 'A' ? 'active' : ''}>
                            <div className="grade">A</div>
                            <div className="grade_meta">등급</div>
                        </span>
                        <span className={item === 'B' ? 'active' : ''}>
                            <div className="grade">B</div>
                            <div className="grade_meta">등급</div>
                        </span>
                        <span className={item === 'C' ? 'active' : ''}>
                            <div className="grade">C</div>
                            <div className="grade_meta">등급</div>
                        </span>
                        </div>
                        <div className="grade_info">
                            <span>{description(item)}</span>
                        </div>
                    </td>
                )
            }
        )
	    // const pageInfo = landing_page_info.map(
		   //  (item, index) => {
			 //    return (
				//     <td>
				// 	    <h3>{item}페이지 {landing_numberth_info[index]}페이지</h3>
				//     </td>
			 //    )
		   //  }
	    // )
	    // const pagemobInfo = landing_mob_page_info.map(
		   //  (item, index) => {
			 //    return (
				//     <td>
				// 	    <h3>{item}페이지 {landing_mob_numberth_info[index]}페이지</h3>
				//     </td>
			 //    )
		   //  }
	    // )
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title">2. 상세 정보</div>
                <div className="section_desc">블로그 체험단의 포스팅 제목과 노출 등수입니다.</div>
                <div className="row"/>
            </div>
            <div className="card2">
                   {/*<div className="card_header"><span>경쟁사 채널 정보</span></div>*/}
                    <div className="card_body">
                        <table className="no_bg">
                            <thead>
                            <tr>
                              <th><span>{"최대 노출 페이지"}</span></th>
                              <th><span>{"제목"}</span></th>
                              <th><span>{"URL"}</span></th>
                              <th><span>{"작성"}</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            
                                {/*<td><img src={thBlog} alt="blog_icon"></img><span>네이버 블로그</span></td>*/}
                              {landing_page_info !=null && user_id.map(
	                              (item, index) => {
		                              return (
		                                <tr className="blog_pr">
                                        <td>
                                          <h3>pc {landing_page_info[index]}페이지 {landing_numberth_info[index]}번째</h3>
                                        </td>
                                        <td>
                                        <h3>{title[index]}</h3>
                                        </td>
                                        <td>
                                        <h3>{url[index]}</h3>
                                        </td>
                                        <td>
                                            <h3>{item}</h3>
                                        </td>
                                    </tr>
		                              )
	                              }
                              )}
                              {landing_mob_page_info !=null && user_id.map(
	                            (item, index) => {
	                            return (
		                            <tr className="blog_pr">
	                            <td>
                                <h3>mobile {landing_mob_page_info[index]}페이지 {landing_mob_numberth_info[index]}번째</h3>
                                </td>
                              <td>
		                            <h3>{title[index]}</h3>
	                            </td>
		                            <td>
			                            <h3>{url[index]}</h3>
		                            </td>
		                            <td>
		                            <h3>{item}</h3>
	                            </td>
                                </tr>
	                            )
                            }
	                            )}
                            {/*<tr className="blog_pr">*/}
                                {/*<td>*/}
                                    {/*<h3>1번째 1페이지</h3>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                    {/*<h3>1번째 1페이지</h3>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                    {/*<h3>1번째 1페이지</h3>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                    {/*<h3>1번째 1페이지</h3>*/}
                                {/*</td>*/}
                            {/*</tr>*/}
                            {/*<tr className="blog_pr">*/}
	                            {/*{ this.props.completedb['marketingType']['blog_experience']['landing_mob_page_info'].map(*/}
		                            {/*(item, index) => {*/}
			                            {/*return (*/}
				                            {/*<td>*/}
					                            {/*<h3>{item}페이지 {this.props.completedb['marketingType']['blog_experience']['landing_mob_numberth_info'][index]}페이지</h3>*/}
				                            {/*</td>*/}
			                            {/*)*/}
		                            {/*}*/}
	                            {/*)}*/}
                            
                            {/*</tr>*/}
                            {/*<tr className="blog_pr">*/}
                              {/*{this.props.completedb['marketingType']['blog_experience']['landing_page_info'].map(*/}
                                  {/*(item, index) => {*/}
                                  {/*return (*/}
                                  {/*<td>*/}
                                  {/*<h3>{item}페이지 {this.props.completedb['marketingType']['blog_experience']['landing_numberth_info'][index]}페이지</h3>*/}
                                  {/*</td>*/}
                                  {/*)*/}
                                {/*}*/}
	                            {/*)}*/}
                             {/**/}
                            {/*</tr>*/}
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default BlogexperDetailInfo;
