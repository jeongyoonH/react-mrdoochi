import React, { Component } from 'react';
import NaverBlogContents from './NaverBlogContents';
import ChannelRanking from './ChannelRanking';

class ChannelAnalysis extends Component {
    render(){
        const { info } = this.props;
        return (
            <React.Fragment>
                <div className="section">
                    <div className="top_border"></div>
                    <div className="section_title">채널 분석</div>
                    <div className="section_desc">채널에 대한 분석을 볼 수 있습니다.</div>
                    <div className="row channel_like">
                        <div className="row-3 column">
                            <ChannelRanking
                                info={info}
                            />
                        </div>
                    </div>
                    <div className="row cont_acc">
                        <div className="row-3 column">
                            <NaverBlogContents
                                info={info}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ChannelAnalysis;
