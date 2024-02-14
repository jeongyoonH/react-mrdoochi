import React, { Component } from 'react';
import instalogo from '../../../assets/images/instagram_logo.jpg';
import CompleteCard from './CompleteCard';
// import {getCompleteInfo} from './UtilCompleteInfo';
// import {getMarketingInfo} from "./UtilMarketingInfo";

class Instaexper extends Component {
    state = {
        content_num : 0,
        comment_num : 0,
        like_num : 0
    }

    async componentDidMount(){
	    const {info,completedb} = this.props;
	    console.log(info)
	    console.log(completedb)
        let nums = []
        if(completedb !== null ) {
	        nums = completedb['marketingType']['insta_experience']
	        for (let i = 0; i < completedb['marketingType']['insta_experience']['contents'].length; i++) {
		        this.setState({
			        content_num: this.state.content_num + 1,
			        comment_num: this.state.comment_num + nums['comment_num'][i],
			        like_num: this.state.like_num + nums['like_num'][i]
		        })
	        }
        }
    }

    render () {
        const {addinfo} = this.props
        console.log(addinfo)
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {instalogo} style={{height: 30, width: 30}} alt = "logo"/> 인스타그램 체험단</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
                    <div className="row-1 column">
                    <CompleteCard
                            header={"작성 콘텐츠 개수"}
                            title = {`${this.state.content_num } 개`}
                    />
                    </div>
                    <div className="row-1 column">
                    <CompleteCard
                            header={"댓글 수"}
                            title = {`${this.state.comment_num } 개`}
                        />
                    </div>
                    <div className="row-1 column">
                    <CompleteCard
                            header={"좋아요 수"}
                            title = {`${this.state.like_num } 개`}
                    />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Instaexper;
