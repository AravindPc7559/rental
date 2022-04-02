import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC-aiJZf8uMJb2Gw2CGb22e9rBoD7E-TMI",
    authDomain: "car-rental-booking-a5524.firebaseapp.com",
    projectId: "car-rental-booking-a5524",
    storageBucket: "car-rental-booking-a5524.appspot.com",
    messagingSenderId: "216848739462",
    appId: "1:216848739462:web:372a973b0e9db960067507",
    measurementId: "G-N4C9MV0BXN"
  };


  const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };