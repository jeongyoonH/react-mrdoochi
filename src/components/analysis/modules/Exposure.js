import React, { Component } from 'react';
import bloglogo from '../../../assets/images/naver_blog.jpg';
import CompleteCard from './CompleteCard';

class Facebookmanage extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {bloglogo} style={{height: 30, width: 30}} alt = "logo"/>블로그/플레이스 상위 노출 보장</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
                    <div className="row-3 column">
                    <CompleteCard
                            header={"첫 페이지 노출 시간"}
                            title={"48개"}
                    />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Facebookmanage;
