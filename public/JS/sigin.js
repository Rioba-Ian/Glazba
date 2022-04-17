// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
    getAuth, GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInWithRedirect,
    signInWithPopup,
    getRedirectResult,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged, signOut
}
    from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPOSi-WHr6NlW2i2jsFt4OOVCL6pqY4fE",
    authDomain: "glazba-2a027.firebaseapp.com",
    projectId: "glazba-2a027",
    storageBucket: "glazba-2a027.appspot.com",
    messagingSenderId: "1077966760083",
    appId: "1:1077966760083:web:1e9e22ff835e2ccb7b4566",
    measurementId: "G-H8GXM3YJLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize firebase authentication, provider & database for web. 
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const database = getDatabase(app);

// twitter event listener
const twitterBtn = document.getElementById("twitterBtn")

twitterBtn.addEventListener('click', (e)=>{
    console.log("Twitter");
})

// login button event listener
// get element by ids for login button and google sigin
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', (e) => {
    var emailSignIn = document.getElementById('emailSignIn').value;
    var passwordSigIn = document.getElementById('passwordSignIn').value;

    signInWithEmailAndPassword(auth, emailSignIn, passwordSigIn)
        .then((userCredential) => {
            // signed in
            const user = userCredential;

            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: dt,
            })

            alert('User logged in!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        });
});

const googleSignIn = document.getElementById('googleBtn');

googleSignIn.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

            // name = displayName
            // email = email
            // photo = photoURL

            alert(user.displayName);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            alert(errorMessage);
        });
});

document.getElementById('facebookBtn').addEventListener('click',e=>{
    const fbProvider = new FacebookAuthProvider();

    const fbPromise = signInWithPopup(fbProvider);

    fbPromise.then(function(result){
        console.log(result);
        // ..
    }).catch(function(error){
        // ..
    })

})







