import React, { Component } from 'react';
import * as config from "../../../store/config/config";

class SearchResult_PC extends Component {

    screenshot = '';
    screenshot1 = '';
    screenshot2 = '';
    keyword = '';
    image1 = null;
    componentDidMount(){
        this.initFunc();
    }
    initFunc = () => {
	    const prefix = config.vars.SCREESHOT_IMG_URL
        if(this.props.info!==undefined && this.props.info.screenshot!==undefined){
            this.screenshot = this.props.info.screenshot;
            this.keyword = this.props.info.screenshot.keyword;

            this.screenshot1 = prefix+(this.screenshot.pc_place)
            // this.screenshot1 = (this.screenshot.pc_place).replace("b'",'').replace(`'`,'')
            // this.screenshot1 = 'data:image/jpeg;base64,'+this.screenshot1;
	        if(this.props.info.screenshot.pc_place2 !=='' && this.props.info.screenshot.pc_place2!==undefined){
		        this.screenshot2 = prefix+(this.screenshot.pc_place2)
		        // this.screenshot2 = (this.screenshot.pc_place2).replace("b'",'').replace(`'`,'')
		        // this.screenshot2 = 'data:image/jpeg;base64,'+this.screenshot2;
	        }
            
        }
    }
    render(){       
        console.log(this.props.info)
        return (
            <React.Fragment>
                {this.initFunc()}
                <div className="card">
                    <div className="card_header"><span>대표 키워드 검색결과 - <span className="bold">{this.props.category}</span></span></div>
                    <div className="card_body">
                        <div className="tit_keyword"><span>대표 키워드 :</span> <span className="badge badge_sm tag">{this.props.info.screenshot.keyword}</span></div>
                        <div className="row result">
                            <div className="row-4-2 column" id="screenshot_PC_1">
                                <img src=
                                {this.screenshot===''?'':this.screenshot1}
                                alt="screenshot"
                                />
                            </div>
                            <div className="row-4-2 column" id="screenshot_PC_2">
                                <img src=
                                    {this.screenshot===''?'':this.screenshot2}
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
export default SearchResult_PC;