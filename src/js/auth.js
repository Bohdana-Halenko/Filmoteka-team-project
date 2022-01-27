import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const auth = getAuth();
// connectAuthEmulator(auth, 'http://localhost:9099');
const refs = {
  email: document.querySelector('.login-form__input-log'),
  password: document.querySelector('.login-form__input-passw'),
  loginbtn: document.querySelector('.login-form__btn-login'),
  modal: document.querySelector('.login-form__window'),
  signInBtn: document.querySelector('.sign-in__button'),
  logOutBtn: document.querySelector('.nav-list__item-log-in'),
};

const loginEmailPassword = async () => {
  event.preventDefault();

  const loginEmail = refs.email.value;
  const loginPassword = refs.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    Notify.success('You are logged in!');
    refs.modal.classList.add('is-hidden');
    refs.signInBtn.classList.add('is-hidden');
    refs.signInBtn.classList.add('backdrop');
    refs.logOutBtn.classList.remove('backdrop');
    refs.logOutBtn.classList.remove('is-hidden');
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/invalid-email).') {
      Notify.failure('Ivalid email. Please, try again!');
    } else if (error.message === 'Firebase: Error (auth/internal-error).') {
      Notify.failure('Check if all fields are filled correctly');
    } else if (error.message === 'FirebaseError: Firebase: Error (auth/wrong-password).') {
      Notify.failure('Wrong email or password');
    } else Notify.failure('Login error:( Try again!');
    console.log(error);
  }
};

refs.loginbtn.addEventListener('click', loginEmailPassword);

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
    }
  });
};

monitorAuthState();

const logOut = async () => {
  event.preventDefault();
  await signOut(auth);
  refs.signInBtn.classList.remove('is-hidden');
  refs.signInBtn.classList.remove('backdrop');
  refs.logOutBtn.classList.add('backdrop');
  refs.logOutBtn.classList.add('is-hidden');
  Notify.info("You're logged out.");
};

refs.logOutBtn.addEventListener('click', logOut);
