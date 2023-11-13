import "../nav-bar/nav.scss";

import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "@/assets/riot-games-logo.png";

export default function Nav() {
  return (
    <nav className="container">
      <div className="logo-container">
        <img alt="logo" src={logo} />
      </div>
      <div className="links-container">
        <a href="#home" style={{ color: "#ae3335" }}>
          Home
        </a>
        <a href="#about">About </a>
        <a href="#heroes">Heroes</a>
        <a href="#schedules">Schedules</a>
        <a href="#teams">Teams</a>
      </div>
      <div className="icons-container">
        <FontAwesomeIcon className="icon" icon={faTwitter} />
        <FontAwesomeIcon className="icon" icon={faFacebookF} />
        <FontAwesomeIcon className="icon" icon={faInstagram} />
      </div>
    </nav>
  );
}
