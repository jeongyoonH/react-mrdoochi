import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../assets/css/base.css';
import mainImg from '../../assets/images/rocket.png'

class HomeComponet extends Component {
    render(){
        return (
	        <div>
            <div className="contents no_contents one_page center">
                {this.props.userState && <Redirect to='/Marketing'/>}
                <div className="main_img">
                    <img src={mainImg} alt="메인 이미지"></img>
                </div>
                <h2 className="main_title">미스터 두치 영업용 분석툴 ver 1.2</h2>
                <h5 className="main_title">기업 추가 버튼을 눌러보세요. 당신의 영업에 부스터를 달아드립니다.</h5>
                <span className="btn purple"><NavLink to="/AddCompany">기업 추가하기</NavLink></span>
            </div>
	        </div>
        );
    }
};

export default connect(
    (state) => ({
      userState: state.auth.userState
    })
)(HomeComponet);