import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpHUq_OiwvYoRlLmTYCCPwQJ4DRNmPWwY",
    authDomain: "chekov-kd.firebaseapp.com",
    projectId: "chekov-kd",
    storageBucket: "chekov-kd.appspot.com",
    messagingSenderId: "579055671597",
    appId: "1:579055671597:web:d4f4e2b635bd4b0ffd1ba4"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); 

export default function LoginForm() {

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(response => {
            setUser(response.user)
            navigate("/");
        })
        .catch(err => alert(err.message))
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                setUser(response.user)
                navigate("/");
            })
            .catch(err => alert(err.message))

    return( 
        <main>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">
                Email 
                <input type="email" name="email" />
            </label>
            <br />
            <label htmlFor="password">
                Password 
                <input type="password" name="password" />
            </label>
            <br />
            <input type="submit" value="Login" />
        </form>
        <button onClick={handleGoogle}>Login with Google</button>
        </main>
    )
    }}