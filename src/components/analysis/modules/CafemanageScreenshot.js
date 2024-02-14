/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import {getMarketingDetail} from './UtilMarketingDetail';

class CafemanageScreenshot extends Component {

    screenshot = '';
    screenshot1 = '';
    // screenshot2 = '';
    keyword = '';
    image1 = null;
    async componentDidMount(){
        const screendb = await getMarketingDetail();
        console.log(screendb);
        const screenforblog1 = [];

    }
    render(){
        return (
            <React.Fragment>
                <div className="card2">
                    <div className="card_header"><span>대표 키워드 검색결과 - <span className="bold">{this.props.category}</span></span></div>
                    <div className="card_body">
                        <div className="tit_keyword"><span>대표 키워드 :</span> <span className="badge badge_sm tag">{this.keyword}</span></div>
                        <div className="row result">
                            <div className="row-4-2 column" id="screenshot_PC_1">
                                <img src=
                                {this.screenshot===''?'':this.screenshot1}
                                alt="screenshot"
                                />
                            </div>
                            <div className="row-4-2 column" id="screenshot_PC_2">
                                <img src=
                                    {this.screenshot===''?'':this.screenshot1}
                                    alt="screenshot"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default CafemanageScreenshot;