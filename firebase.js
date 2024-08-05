import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARYBUhaMozOaLyANk_hgmT7sEfxho7ROc",
  authDomain: "pantry-management-cb281.firebaseapp.com",
  projectId: "pantry-management-cb281",
  storageBucket: "pantry-management-cb281.appspot.com",
  messagingSenderId: "732628986046",
  appId: "1:732628986046:web:b6efeba24e23e674f096ef",
  measurementId: "G-2RN913RMDG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const storage = firebase.storage();

auth.signInAnonymously()
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Anonymous sign-in failed', error);
  });

export { auth, storage };
export default firebase;