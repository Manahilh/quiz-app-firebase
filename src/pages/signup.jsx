import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setAuthError("");
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/quiz");
    } catch (error) {
      setAuthError(`${error.code}: ${error.message}`);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to continue</p>

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

          <button className="primary-btn" onClick={handleSignup}>Sign Up</button>
        </div>

        {authError && <div className="error-message">{authError}</div>}

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;