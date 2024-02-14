import React, { Component } from 'react';
import noImage from '../../../assets/images/noImage.png';

class RivalCard extends Component {
    render(){
        return(
            <React.Fragment>
            <div className="card">
                <div className="card_header"><span>{this.props.header}</span></div>
                <div className="card_body">
                    <div className="as_rival">
                        <div className="rival_item thumb">
                            <img 
                                src={this.props.image===undefined?noImage:this.props.image}
                                alt="imageSrc"
                                onError = { e => {e.target.src=noImage;}}
                            />
                        </div>
                        <div className="rival_item info">
                            <div className="item_title">{this.props.title} <span className="item_category">{this.props.category}</span></div>
                            <div className="item_desc">{this.props.desc}</div>
                            <div className="item_meta review">
                                <span className="meta_title">리뷰</span>
                                <span className="meta_count">{this.props.reviewCount}</span>
                            </div>
                            <div className="item_meta price">
                                <span className="meta_title">가격</span>
                                <span className="meta_count">{this.props.price ? this.props.price : '정보 없음'}</span>
                            </div>
                        </div>
                    </div>                            
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default RivalCard;