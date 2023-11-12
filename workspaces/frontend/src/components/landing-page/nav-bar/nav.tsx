import "../nav-bar/nav.scss";
import logo from "../../../assets/riot-games-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Nav() {
  return (
    <nav className="container">
      <div className="logo-container">
        <img src={logo} alt="" />
      </div>

      <div className="links-container">
        <a href="" style={{ color: "#ae3335" }}>
          Home
        </a>
        <a href="">About </a>
        <a href="">Heroes</a>
        <a href="">Schedules</a>
        <a href="">Teams</a>
      </div>
      <div className="icons-container">
        <FontAwesomeIcon className="icon" icon={faTwitter} />
        <FontAwesomeIcon className="icon" icon={faFacebookF} />
        <FontAwesomeIcon className="icon" icon={faInstagram} />
      </div>
    </nav>
  );
}
