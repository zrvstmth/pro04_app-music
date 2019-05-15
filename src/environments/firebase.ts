import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDvNp8vzUse5c09PrtKNvusdZqYcKwBaIk",
    authDomain: "angular-app-music.firebaseapp.com",
    databaseURL: "https://angular-app-music.firebaseio.com",
    projectId: "angular-app-music",
    storageBucket: "angular-app-music.appspot.com",
    messagingSenderId: "260344593268",
    appId: "1:260344593268:web:b2746c64d716e6fb"
};
firebase.initializeApp(firebaseConfig);

export default firebase;