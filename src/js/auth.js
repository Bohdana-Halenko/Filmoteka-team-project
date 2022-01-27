import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const auth = getAuth();
// connectAuthEmulator(auth, 'http://localhost:9099');
const refs = {
  email: document.querySelector('.login-form__input-log'),
  password: document.querySelector('.login-form__input-passw'),
  loginbtn: document.querySelector('.login-form__btn-login'),
  modal: document.querySelector('.login-form__window'),
  signInBtn: document.querySelector('.sign-in__button'),
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
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/invalid-email).') {
      Notify.failure('Ivalid email. Please, try again!');
    } else if (error.message === 'Firebase: Error (auth/internal-error).') {
      Notify.failure('Check if all fields are filled correctly');
    } else Notify.failure('Login error:( Try again!');
  }
};

refs.loginbtn.addEventListener('click', loginEmailPassword);
