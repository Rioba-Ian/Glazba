const signUpBtn = document.getElementById('signUpBtn');
const loginBtn = document.getElementById('loginBtn');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
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

// initialize firebase authentication for web. 
const auth = getAuth(app);

const database = getDatabase(app);

signUpBtn.addEventListener('click',(e)=>{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        // signed in
        const user = userCredential.user;

        set(ref(database, 'users/'+user.uid),{
            email: email
        })

        alert('Account created!');
        // .
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
        // 
    });
});




// logout.addEventListener('click',(e)=>{
//     signOut(auth).then(()=>{
//         // signout successful
//         alert('user logged out.');
//     }).catch((error)=>{
//         // no error happened.
//         const errorCode = error.code;
//         const errorMessage = error.message;

//         alert(errorMessage);
//     });
// });

export {app, auth}
