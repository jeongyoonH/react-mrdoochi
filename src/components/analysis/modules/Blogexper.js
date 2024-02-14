import React, { Component } from 'react';
import bloglogo from '../../../assets/images/naver_blog.jpg';
import CompleteCard from './CompleteCard';
// import {getMarketingInfo} from "./UtilMarketingInfo";
// import {getCompleteInfo} from "./UtilCompleteInfo";

class Blogexper extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			naver_id:'',
			title : 0,
			date : 0,
			url : 0,
			landing_sum_date:0,
			new_contents_count:0
		}
	}
	
	async componentDidMount () {
		const {info,completedb} = this.props;
		console.log(info)
		console.log(completedb)
		if(completedb !== null ) {
						for (let i = 0; i < completedb['marketingType']['blog_experience']['naver_id'].length; i++) {
							this.setState({
								naver_id: completedb['marketingType']['blog_experience']['naver_id'][i],
								title : completedb['marketingType']['blog_experience']['title'][i],
								date : completedb['marketingType']['blog_experience']['date'][i],
								url : completedb['marketingType']['blog_experience']['url'][i],
								landing_sum_date : 0,//this.state.date + completedb['marketingType']['blog_experience']['date'][i],
								new_contents_count:this.state.new_contents_count + 1
							})
						}
					}
	}
	// componentWillMount(){
	// 	// const completedb = await getCompleteInfo();
	// 	// console.log(completedb);
	// 	// let nums = completedb['marketingType']['insta_experience']
	// 	// const username = JSON.parse(sessionStorage.auth).user.username;
	// 	// const name = this.props.name;
	// 	// // const completedb = await getCompleteInfo();
	// 	// const addinfodb = this.props.info
	//
	//
	// 	// const completedb = await getCompleteInfo(username, name, '');
	// 	// console.log(completedb)
	// 	// console.log(addinfodb)
	// 	// let nums = []
	// 		const {info,completedb} = this.props;
	// 		console.log(info)
	// 		console.log(completedb)
	// 		if(completedb !== null ) {
	// 			for (let i = 0; i < completedb['marketingType']['blog_experience']['naver_id'].length; i++) {
	// 				this.setState({
	// 					naver_id: completedb['marketingType']['blog_experience']['naver_id'][i],
	// 					title : completedb['marketingType']['blog_experience']['title'][i],
	// 					date : completedb['marketingType']['blog_experience']['date'][i],
	// 					url : completedb['marketingType']['blog_experience']['url'][i],
	// 					landing_sum_date : 0,//this.state.date + completedb['marketingType']['blog_experience']['date'][i],
	// 					new_contents_count:this.state.new_contents_count + 1
	// 				})
	// 			}
	// 		}
	//
	// 	}
    render () {
				const {blog_experience} = this.props;
				console.log(blog_experience)
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {bloglogo} style={{height: 30, width: 30}} alt = "logo"/> 블로그 체험단 마케팅</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
                    <div className="row-4-2 column">
                    <CompleteCard
                            header={"신규 작성 콘텐츠 수"}
                            title={this.state.new_contents_count}
                    />
                    </div>
                    <div className="row-4-2 column">
                    <CompleteCard
                            header={"첫 페이지 누적 노출 시간"}
                            title = {this.state.landing_sum_date}
                        />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Blogexper;
