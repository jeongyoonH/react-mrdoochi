import React, { Component } from 'react';
import noImage from '../../../assets/images/noImage.png';

class Item extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }
  // componentDidMount () {
  //   const img = new Image()
  //   const { imageSrc } = this.props;

  //   // when image loads, push actual URL to state
  //   img.onload = e => {
  //       this.setState({ src: imageSrc }, () => console.log(this.state.src))
  //       console.log(this.props.name, '음.. 로딩됨,')
  //   }
  //   // start loading image
  //   img.src = imageSrc
  // }
  render() {
    const {id, imageSrc, name, category, microReview, priceCategory, totalReviewCount, onToggle,distance} = this.props;
    
    console.log(id, name);

    // console.log(name);

    return (
        <li className="item" >
        <div className="rival_item thumb-wrap">
          <div className="thumb">
            <div className="centered">
                <img 
                  src={imageSrc===undefined?noImage:imageSrc}
                  alt="imageSrc"
                  onError = { e => {e.target.src=noImage;}}
                />
            </div>
          </div>
        </div>
        <div className="rival_item info">
            <div className="item_title">{name} 
            <span className="item_category">{category}</span></div>
            <div className="item_desc">{microReview}</div>
            <div className="item_meta review">
                <span className="meta_title">리뷰</span>
                <span className="meta_count">{totalReviewCount}</span>
            </div>
            <div className="item_meta price">
                <span className="meta_title">가격</span>
                <span className="meta_count">{priceCategory? priceCategory: '없음'}</span>
            </div>
            <div className="item_meta price">
              <span className="meta_title">거리</span>
              <span className="meta_count">{distance? `${distance}km`:''}</span>
            </div>
        </div>
        <div className="rival_item like">
            <div onClick={() => onToggle(id)}>
                <div className="icon heart-line"></div>
            </div>
        </div>
        </li>
    );
  }
}

export default Item;