import "./welcome.scss";

import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import videoLeague from "../../../assets/y2mate.com - League of Legends  4K Season 2020 Cinematic Warriors Trailer ft 2WEI and Edda Hayes_1080p.mp4";

export default function Welcome() {
  return (
    <section className="welcome container">
      <div className="video-section">
        <video autoPlay loop muted src={videoLeague} />
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

      <button className="btn" type="button">
        <FontAwesomeIcon icon={faRightToBracket} />
        Register Now for Free
      </button>
    </section>
  );
}
