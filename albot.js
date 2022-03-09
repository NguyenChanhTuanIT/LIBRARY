// CONFIG FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";
import { signInWithPopup } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";
import { TwitterAuthProvider } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";

// INIT APP 
const firebaseConfig = {
    apiKey: "AIzaSyD3JdAVrg4YlTy75QCUBXL1JyHEEDR5vWw",
    authDomain: "twitter-32c4f.firebaseapp.com",
    projectId: "twitter-32c4f",
    storageBucket: "twitter-32c4f.appspot.com",
    messagingSenderId: "944662499362",
    appId: "1:944662499362:web:dcb16572d5a49498fe7a7b",
    measurementId: "G-8183XFYY4H"
}
const app = initializeApp(firebaseConfig);
// CONFIG FIREBASE


var loginTw = () => {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((ressult) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            console.log(ressult);
            const credential = TwitterAuthProvider.credentialFromResult(ressult);
            const token = credential.accessToken;
            const secret = credential.secret;
            // The signed-in user info.
            const user = ressult.user;
            console.log('token', token);
            console.log('token', secret);
            console.log('user', user);

            localStorage.setItem('abcxyz', `${token}:${secret}`);
            localStorage.setItem('abcxyz2', JSON.stringify(user));
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });
}



const embedArea = document.getElementById('albot-area');
// UI
var loginUi = () => {
    // area 
    var loginArea = document.createElement('div');
    loginArea.id = 'login-area';
    // btn login 
    var buttonLogin = document.createElement('button');
    buttonLogin.id = 'login-area-btn';
    buttonLogin.innerText = 'Login s'

    buttonLogin.addEventListener('click', loginTw)
    //

    // append
    loginArea.appendChild(buttonLogin);

    return loginArea;
}
if (embedArea) {
    const uiLogin = loginUi();
    console.log(uiLogin);
    embedArea.appendChild(uiLogin)
}














