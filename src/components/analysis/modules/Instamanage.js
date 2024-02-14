import React, { Component } from 'react';
import instalogo from '../../../assets/images/instagram_logo.jpg';
import CompleteCard from './CompleteCard';
// import {getCompleteInfo} from './UtilCompleteInfo';
// import {getMarketingInfo} from './UtilMarketingInfo'
import {getCompleteInfo} from "./UtilCompleteInfo";

class Instamanage extends Component {
    state = {
        content_num : 0,
        visitor_num : 0,
        comment_num : 0,
        like_num : 0,
        new_fllow_num : 0
    }

    async componentDidMount(){
        const username = JSON.parse(sessionStorage.auth).user.username;
        const name = this.props.name;
        // const completedb = await getCompleteInfo();
        const addinfodb = this.props.info
        
        
        const completedb = await getCompleteInfo(username, name, '');
        console.log(completedb)
        console.log(addinfodb)
        let nums = []
        if(completedb !== null ) {
            nums = completedb['marketingType']['insta_manage']
            for (let i = 0; i < completedb['marketingType']['insta_manage']['contents'].length; i++) {
              this.setState({
                content_num: this.state.content_num + 1,
                comment_num: this.state.comment_num + nums['comment_num'][i] * 1,
                like_num: this.state.like_num + nums['like_num'][i] * 1
              })
            }
        
            for (let i = 0; i < addinfodb['marketingInfoList']['insta_manage'].length; i++) {
              let id_info = addinfodb['marketingInfoList']['insta_manage'][i]['id']
              this.setState({
                new_fllow_num: this.state.new_fllow_num + (nums['new_fllow_num'][id_info][1] * 1 - nums['new_fllow_num'][id_info][0] * 1)
              })
            }
        }
    }


    render () {
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {instalogo} style={{height: 30, width: 30}} alt = "logo"/> 인스타 운영대행</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
                    <div className="row-4-5 column">
                    <CompleteCard
                            header={"작성 컨텐츠 개수"}
                            title={this.state.content_num + "개"}
                    />
                    </div>
                    <div className="row-4-5 column">
                    <CompleteCard
                            header={"방문자 수"}
                            title = {this.state.visitor_num + "명"}
                        />
                    </div>
                    <div className="row-4-5 column">
                    <CompleteCard
                            header={"총 댓글 수"}
                            title={this.state.comment_num + "개"}
                    />
                    </div>\
                    <div className="row-4-5 column">
                    <CompleteCard
                            header={"총 좋아요 수"}
                            title={this.state.like_num + "개"}
                    />
                    </div>
                    <div className="row-4-5 column">
                    <CompleteCard
                            header={"신규 팔로워 수"}
                            title={this.state.new_fllow_num + "명"}
                    />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Instamanage;
