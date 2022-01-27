import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const auth = getAuth();

const refs = {
  email: document.querySelector('.registration-form__input-email'),
  password: document.querySelector('.registration-form__input-passw'),
  repeatPassword: document.querySelector('.registration-form__input-repeat-passw'),
  registerbtn: document.querySelector('.registration-form__btn'),
  modal: document.querySelector('.registration-form__window'),
  signInBtn: document.querySelector('.sign-in__button'),
};

const createAccount = async () => {
  event.preventDefault();

  const loginEmail = refs.email.value;
  const loginPassword = refs.password.value;
  const loginRepeatPassword = refs.repeatPassword.value;

  if (loginPassword === loginRepeatPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      Notify.success('Account created and you are logged in!');
      refs.modal.classList.add('is-hidden');
      refs.signInBtn.classList.add('is-hidden');
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        Notify.failure('Ivalid email. Please, try again!');
      } else if (
        error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
        Notify.failure('Password should be at least 6 characters');
      } else if (error.message === 'Firebase: Error (auth/internal-error).') {
        Notify.failure('Check if all fields are filled correctly');
      } else if (error.message === 'Firebase: Error (auth/missing-email).') {
        Notify.failure('Enter your email, please.');
      } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        Notify.failure('Try another email.');
      } else {
        Notify.failure('Registration error. Try again');
      }
    }
  } else Notify.failure('Passwords did not match');
};

refs.registerbtn.addEventListener('click', createAccount);
