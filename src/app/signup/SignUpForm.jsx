import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpHUq_OiwvYoRlLmTYCCPwQJ4DRNmPWwY",
    authDomain: "chekov-kd.firebaseapp.com",
    projectId: "chekov-kd",
    storageBucket: "chekov-kd.appspot.com",
    messagingSenderId: "579055671597",
    appId: "1:579055671597:web:d4f4e2b635bd4b0ffd1ba4"
  };

export default function SignUpForm() {

    const { setUser } = useContext(authContext);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app); 
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                setUser(response.user)
                navigate("/");
            })
            .catch(err => alert(err.message))

    return( 
        <form onSubmit={handleSignup}>
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
            <input type="submit" value="Sign Up" />
        </form>
    )
    }}