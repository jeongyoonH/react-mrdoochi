import React, { Component } from 'react';
import facebooklogo from '../../../assets/images/facebook_logo.jpg';
import CompleteCard from './CompleteCard';
// import { getCompleteInfo } from './UtilCompleteInfo';
// import {getMarketingInfo} from "./UtilMarketingInfo";

class Facebookexper extends Component {
    state = {
        content_num: 0,
        comment_num: 0,
        like_num: 0,
        share_num: 0
    }

    async componentDidMount(){
	    const {info,completedb} = this.props;
	    console.log(info)
	    console.log(completedb)
	      let nums = []
	      if(completedb !== null ){
		      nums = completedb['marketingType']['facebook_experience']
		      for(let i = 0; i < completedb['marketingType']['facebook_experience']['contents'].length; i++){
			      this.setState({
				      content_num: this.state.content_num + 1,
				      comment_num: this.state.comment_num + nums['comment_num'][i]*1,
				      like_num: this.state.like_num + nums['like_num'][i]*1,
				      share_num: this.state.share_num + nums['share_num'][i]*1
			      })
		      }
	      }
       
        
    }

    render () {
    	  const {addinfo}=this.props
	      console.log(addinfo)
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {facebooklogo} style={{height: 30, width: 30}} alt = "logo"/> 페이스북 체험단</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
	                
                    <div className="row-4-4 column">
                    <CompleteCard
                            header={"작성 컨텐츠 개수"}
                            // title={ contents_num `개`}
                            title = {`${this.state.content_num } 개`}

                    />
                    </div>
                    <div className="row-4-4 column">
                    <CompleteCard
                            header={"댓글 수"}
                            title = {`${this.state.comment_num } 개`}
                        />
                    </div>
                    <div className="row-4-4 column">
                    <CompleteCard
                            header={"좋아요 수"}
                            title={`${this.state.like_num } 개`}
                    />
                    </div>\
                    <div className="row-4-4 column">
                    <CompleteCard
                            header={"공유 수"}
                            // title={facebook_experience.share_num + "개"}
                            title={`${this.state.share_num } 개`}

                    />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Facebookexper;
