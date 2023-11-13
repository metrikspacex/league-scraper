import "./home.scss";

import Nav from "./nav-bar/nav";
import Welcome from "./welcome/welcome";

export default function Home() {
  return (
    <div className="home">
      <Nav />
      <Welcome />
    </div>
  );
}
