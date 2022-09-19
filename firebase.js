import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging"


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const db = getFirestore(app)

export const storage = getStorage(app);

let messaging
let token

try {
  messaging = getMessaging(app)
} catch (error) {
  console.error(error)
}

if(messaging){
  getToken(messaging, { vapidKey: 'BH36-dNfAcFxkW93CZpnSWZ9TYe0-XWdRYuv5auWXdgPgAvLZX4Zp1CAl5JU7E4r22fTmqGXLI59AUIEGNKdCUo' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
}

