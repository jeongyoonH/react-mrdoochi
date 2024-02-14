/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import {getMarketingDetail} from './UtilMarketingDetail';

class InstamanageScreenshot extends Component {
    state = {
        imgs : []
    }

    async componentDidMount(){
        const screendb = await getMarketingDetail();
        console.log(screendb);
        console.log(screendb['marketingType']['insta_manage']['image'])
        for(let val of screendb['marketingType']['insta_manage']['image']){
            val = val.replace("b'","").replace("'","")
            val = 'data:image/jpeg;base64,' + val;
            this.setState({
                imgs : this.state.imgs.concat({img : val})
            })
        }
        this.state.imgs.map((val) => {
            return(
                console.log(val.img)
                );
        })
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
export default InstamanageScreenshot;