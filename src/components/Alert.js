import React, { Component } from 'react';
import { withAlert } from "react-alert";

class Alert extends Component {
    render () {
        const { style, options, message, close } = this.props
     
        return (
          <div style={style}>
            {options.type === 'info' && '!'}
            {options.type === 'success' && ':)'}
            {options.type === 'error' && ':('}
            {message}
            <button onClick={close}>X</button>
          </div>
        )
      }
}
export default Alert;