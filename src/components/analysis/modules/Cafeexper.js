import React, { Component } from 'react';
import cafelogo from '../../../assets/images/naver_cafe.jpg';
import CompleteCard from './CompleteCard';

class Cafeexper extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title"><img src = {cafelogo} style={{height: 30, width: 30}} alt = "logo"/> 카페 체험단 마케팅</div>
                <div className="section_title">1. 요약 정보</div>
                <div className="section_desc">숫자로 간단하게 보는 마케팅 요약 정보.</div>
                <div className="row">
                    <div className="row-1 column">
                    <CompleteCard
                            header={"활동한 카페 개수"}
                            title={"48개"}
                    />
                    </div>
                    <div className="row-1 column">
                    <CompleteCard
                            header={"작성한 총 게시글 수"}
                            title = {"7일 2시간"}
                        />
                    </div>
                    <div className="row-1 column">
                    <CompleteCard
                            header={"작성한 총 댓글 수"}
                            title={"48개"}
                    />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Cafeexper;
