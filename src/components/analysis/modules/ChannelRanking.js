/*eslint-disable no-unused-vars*/
/*eslint-disable array-callback-return*/
import React, { Component } from 'react';
// import { Pie } from 'react-chartjs-2';
import thFb from '../../../assets/images/th_fb.png';
import thBlog from '../../../assets/images/th_blog.png';
import thInsta from '../../../assets/images/th_insta.png';

class ChannelRanking extends Component {
    // data4=''
    
    render(){
        
        let info = ''
        let arrayN = new Array(4)
        let arrayF = new Array(4)
        let arrayI = new Array(4)
        
        const initFunc = () => {
            if(this.props.info !== ''){
            
                info = this.props.info;
                let companyArray = ['Rival1', 'Rival2', 'Rival3', 'myCompany']
                let dataArray = ['my', 'rival1', 'rival2', 'rival3']
                let platformArray = ['naver', 'facebook', 'instagram']
                // console.log(info[companyArray[0]].info.name)
                platformArray.map( platform => {
                    companyArray.map( (company, index) => {
                        let count = 0;
                        let name = info[company].info.name
                        for (let i = 0; i < 3; i++) {
                            count += info[company]['keyword' + String(i + 1)].data[platform][dataArray[index] + '_count'];
                        }
                        
                        // if (platform === 'naver') arrayN[index] = {
                        //     "count": count, "name": name
                        // }
                        if (platform === 'facebook') arrayF[index] = {
                            "count": count, "name": name
                        }
                        else if (platform === 'instagram') arrayI[index] = {
                            "count": count, "name": name
                        }
                    })
                    
                })
                arrayN[0] = { "count": info.myCompany.info.review, "name": info.myCompany.info.name }
                arrayN[1] = { "count": info.Rival1.info.totalReviewCount * 1, "name": info.Rival1.info.name }
                arrayN[2] = { "count": info.Rival2.info.totalReviewCount * 1, "name": info.Rival2.info.name }
                arrayN[3] = { "count": info.Rival3.info.totalReviewCount * 1, "name": info.Rival3.info.name }

                arrayN.sort((a, b) => {
                    return b.count - a.count;
                })
                arrayF.sort((a, b) => {
                    return b.count - a.count;
                })
                arrayI.sort((a, b) => {
                    return b.count - a.count;
                })
            }
        }
        const checkMyCompany = (name) => {
            if (name !== '') {
                if (name === info.myCompany.info.name) {
                    return (<span className="stick my_store">내 가게</span>)
                }
            }
        }


        return (
            <React.Fragment>
                {initFunc()}
                <div className="card">
                    <div className="card_header"><span>채널 순위</span></div>
                    <div className="card_body">
                    <div className="graph pie">
                        <table className="header_bg">
                            <thead>
                            <tr>
                                <th>순위</th>
                              <th><img src={thBlog} alt="blog_icon"></img><span>네이버 블로그</span></th>
                                <th><img src={thFb} alt="blog_icon"></img><span>페이스북</span></th>
                                <th><img src={thInsta} alt="blog_icon"></img><span>인스타그램</span></th>
                            </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <th>1등</th>
                                    <td>{info === ''?'':arrayN[0].name}{checkMyCompany(info===''?'':arrayN[0].name)}</td>
                                    <td>{info===''?'':arrayF[0].name}{checkMyCompany(info===''?'':arrayF[0].name)}</td>
                                    <td>{info===''?'':arrayI[0].name}{checkMyCompany(info===''?'':arrayI[0].name)}</td>
                                </tr>
                                <tr>
                                    <th>2등</th>
                                    <td>{info===''?'':arrayN[1].name}{checkMyCompany(info===''?'':arrayN[1].name)}</td>
                                    <td>{info===''?'':arrayF[1].name}{checkMyCompany(info===''?'':arrayF[1].name)}</td>
                                    <td>{info===''?'':arrayI[1].name}{checkMyCompany(info===''?'':arrayI[1].name)}</td>
                                </tr>
                                <tr>
                                    <th>3등</th>
                                    <td>{info===''?'':arrayN[2].name}{checkMyCompany(info===''?'':arrayN[2].name)}</td>
                                    <td>{info===''?'':arrayF[2].name}{checkMyCompany(info===''?'':arrayF[2].name)}</td>
                                    <td>{info===''?'':arrayI[2].name}{checkMyCompany(info===''?'':arrayI[2].name)}</td>
                                </tr>
                                <tr>
                                    <th>4등</th>
                                    <td>{info===''?'':arrayN[3].name}{checkMyCompany(info===''?'':arrayN[3].name)}</td>
                                    <td>{info===''?'':arrayF[3].name}{checkMyCompany(info===''?'':arrayF[3].name)}</td>
                                    <td>{info===''?'':arrayI[3].name}{checkMyCompany(info===''?'':arrayI[3].name)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>      
                </div>
            </React.Fragment>
        )
    }
}
export default ChannelRanking;
