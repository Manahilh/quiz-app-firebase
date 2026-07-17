import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout Successful");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <h1>Welcome</h1>
        <p>You are logged in successfully.</p>
        <button className="primary-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;