import createUserWithEmailAndPassword from 'firebase/auth';
import { auth, refs } from './fireBaseInit';

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
