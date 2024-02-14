import React, { Component } from 'react';
import storeImg from '../images/thumb_sample.png'

class KeywordItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }
  render() {
    const {id, item} = this.props;

    return (
        <li className={id} >
            {item}
        </li>
    );
  }
}

export default KeywordItem;