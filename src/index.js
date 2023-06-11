import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout
} from './ui'

import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const config = {
  apiKey: "AIzaSyDl38tCH7ISy15MEkjKt_0WB-Dma0z0M04",
  authDomain: "hoex-49878.firebaseapp.com",
  projectId: "hoex-49878",
  storageBucket: "hoex-49878.appspot.com",
  messagingSenderId: "516824075364",
  appId: "1:516824075364:web:461ee7f38b7bc21c466371"
};
const firebaseApp = initializeApp(config);

const login = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  await signInWithEmailAndPassword(auth, email, password)

}

const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    console.log(`ERROR: ${error}`)
    showLoginError(error)
  } 
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `Error login in!`
    }
  })
}

const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", login) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();
