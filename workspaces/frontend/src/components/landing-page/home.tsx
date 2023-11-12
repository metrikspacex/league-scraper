import Nav from "./nav-bar/nav";
import Welcome from "./welcome/welcome";
import "../landing-page/home.scss";

export default function Home() {
  return (
    <div className="home">
      <Nav />
      <Welcome />
    </div>
  );
}
