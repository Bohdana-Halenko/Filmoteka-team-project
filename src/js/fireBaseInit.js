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
export const auth = getAuth();

export const refs = {
  email: document.querySelector('.email__input'),
  password: document.querySelector('.password__input'),
  repeatPassword: document.querySelector('.repeat-password'),
  loginbtn: document.querySelector('.login-form__btn-login'),
  registerbtn: document.querySelector('.registration-form__btn'),
};
