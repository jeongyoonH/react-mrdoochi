import React, { Component } from 'react';
import {getMemberInfo} from "./UtilMemberInfo";
import {insertMemberCreate} from "./UtilMemberCreate";
import Itemlist from './Itemlist';

// import { connect } from 'react-redux';


class MemberManage extends Component {
	constructor() {
		super();
		this.state = {
			
			// 데이터 담을 곳
			records: [],
			id:'',
			pw:'',
			email:'',
			phoneNumber:'',
			username:'',
		}
	}
	async handleCreate(){
		
		const result = await insertMemberCreate(this.state.id,this.state.pw,this.state.email,this.state.phoneNumber,this.state.username);
		console.log(result);
		window.location.reload();
		
	}
	async componentDidMount () {
//		데이터 파싱해서 넣을 곳
		let record_arr = [];
		//
		const member_list = await getMemberInfo();

		this.setState({
			records: member_list,
		});
		console.log(record_arr);
	}

	// handleChangeId = e => this.setState({ username: e.target.value })
	// handleChangePw = e => this.setState({ pw: e.target.value })
	handleChangeId = e => {
		this.setState({ id: e.target.value })
		console.log(this.state.id);
	};
	
	handleChangePw = e => {
		this.setState({ pw: e.target.value })
		console.log(this.state.pw);
		
	};
	
	handleChangeEmail = e => {
		this.setState({ email: e.target.value })
		console.log(this.state.email);
		
	};
	
	handleChangephoneNumber = e => {
		const newValue = e.target.value.replace(/[^0-9]/g, '')
		
		this.setState({ phoneNumber:newValue })
		console.log(this.state.phoneNumber);
		
	};
	handleChangepusername = e => {
		this.setState({ username: e.target.value })
		console.log(this.state.username);
		
	};
	
	// async handleCreate() {
		
		
		// if (e.key === 'Enter') { handleKeyword(keywordInput); this.setState({ keywordInput: '' }) }
		
		// this.setState({
		// 	username: member_list,
		// 	pw:pw,
		// });
	// }
	render(){
		return (
			<div>
				<input type="text" placeholder="아이디" value={this.state.id} onChange={this.handleChangeId}  />
				<input type="text" placeholder="pw" value={this.state.pw}  onChange={this.handleChangePw} />
				<input type="text" placeholder="email" value={this.state.email}  onChange={this.handleChangeEmail} />
				<input type="text" placeholder="phoneNumber" value={this.state.phoneNumber}  onChange={this.handleChangephoneNumber} />
				<input type="text" placeholder="username" value={this.state.username}  onChange={this.handleChangepusername} />
				<button className={`btn btn-primary btn-regular btn-line`} onClick={() => this.handleCreate()}>추가</button>
				
				
				{/*<PhoneForm*/}
					{/*onCreate={this.handleCreate}*/}
				{/*/>*/}
				{/* 페이스북 인플루언서 */}
				{this.state.records.map((item, index) => {
					return (
						<Itemlist
							id={item[0]}
							username={item[1]}
							email={item[2]}
							phoneNumber={item[3]}
							pw={item[4]}
							// onRemove={this.handleRemove}
						/>)
				})}
			</div>
		);
	}
};

export default MemberManage;