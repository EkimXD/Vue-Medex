import Firebase from 'firebase/firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDWSpnEOiKkBSeoR3f5iwgdMO_sTIOCiIM",
    authDomain: "medex-4c5af.firebaseapp.com",
    databaseURL: "https://medex-4c5af.firebaseio.com",
    projectId: "medex-4c5af",
    storageBucket: "medex-4c5af.appspot.com",
    messagingSenderId: "926712423886",
    appId: "1:926712423886:web:b0109f6422a96fc3ee779f"
};
// Initialize Firebase
const app=Firebase.initializeApp(firebaseConfig);

export const db = app.firestore()