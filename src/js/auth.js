import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const auth = getAuth();
// connectAuthEmulator(auth, 'http://localhost:9099');
const refs = {
  email: document.querySelector('.login-form__input-log'),
  password: document.querySelector('.login-form__input-passw'),
  loginbtn: document.querySelector('.login-form__btn-login'),
  modal: document.querySelector('.login-form__window'),
};

const loginEmailPassword = async () => {
  event.preventDefault();
  const loginEmail = refs.email.value;
  const loginPassword = refs.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    Notify.success('You are logged in!');
    refs.modal.classList.add('is-hidden');
  } catch (error) {
    Notify.failure('Login error:( Try again!');
    console.log(error);
  }
};

refs.loginbtn.addEventListener('click', loginEmailPassword);
