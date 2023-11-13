import "../welcome/welcome.scss";
import videoLeague from "../../../assets/y2mate.com - League of Legends  4K Season 2020 Cinematic Warriors Trailer ft 2WEI and Edda Hayes_1080p.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Welcome() {
  return (
    <section className="welcome container">
      <div className="video-section">
        <video src={videoLeague} autoPlay muted loop />
      </div>

      <div className="caption">
        <h1>
          Join Over <span>10 million</span> players playing everyday
        </h1>

        <p>
          Riot is your league site companion that is all accessible all devices
          and browsers.
        </p>
      </div>

      <button className="btn">
        <FontAwesomeIcon icon={faRightToBracket} />
        Register Now for Free
      </button>
    </section>
  );
}
