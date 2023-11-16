import "../welcome/welcome.scss";
import videoLeague from "@/assets/y2mate.com - League of Legends  4K Season 2020 Cinematic Warriors Trailer ft 2WEI and Edda Hayes_1080p.mp4";
import leaguePlays from "@/assets/y2mate.com - Awaken  Season 2019 Cinematic  League of Legends ft Valerie Broussard_1080p.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Welcome() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling when the modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling when the modal is closed
    console.log("close btn clicked");
  };

  return (
    <>
      <section className="welcome container">
        <div className="video-section">
          <video src={videoLeague} autoPlay muted loop />
        </div>

        <div className="caption">
          <h1>
            Join Over <span>10 million</span> players playing everyday
          </h1>

          <p>
            Riot is your league site companion that is all accessible all
            devices and browsers.
          </p>
        </div>

        <button className="btn">
          <FontAwesomeIcon icon={faRightToBracket} />
          Register Now for Free
        </button>
      </section>

      <section className="game-mode container">
        <h1 style={{ fontWeight: "400" }}>Choose a game mode</h1>

        <div className="game-mode_container">
          <a href="">
            <div
              className="card"
              style={{
                background:
                  "0 0/100% url(https://cdnportal.mobalytics.gg/production/2023/07/93c557f7-lol.webp)no-repeat",
              }}>
              <span className="card-overlay"></span>
              <h3 className="card-logo">Normal Game</h3>
            </div>
          </a>
          <a href="">
            <div
              className="card"
              style={{
                background:
                  "0 0/100% 100% url(https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/07/LoL_SpiritBlossomCassiopeia-1024x576.jpg)no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <span className="card-overlay"></span>
              <h3 className="card-logo">ARAM</h3>
            </div>
          </a>
          <a href="">
            <div
              className="card"
              style={{
                background:
                  "0 0/100% 100% url(https://cdna.artstation.com/p/assets/images/images/026/900/328/large/siwei-zheng-yys-huiyeji-0.jpg?1590036319)no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}>
              <span className="card-overlay"></span>
              <h3 className="card-logo">Custom Game</h3>
            </div>
          </a>
          <a href="">
            <div
              className="card"
              style={{
                background:
                  "0 0/100% 100% url(https://i.pinimg.com/originals/33/b9/25/33b92556382be7a5eab23c80b6a55434.jpg)no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}>
              <span className="card-overlay"></span>
              <h3 className="card-logo">Rank Game</h3>
            </div>
          </a>
          <a href="">
            <div
              className="card"
              style={{
                background:
                  "0 0/100% url(https://cdnportal.mobalytics.gg/production/2023/07/3ce19dd9-tft.webp) no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}>
              <span className="card-overlay"></span>
              <h3 className="card-logo">Teamfight Tactics</h3>
            </div>
          </a>
          <a href="">
            <div
              className="card"
              style={{
                background:
                  "0 0/100% url(https://cdnportal.mobalytics.gg/production/2023/07/baa6b89c-lor.webp) no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}>
              <span className="card-overlay"></span>
              <h3 className="card-logo">Co-op vs. AI</h3>
            </div>
          </a>
        </div>
      </section>

      <section className="video-full" onClick={openModal}>
        <div className="video-caption">
          <h2>Check Some of the League Videos</h2>
          <FontAwesomeIcon className="icon" icon={faPlayCircle} />
          <p>Watch the video</p>
        </div>
        <div className="video-container">
          <video src={leaguePlays} autoPlay muted loop></video>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="modal-content">
                <video src={leaguePlays} autoPlay muted loop></video>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
