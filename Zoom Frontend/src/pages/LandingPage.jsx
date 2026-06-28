import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video Call</h2>
        </div>

        <div className="navList">
          <p>Join as Guest</p>
          <p>Register</p>
          <button className="loginBtn">Login</button>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "rgba(247, 140, 19, 0.96)" }}>
              Connect
            </span>{" "}
            with your loved ones
          </h1>

          <p>Connect with anycd fro 
            one, anywhere using Apna Video Call.</p>

          <div className="getStartedBtn">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>

        <div>
          <img src="/mobile.png" alt="Video Call" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;