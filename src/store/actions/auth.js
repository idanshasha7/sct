import axios from 'axios';
import * as firebase from 'firebase';
// import * as Binance from 'node-binance-api';
import Binance from 'binance-api-node'

import * as actionTypes from './actionTypes';


// Initialize Firebase

 var config = {
   apiKey: "AIzaSyAIn7k5Xl-uNPdEBKhZxhBIwlalw6-T6dM",
   authDomain: "social-crypto-31995.firebaseapp.com",
   databaseURL: "https://social-crypto-31995.firebaseio.com",
   projectId: "social-crypto-31995",
   storageBucket: "social-crypto-31995.appspot.com",
   messagingSenderId: "555215828675"
 };
 export const firebaseApp = firebase.initializeApp(config);


export const authStart = () => {
    return {
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
export const setActivateAccount = () => {
    return {
        type: actionTypes.ACTIVATE_ACCOUNT,
        activateAccount: true

    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
            apiKey: '23af'
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAIn7k5Xl-uNPdEBKhZxhBIwlalw6-T6dM';
        if (!isSignup){
          url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAIn7k5Xl-uNPdEBKhZxhBIwlalw6-T6dM'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(isActivate());
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                dispatch(isActivate());
            }
        }
    };
};

export const activateAccount = (apiKey) => {
    return dispatch => {
        let database = firebase.database();
        const userId = localStorage.getItem('userId');
        console.log("state user:",apiKey);
        console.log(" userID:",userId);
        firebase.database().ref('users/' + userId).set({
          user_id: userId,
          api_key: apiKey

        })
        // firebase.database().ref('users/' + userId).on('value', snap=>{
        //   snap.forEach(val=>{
        //   console.log('snapshot',val.val());
        // });
        // });
    };
};

export const isActivate = () => {
    return dispatch => {
        let database = firebase.database();
        const userId = localStorage.getItem('userId');
        if(userId){
        firebase.database().ref('users/' + userId).on('value', snap=>{
          if(snap.val() !== null){
              dispatch(setActivateAccount());
              // Initialize Binanace
              // const client = Binance()
              // const client2 = Binance({
              //   apiKey: 'vPCVEYKqK16HcQ0Oq7cESs6IOHKXDLA7zw54qnA2VeDuN5JK3CrJ60ckBlb93ggN',
              //   apiSecret: '5UDkm7OBPxc5mPTfu0uy5YeeCKcraBl21J7PU2Xja73tLVb2nzKUOxtGyYSH9eD7',
              // })
              //
              // client2.time().then(time => console.log(time))

              const client = Binance()

              // Authenticated client, can make signed calls
              const client2 = Binance({
                apiKey: 'vPCVEYKqK16HcQ0Oq7cESs6IOHKXDLA7zw54qnA2VeDuN5JK3CrJ60ckBlb93ggN',
                apiSecret: '5UDkm7OBPxc5mPTfu0uy5YeeCKcraBl21J7PU2Xja73tLVb2nzKUOxtGyYSH9eD7',
              });

              client.time().then(time => console.log(time))
              client2.time().then(time => console.log(time))
            // let binance = Binance;
              // binance.options({
              //   // APIKEY: 'vPCVEYKqK16HcQ0Oq7cESs6IOHKXDLA7zw54qnA2VeDuN5JK3CrJ60ckBlb93ggN',
              //   // APISECRET: '5UDkm7OBPxc5mPTfu0uy5YeeCKcraBl21J7PU2Xja73tLVb2nzKUOxtGyYSH9eD7',
              //   APIKEY: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
              //   APISECRET: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
              //   'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
              //   'Access-Control-Allow-Origin':  '*',
              //   'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
              //   'Access-Control-Allow-Credentials':true,
              //   useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
              //   test: true // If you want to use sandbox mode where orders are simulated
              // });
            //   binance.options({
            //     APIKEY: 'vPCVEYKqK16HcQ0Oq7cESs6IOHKXDLA7zw54qnA2VeDuN5JK3CrJ60ckBlb93ggN',
            //     APISECRET: '5UDkm7OBPxc5mPTfu0uy5YeeCKcraBl21J7PU2Xja73tLVb2nzKUOxtGyYSH9eD7',
            //   'Access-Control-Allow-Origin':  '*',
            //     useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
            //     test: true
            //   });
            //   binance.balance((error, balances) => {
            //   console.log("balances()", balances);
            //
            // });
            // var AES = require("crypto-js/aes");
            //   var SHA256 = require("crypto-js/sha256");
            //   let  crypto = require('crypto');

              // let signature = crypto.createHmac('sha256', options.APISECRET).update(query).digest('hex'); // set the HMAC hash header

              // console.log(SHA256("Message"));

          }
        })

        }
    };
};
