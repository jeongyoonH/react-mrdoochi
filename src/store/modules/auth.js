import { createAction, handleActions } from 'redux-actions';

// 액션 타입을 정의해줍니다.
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const EMPLOYED = 'auth/employ';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const employed = createAction(EMPLOYED);

const initialState = {
  userState: false,
  employedState: false
};

export default handleActions({
  [LOGIN]: (state, action) => {    
    if(!state.userState){
      document.getElementById('authBtn').innerHTML = "로그아웃";
      // console.log('로그인');
      return { userState: true };
    }
    else alert("로그인 과정에서 에러가 발생했습니다.");
  },  
  [LOGOUT]: (state, action) => {
    if(state.userState){
      // console.log('로그아웃');
      document.getElementById('authBtn').innerHTML = "로그인";
      sessionStorage.clear();
      return { userState: false };
    }
    else alert("로그아웃 과정에서 에러가 발생했습니다.");
  },
  [EMPLOYED]: (state, action) => {
    if(!state.employedState){
      console.log(state.employedState);
      return {employedState: true};
    }
    else alert("회사사람이 아닙니다.");
  }
}, initialState);