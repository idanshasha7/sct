import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
  return{
    type: actionTypes.AUTH_START
  };
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

const activateAccount = (flag) =>{
  return{
    type: actionTypes.ACTIVATE_ACCOUNT,
    acctivateAccount: flag

  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(()=>{
      console.log("hi checkAuthTimeout work")
      dispatch(logout());

    }, expirationTime * 1000)

  }
}

export

export const auth = (email, password, isSignup) =>{
  return dispatch =>{
    dispatch(authStart());
    const authData ={
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAIn7k5Xl-uNPdEBKhZxhBIwlalw6-T6dM';
    if (!isSignup){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAIn7k5Xl-uNPdEBKhZxhBIwlalw6-T6dM'
    }
    axios.post(url, authData)
    .then(response=>{

      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
       //console.log(err.response.data.error.massage);
       dispatch(authFail(err.response.data.error));

    });
  };
};
