import React, { Component } from 'react';
import bloglogo from '../../../assets/images/naver_blog.jpg';
import CompleteCard from './CompleteCard';

class Blogexper extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {bloglogo} style={{height: 30, width: 30}} alt = "logo"/> 블로그 운영 대행</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
                    <div className="row-1 column">
                    <CompleteCard
                            header={"신규 작성 콘텐츠 수"}
                            title={"48개"}
                    />
                    </div>
                    <div className="row-1 column">
                    <CompleteCard
                            header={"누적 방문자 수"}
                            title = {"223명"}
                        />
                    </div>
                    <div className="row-1 column">
                    <CompleteCard
                            header={"첫페이지 노출 시간"}
                            title = {"3일 3시간"}
                        />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Blogexper;
