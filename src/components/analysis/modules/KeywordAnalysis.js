import React, { Component } from 'react';
import ActivateKeywords from './ActivateKeywords';
import WeightByKeyword from './WeightByKeyword';
import ImpressionState from './ImpressionState';
import SearchResultPC from './SearchResult_PC';
import SearchResultM from './SearchResult_M';

class KeywordAnalysis extends Component {
    render(){
        const { info } = this.props;
        return (
            <React.Fragment>
                <div className="section">
                    <div className="top_border"></div>
                    <div className="section_title">키워드 분석</div>
                    <div className="section_desc">키워드에 대한 모든 분석을 볼 수 있습니다.</div>
                    <div className="row active_key">
                        <div className="row-3 column">
                            <ActivateKeywords
                                info={info}
                            />
                        </div>
                    </div>
                    <div className="row central_key">
                        <div className="row-4-2 column">
                            <WeightByKeyword
                                category={"pc"}
                                info={info}
                            />
                        </div>
                        <div className="row-4-2 column">
                            <WeightByKeyword
                                category={"mobile"}
                                info={info}
                            />
                        </div>
                    </div>
                    <div className="row status_open">
                        <div className="row-3 column">
                            <ImpressionState
                                info={info}
                            />
                        </div>
                    </div>
                    <div className="row result_search">
                        <div className="row-3 column">
                            <SearchResultPC
                                category={"PC"}
                                info={info}
                            />
                        </div>
                    </div>
                    <div className="row result_search">
                        <div className="row-3 column">
                            <SearchResultM
                                category={"Mobile"}
                                info={info}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default KeywordAnalysis;
