import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDzHkAbKpgEkF6Y0MJ7ZJzUohWJKtg02ok",
    authDomain: "smartframe-me-souza.firebaseapp.com",
    databaseURL: "https://smartframe-me-souza.firebaseio.com",
    projectId: "smartframe-me-souza",
    storageBucket: "smartframe-me-souza.appspot.com",
    messagingSenderId: "8303914622",
    appId: "1:8303914622:web:e98ff28ce49821b8f2f22f"
  }

firebase.initializeApp(firebaseConfig)

export default firebase