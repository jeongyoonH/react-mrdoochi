/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import thFb from '../../../assets/images/th_fb.png';
import thBlog from '../../../assets/images/th_blog.png';
import thInsta from '../../../assets/images/th_insta.png';
import {getCompleteInfo} from './UtilCompleteInfo';

class CafeexperDetailInfo extends Component {
    state = {
        arrayF : [],
        arrayI : [],
        cafe : []
    }
    async componentDidMount () {
        this.initFunc()
        const detailinfo = await getCompleteInfo()
        // console.log(detailinfo['marketingType']['cafe_experience'])
        this.setState({
            cafe : detailinfo['marketingType']['cafe_experience']['type']['article']
        })
        console.log(this.state.cafe)
        
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
        const { arrayF, arrayI } = this.state
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
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title">2. 상세 정보</div>
                <div className="section_desc">카페 체험단의 포스팅 제목과 노출 등수입니다.</div>
                <div className="row"/>
            </div>
            <div className="card2">
                   {/*<div className="card_header"><span>경쟁사 채널 정보</span></div>*/}
                    <div className="card_body">
                        <table className="no_bg">
                            <thead>
                            <tr>
                              <th><span>{"활동 카페명"}</span></th>
                              <th><span>{"게시글 제목"}</span></th>
                              <th><span>{"작성일"}</span></th>
                              <th><span>{"댓글 수"}</span></th>
                              <th><span>{"조회 수"}</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="blog_pr">
                                {/*<td><img src={thBlog} alt="blog_icon"></img><span>네이버 블로그</span></td>*/}
                                <td>
                                    <h3>{this.state.cafe['cafe_name']}</h3>
                                </td>
                                <td>
                                    <h3>{this.state.cafe['title']}</h3>
                                </td>
                                <td>
                                    <h3>{this.state.cafe['date']}</h3>
                                </td>
                                <td>
                                    <h3>{this.state.cafe['comment_num']}</h3>
                                </td>
                                <td>
                                    <h3>{this.state.cafe['click_num']}</h3>
                                </td>
                            </tr>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default CafeexperDetailInfo;
