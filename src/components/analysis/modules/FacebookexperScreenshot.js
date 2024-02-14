/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import {getMarketingDetail} from './UtilMarketingDetail';
import {getMarketingInfo} from "./UtilMarketingInfo";

class FacebookexperScreenshot extends Component {

    state ={
        imgs : []
    }

    async componentDidMount(){
        // const screendb = await getMarketingDetail();
        // console.log(screendb);
        // console.log(screendb['marketingType']['facebook_experience']['image'])
        const username = JSON.parse(sessionStorage.auth).user.username;
        const name = this.props.name;
        // const completedb = await getCompleteInfo();
        const addinfodb = this.props.info
	
	    // const screenshot = await getMarketingScreenshot(this.props.advertiser, this.props.storename, this.props.storelocation, 'facebook', this.props.title )
	    //
	    //   const screendb = await getMarketingScreenshot(username, name, '','facebook','');
        const screendb = await getMarketingDetail(username, name,'');
        
        console.log(addinfodb)
        if(screendb !== null ) {
	        for (let val of screendb['marketingType']['facebook_experience']['image']) {
		        val = val.replace("b'", "").replace("'", "")
		        val = 'data:image/jpeg;base64,' + val;
		        this.setState({
			        imgs: this.state.imgs.concat({img: val})
		        })
	        }
	        this.state.imgs.map((val) => {
		        return (
			        console.log(val.img)
		        );
	        })
        }

    }
    render(){
        return (
            <React.Fragment>
                <div className="card2">
                    <div className="card_header"><span>대표 키워드 검색결과 - <span className="bold">{this.props.category}</span></span></div>
                    <div className="card_body">
                        <div className="tit_keyword"><span>대표 키워드 :</span> <span className="badge badge_sm tag">{this.keyword}</span></div>
                        <div className="row result">
                            {this.state.imgs.map((val, i) => {
                                return (<div className="row-4-2 column" id="screenshot_PC_1">
                                            <img src={val.img} key={i} alt="screenshot"/>
                                        </div>);
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default FacebookexperScreenshot;