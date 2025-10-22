import "../styles/button-style.css";
import "../styles/navbar.css";
import "../styles/logo.css"
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div>
        <img className="logo" src={logo} />
        <p className="logo-title">Grasshopper</p>
      </div>
      <div>
        <p className="title-text-style">It's Quiz Time!</p>
      </div>
      <div>
        <button onClick={() => navigate("/QuizForm")} className="grasshopper-button">
          Begin Quiz
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
