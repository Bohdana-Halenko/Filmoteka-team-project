import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';

const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099');
const refs = {
  email: document.querySelector('.login-form__input-log'),
  password: document.querySelector('.login-form__input-passw'),
  loginbtn: document.querySelector('.login-form__btn-login'),
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

refs.loginbtn.addEventListener('click', loginEmailPassword);
