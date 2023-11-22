import "../welcome/welcome.scss";
import videoLeague from "@/assets/y2mate.com - League of Legends  4K Season 2020 Cinematic Warriors Trailer ft 2WEI and Edda Hayes_1080p.mp4";
import leaguePlays from "@/assets/y2mate.com - Awaken  Season 2019 Cinematic  League of Legends ft Valerie Broussard_1080p.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import armor from "@/assets/armor.png";
import award from "@/assets/award.png";
import cinema from "@/assets/cinema.png";
import item from "@/assets/league-items.png";
import runes from "@/assets/league-runes.png";
import lores from "@/assets/league-story.png";
import {
  faRightToBracket,
  faPlayCircle,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Welcome() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(!isModalOpen);
  };

  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

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
          <h2>
            Check Some of Our <span style={{ color: "#ae3335" }}>League</span>{" "}
            Videos
          </h2>
          <FontAwesomeIcon className="icon" icon={faPlayCircle} />
          <p>Watch the video</p>
        </div>
        <div className="video-container">
          <video src={leaguePlays} autoPlay muted loop></video>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close">
                <FontAwesomeIcon icon={faClose} />
              </button>
              <div className="modal-content">
                <video src={leaguePlays} autoPlay controls muted></video>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="riot-features container">
        <h2>
          What <span style={{ color: "#ae3335" }}>Riot Games </span>
          Can Offer?
        </h2>

        <div className="grid">
          <div className="feature">
            <img src={armor} alt={armor} />
            <h4>Check the Heroes</h4>
            <p>
              Check the League of Legends heroes and know more about their bio
              as well as skills.
            </p>
          </div>
          <div className="feature">
            <img src={cinema} alt={cinema} />
            <h4>Cinema Reels of Riot Videos</h4>
            <p>
              Check the League of Legends Reels about tournaments, trailers,
              music videos and more.
            </p>
          </div>
          <div className="feature">
            <img src={award} alt={award} />
            <h4>Top Rank Players</h4>
            <p>Check the League of Legends top players in all regions as we</p>
          </div>
        </div>
      </section>

      <section className="riot-slideshow container">
        <h2>
          Dive into the <span style={{ color: "#ae3335" }}>Rift</span>
        </h2>
        <p>
          Embark on a journey through the thrilling realms of League of Legends,
          where strategy meets mayhem in this epic slideshow adventure. Unleash
          the champions, witness the battles, and dive into the heart of the
          League!
        </p>

        <div className="slideshow-wrapper">
          <div className="left-col">
            <div className="text-wrap">
              <h1>
                View <span style={{ color: "#ae3335" }}>Popular</span> Builds
              </h1>
              <p>
                Optimize your game plan with key insights and populer builds
                scouting.
              </p>

              <div
                id="hiddenImage1"
                className="img-0 mobile"
                style={{ display: "block" }}>
                <img src={item} alt={item} />
              </div>
            </div>
            <div className="text-wrap">
              <h1>
                Review <span style={{ color: "#ae3335" }}>Summoner</span> Runes
                & Masteries
              </h1>
              <p>
                Plan and test out different summoner spells for your league
                champions by checking the spells out.
              </p>
              <div
                id="hiddenImage2"
                className="img-0 mobile"
                style={{ display: "block" }}>
                <img src={runes} alt={runes} />
              </div>
            </div>
            <div className="text-wrap">
              <h1>
                Check our your favorite{" "}
                <span style={{ color: "#ae3335" }}>Champions</span> Lores
              </h1>
              <p>
                Learn more about your favorite champions and their lore. Check
                out their skills and abilities.
              </p>
              <div
                id="hiddenImage3"
                className="img-0 mobile"
                style={{ display: "block" }}>
                <img src={lores} alt={lores} />
              </div>
            </div>
          </div>
          <div className="right-col">
            <div
              id="hiddenImage1"
              className="img-0"
              style={{ display: "block" }}>
              <img src={item} alt={item} />
            </div>
            <div
              id="hiddenImage2"
              className="img-0"
              style={{ display: "block" }}>
              <img src={runes} alt={runes} />
            </div>
            <div
              id="hiddenImage3"
              className="img-0"
              style={{ display: "block" }}>
              <img src={lores} alt={lores} />
            </div>
          </div>
        </div>
      </section>

      <section className="riot-card-blog container">
        <div className="card card1">
          <div className="top-section"></div>
          <div className="text-flow">
            <h1>UPROAR TOURNAMENTS</h1>
            <button className="btn">
              <FontAwesomeIcon icon={faRightToBracket} />
              Check Now
            </button>
          </div>
        </div>
        <div className="card card2">
          <div className="top-section"></div>
          <div className="text-flow">
            <h1>
              Be One <br></br>of the Greats
            </h1>
            <button className="btn">
              <FontAwesomeIcon icon={faRightToBracket} />
              Check Now
            </button>
          </div>
        </div>
      </section>

      <div className="riot-testimonials"></div>
    </>
  );
}
