// Import the modular Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyARYBUhaMozOaLyANk_hgmT7sEfxho7ROc",
  authDomain: "pantry-management-cb281.firebaseapp.com",
  projectId: "pantry-management-cb281",
  storageBucket: "pantry-management-cb281.appspot.com",
  messagingSenderId: "732628986046",
  appId: "1:732628986046:web:b6efeba24e23e674f096ef",
  measurementId: "G-2RN913RMDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const storage = getStorage(app);

// Sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Anonymous sign-in failed', error);
  });

export { auth, storage };
