import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Alert from 'react-s-alert';

import '../assets/css/base.css';
import * as authActions from '../store/modules/auth';

// import MemberManage from '../components/addmember/MemberManage';
// import * as TYPE from "../stringType";


class Header extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    componentDidMount(){
        this.initializeUserInfo();
    }
    initializeUserInfo =  () => {
        if(sessionStorage.auth === undefined) return;    
        
        const { authActions } = this.props;
        authActions.login();
    };
    handlerAuth = () => {
        const { userState } = this.props;
        const { authActions } = this.props;
        if(userState){
            authActions.logout();
            this.context.router.history.push("/");
            Alert.success('<h4>로그아웃<h4>', {
                position: 'top-right',
                effect: 'slide',
                html: true
              });
        }else{
            this.context.router.history.push("/Login");
        }
    };
		gotoMarketing = () =>{
			window.location.href="/Marketing";
		}
    render(){
	    // const { userState } = this.props;
	    // const { authActions } = this.props;
	    // console.log(JSON.parse(sessionStorage.auth).user.username)
	    return (
		    <header id="header" className="main">
		        <div className="header_wrap">
		            <div className="inner">
		                <div className="logo_section">
		                    <h1><NavLink exact to="/">Mr.Doochi</NavLink></h1>
		                </div>
		                <div className="global_nav">
		                    <ul>
			                      <li><NavLink exact to="/Marketing" activeClassName="active" onClick={this.gotoMarketing}>마케팅</NavLink></li>
		                        <li><NavLink exact to="/Government" activeClassName="active">정부 R&D</NavLink></li>
		                        <li><NavLink exact to="/Accounting" activeClassName="active">회계관리</NavLink></li>
		                        <li><NavLink exact to="/Document" activeClassName="active">서류관리</NavLink></li>
			                      { sessionStorage.auth !== undefined && JSON.parse(sessionStorage.auth).user.username === 'test01' &&
			                      <li><NavLink exact to="/MemberManage" activeClassName="active">관리자</NavLink></li> }
			                      
			                      
		                    </ul>
		                </div>
				            
		                <div id="authBtn" onClick = {this.handlerAuth}>로그인</div>
			              
		                
		            </div>
		        </div>
		    </header>
	    );
    }
};

export default connect(
  (state) => ({
    userState: state.auth.userState
  }),
  (dispatch) => ({
      authActions: bindActionCreators(authActions, dispatch)
  })
)(Header);