import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setAuthError("");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/quiz");
    } catch (error) {
      setAuthError(`${error.code}: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setAuthError("");
      await signInWithPopup(auth, provider);
      navigate("/quiz");
    } catch (error) {
      setAuthError(`${error.code}: ${error.message}. Verify Google sign-in is enabled and localhost:5173 is authorized.`);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <div className="login-options">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn" onClick={handleLogin}>Login</button>
          <button className="secondary-btn" onClick={handleGoogleLogin}>Continue with Google</button>
        </div>

        {authError && <div className="error-message">{authError}</div>}

        <p className="bottom-text">
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;