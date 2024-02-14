import React, { Component } from 'react';

class NameItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }
  render() {
    const {id, title, category, address, onToggle} = this.props;
    // const innerTitle = () => {
    //     const NT = document.getElementsByClassName('nameItemTitle');
    //     NT.innerHTML = title;
    //     console.log('here');
    // }

    return (
        <li className="item"  onClick={() => onToggle(id)}>
        <div className="rival_item thumb">
        </div>
        <div className="rival_item info">
            <div className="item_title" id='nameItemTitle'><strong>{title}</strong><br/>
            <span className="item_category">{category}</span></div>
            <div className="item_desc">{address}</div>
        </div>
        <div className="rival_item like">
            <div>
                <div className="icon heart-line"></div>
            </div>
        </div>
        </li>
    );
  }
}

export default NameItem;