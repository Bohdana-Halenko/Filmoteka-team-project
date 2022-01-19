import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvGGWNgwW7Fl_aMsfD8XyDwmTWyVohyhM',
  authDomain: 'myfirebaseproject-882db.firebaseapp.com',
  projectId: 'myfirebaseproject-882db',
  storageBucket: 'myfirebaseproject-882db.appspot.com',
  messagingSenderId: '1031388255458',
  appId: '1:1031388255458:web:ea28cf29d4fda9748e3abb',
  measurementId: 'G-JTZQ4ZJRLD',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const refs = {
  email: document.querySelector('.email__input'),
  password: document.querySelector('.password__input'),
  loginbtn: document.querySelector('.login__btn'),
  registerbtn: document.querySelector('.register__btn'),
};

const loginEmailPassword = async () => {
  event.preventDefault();
  const loginEmail = refs.email.value;
  const loginPassword = refs.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
  }
};

const createAccount = async () => {
  event.preventDefault();
  const loginEmail = refs.email.value;
  const loginPassword = refs.password.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
  }
};

refs.loginbtn.addEventListener('click', loginEmailPassword);
refs.registerbtn.addEventListener('click', createAccount);
