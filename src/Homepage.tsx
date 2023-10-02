import React from "react";
import money from "./assets/img/homepage-photo.jpg";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "./hooks/useLogout";
import { log } from "console";
import { sign } from "crypto";

function Homepage() {
  let navigate = useNavigate();

  const logout = useLogout();

  const signOut = async() => {
    await logout();
    navigate('/homepage');
  }
  const routeChange = () => {
    let path = `/contact`;
    navigate(path);
  };

  return (
    <div>
      <span className="homepageCatchPhrase">
        Manage your money and gain financial freedom with{" "}
        <span className="homepageLilacColor">Lilac Financial</span>
      </span>
      <button className="homepageContactUs" onClick={routeChange}>
        Contact us!
      </button>
      <img className="homepagePhoto" src={money} alt="Logo" />
      <span className="homepageIntroduction">
        Lilac Financial provides comprehensive and expert analysis of your
        personal finances. Become more knowledgeable and responsible regarding
        your finances with the help of our personalized financial coaching.
      </span>
      <Link to="/customerPortal">Customer Portal</Link><br/>
    </div>
  );
}

export default Homepage;
