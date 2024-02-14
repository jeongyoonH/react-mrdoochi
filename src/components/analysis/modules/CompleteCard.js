import React, { Component } from 'react';

class CompleteCard extends Component {
    render(){
        return(
            <React.Fragment>
            <div className="card">
                <div className="card_header"><span>{this.props.header}</span></div>
                <div className="card_body">
                    <div className="as_rival">
                        <div className="rival_item info">
                            <div className="item_count">{this.props.title}</div>
                        </div>
                    </div>                            
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default CompleteCard;