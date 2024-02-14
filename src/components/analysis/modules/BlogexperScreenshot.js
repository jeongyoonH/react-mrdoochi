/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import {getMarketingDetail} from './UtilMarketingDetail';
import * as config from "../../../store/config/config";

class BlogexperScreenshot extends Component {

 
	state = {
		screenshot1: '',
		screenshot2: '',
		keywords:[],
		image1:null,
		
	}
	async componentDidMount () {
		const prefix = config.vars.SCREESHOT_IMG_URL
		// console.log(this.props.completedb)
		// const username = JSON.parse(sessionStorage.auth).user.username;
		// const name = this.props.name;
		// const completedb = await getCompleteInfo(username, name, '');
		const {info,completedb} = this.props;
		console.log(info)
		console.log(completedb)
		
		if (info != null){
			
			 for (let i = 0; i < info['keywords'].length; i++) {
				 this.setState({
					 keywords: this.state.keywords.concat(info['keywords'][i])
					
				 })
				 console.log(info['keywords'][i])
			  
			 }
			
		}
		if (completedb != null){
			
			if(this.props.category === 'mobile'){
				
				if(completedb['marketingType']['blog_experience']['type']['mobile']['image'].length ===1){
					this.setState({
						screenshot1:prefix+completedb['marketingType']['blog_experience']['type']['mobile']['image'][0],
						screenshot2:'',
					});
				}else if(completedb['marketingType']['blog_experience']['type']['mobile']['image'].length > 2){
					this.setState({
						screenshot1:prefix+completedb['marketingType']['blog_experience']['type']['mobile']['image'][0],
						screenshot2:prefix+completedb['marketingType']['blog_experience']['type']['mobile']['image'][1],
					});
				}
			}else{
				if(completedb['marketingType']['blog_experience']['type']['pc']['image'].length ===1){
					this.setState({
						screenshot1:prefix+completedb['marketingType']['blog_experience']['type']['pc']['image'][0],
						screenshot2:'',
					});
				}else if(completedb['marketingType']['blog_experience']['type']['pc']['image'].length > 2){
					this.setState({
						screenshot1:prefix+completedb['marketingType']['blog_experience']['type']['pc']['image'][0],
						screenshot2:prefix+completedb['marketingType']['blog_experience']['type']['pc']['image'][1],
					});
				}
			}
			
			
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
    render(){
			
        return (
            <React.Fragment>
                <div className="card1">
                    <div className="card_header"><span>대표 키워드 검색결과 - <span className="bold">{this.props.category}</span></span></div>
                    <div className="card_body">
                        <div className="tit_keyword"><span>대표 키워드 :</span>
	
	                        {this.state.keywords.map(
		                        (item, index) => {
			                        return (
				                        <span className="badge badge_sm tag">{item}</span>
			                        )
		                        }
	                        )}
	                        
                        
                        </div>
                        <div className="row result">
                            <div className="row-4-2 column" id="screenshot_PC_1">
	                            {this.state.screenshot1 &&
		                            <img src=
		                            {this.state.screenshot1}
		                            alt="screenshot"
		                            />
	                            }
                            </div>
                            <div className="row-4-2 column" id="screenshot_PC_2">
	                            {this.state.screenshot2 &&
	                            <img src=
		                                 {this.state.screenshot2}
	                                 alt="screenshot"
	                            />
	                            }
                             
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default BlogexperScreenshot;