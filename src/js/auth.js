import signInWithEmailAndPassword from 'firebase/auth';
import { auth, refs } from './fireBaseInit';

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
