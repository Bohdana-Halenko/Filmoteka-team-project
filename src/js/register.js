import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';

const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099');
const refs = {
  email: document.querySelector('.registration-form__input-email'),
  password: document.querySelector('.registration-form__input-passw'),
  repeatPassword: document.querySelector('.registration-form__input-repeat-passw'),
  registerbtn: document.querySelector('.registration-form__btn'),
};

const createAccount = async () => {
  event.preventDefault();
  const loginEmail = refs.email.value;
  const loginPassword = refs.password.value;
  const loginRepeatPassword = refs.repeatPassword.value;
  if (loginPassword === loginRepeatPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  } else console.log('Error');
};

refs.registerbtn.addEventListener('click', createAccount);
