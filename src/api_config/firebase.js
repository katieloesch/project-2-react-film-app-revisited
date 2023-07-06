



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc
} from 'firebase/firestore';

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyBQ9jVc_yJ5pbafHu0sLigTy5YL5bfh3lA",
        authDomain: "project2-react-film-app-dev.firebaseapp.com",
        projectId: "project2-react-film-app-dev",
        storageBucket: "project2-react-film-app-dev.appspot.com",
        messagingSenderId: "752307686484",
        appId: "1:752307686484:web:a86c3c83428088787e31c1"
      }
)

console.log('running firebase file')


export const db = getFirestore(app);

const colRef = collection(db, 'user_data');

export const getUserData = async (userId) => {
  console.log('user ID:', userId);
  const docRef = doc(db, 'user_data', userId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return { ...docSnapshot.data(), id: docSnapshot.id };
    
  } else {
    
    console.log('DB: UserData not found for');
    console.log(userId)
    return null;
  }
}

export const updateUserDataDocument = async ({user, watchList=[], watched=[], name=''}) => {
  try {
    await setDoc(doc(db, 'user_data', user.uid), {
      name: name,
      watchList: watchList,
      watched: watched
    });

    console.log('User data updated');
  } catch (error) {
    console.error('Error updating user data document:', error);
  }
}

// getUserData('mrBxbswaIvhHeuWDwyj2');


// getDocs(colRef).then((querySnapshot) => {
//   let users = [];
//   querySnapshot.docs.forEach((doc) => {
//     users.push({...doc.data(), id: doc.id});

//   })
//   console.log(users);
// }).catch((error) => (console.log(error.message)));

export const auth = app.auth();
export default app;


//DEVELOPMENT (localhost enabled)

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBQ9jVc_yJ5pbafHu0sLigTy5YL5bfh3lA",
//   authDomain: "project2-react-film-app-dev.firebaseapp.com",
//   projectId: "project2-react-film-app-dev",
//   storageBucket: "project2-react-film-app-dev.appspot.com",
//   messagingSenderId: "752307686484",
//   appId: "1:752307686484:web:a86c3c83428088787e31c1"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

//-------------------------------------------------------------------------------------------------

//PRODUCTION (localhost disabled)

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCKuOLqPcQipsg7R8h4BTZxiae2_B040PQ",
//   authDomain: "project-2-react-film-app-prod.firebaseapp.com",
//   projectId: "project-2-react-film-app-prod",
//   storageBucket: "project-2-react-film-app-prod.appspot.com",
//   messagingSenderId: "638062252971",
//   appId: "1:638062252971:web:f04993594a4183a877b8ee"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);