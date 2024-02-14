import React, { Component } from 'react';
import RivalCard from './RivalCard';
import ChannelPrepare from './ChannelPrepare';

class MarketingPrepareTemplate extends Component {
    render () {
        const { info } = this.props;
        return (
            <React.Fragment>
              
                <div className="section">
                <div className="top_border"></div>
                <div className="section_title">마케팅 준비사항</div>
                <div className="section_desc">마케팅을 하기 위한 준비사항인 경쟁사와 채널 준비도를 볼 수 있습니다.</div>
                
                <div className="row">
                    <div className="row-1 column">
                    <RivalCard
                            header={"경쟁사 (1)"}
                            title={info===''?'':info.Rival1.info.name}
                            category={info===''?'':info.Rival1.info.category}
                            desc={info===''?'':info.Rival1.info.microReview}
                            reviewCount={info===''?'':info.Rival1.info.totalReviewCount}
                            price={info===''?'':info.Rival1.info.priceCategory}
                            image={info===''?'':info.Rival1.info.imageSrc}
                    />
                    </div>
                    <div className="row-1 column">
                    <RivalCard
                            header={"경쟁사 (2)"}
                            title={info===''?'':info.Rival2.info.name}
                            category={info===''?'':info.Rival2.info.category}
                            desc={info===''?'':info.Rival2.info.microReview}
                            reviewCount={info===''?'':info.Rival2.info.totalReviewCount}
                            price={info===''?'':info.Rival2.info.priceCategory}
                            image={info===''?'':info.Rival2.info.imageSrc}
                        />
                    </div>
                    <div className="row-1 column">
                    <RivalCard
                            header={"경쟁사 (3)"}
                            title={info===''?'':info.Rival3.info.name}
                            category={info===''?'':info.Rival3.info.category}
                            desc={info===''?'':info.Rival3.info.microReview}
                            reviewCount={info===''?'':info.Rival3.info.totalReviewCount}
                            price={info===''?'':info.Rival3.info.priceCategory}
                            image={info===''?'':info.Rival3.info.imageSrc}
                        />
                    </div>
                </div>
                <div className="row ready_chn">
                    <div className="row-3">
                    {
                        info !== '' &&
                        <ChannelPrepare
                            info={info}
                        />
                    }
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default MarketingPrepareTemplate;
