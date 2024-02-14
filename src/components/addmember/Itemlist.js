import React, { Component } from 'react';
import {deleteMember} from "./UtilMemberdelete";


class Itemlist extends Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		// this.state = { focusID : 0 };
		// listItemObject = this;
		this.state = {
			toggleClass: 'disabled',
		}
	}
	onToggle = async (event) => {
		this.setState({
			toggleClass: event === 'disabled'? '' :'disabled'
		});
	}
	
	onFocus(event) {
		const tempObj = event.target;
		console.log(tempObj);
	}
	async delete() {
		// this.props.id
		//
		const member_list = await deleteMember(this.props.id);
		console.log(member_list)
		window.location.reload();
	}
	render() {
		const {toggleClass} = this.state;
		
		
		return (
			
			<div className="list-item" >
				
				{/* 카페 침투 마케팅 상세 */}
				<div className="list-item-view" onClick={() => this.onToggle(toggleClass)}>
					<div className="list-keyword keyword">
						<div className="list-kind"><span className="cafe">{this.props.id}</span></div>
					
					</div>
					<div className="list-keyword keyword">
						
						<div className="list-kind"><span className="cafe">{this.props.username}</span></div>
					
					</div>
					
					<div className="list-keyword keyword">
						<div className="list-kind"><span className="cafe">{this.props.email}</span></div>
					
					</div>
					<div className="list-keyword keyword">
						<div className="list-kind"><span className="cafe">{this.props.phoneNumber}</span></div>
					
					</div>
				</div>
				<div className={`list-item-detail ${toggleClass}`}>
					<button className={`btn btn-primary btn-regular btn-line`} onClick={() => this.delete()}>삭제</button>
				</div>
			
			</div>
		);
	}
}

export default Itemlist;
