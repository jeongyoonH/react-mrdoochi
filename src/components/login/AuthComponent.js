import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Login from '../../functions/login';
import * as Employed from '../../functions/employed';
import * as authActions from '../../store/modules/auth';

class AuthComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
          "username": "",
          "password": ""
      }
  }
  handleSubmit = async (e) => {
      e.preventDefault();
      const response = await Login.login(this.state.username, this.state.password);
      if(response !== undefined){
          const { authActions } = this.props;
          authActions.login();
          sessionStorage.auth = JSON.stringify(response);

          const res = await Employed.employed(this.state.username);
          if (res){
              sessionStorage.setItem("employ", res)
          }
          this.props.history.push('/Marketing');
      }
      else{
          console.log("에러발생");
      }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return (
            <div>
                <div className="contents">
                    <form onSubmit={this.handleSubmit}>
                        <section>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeholder="username"
                            style = {{width: '400px'}}
                            autoComplete="off"
                            maxLength='12'
                            />
                        </section>
                        <section>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="password"
                            style = {{width: '400px'}}
                            autoComplete="off"
                            maxLength='12'
                            />
                        </section>
                        <button
                            className="btn purple"
                            type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
  (state) => ({
    userState: state.auth.userState
  }),
  (dispatch) => ({
      authActions: bindActionCreators(authActions, dispatch)
  })
)(AuthComponent);