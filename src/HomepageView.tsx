import money from "./assets/img/homepage-photo-gigapixel-low_res-scale-2_00x.jpg";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



const HomepageView = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/contact`;
    navigate(path);
  };
  
  return (
    <div className="homepageContainer">
    <div className="homepageCatchPhrase">
      Manage your money and gain financial freedom with{" "}
      <span className="homepageLilacColor">Lilac Financial</span>
    </div>
    <button className="homepageContactUs" onClick={routeChange}>
      Contact us!
    </button>
    <img className="homepagePhoto" src={money} alt="Logo" />
    <div className="homepageIntroduction">
      Lilac Financial provides comprehensive and expert analysis of your
      personal finances. Become more knowledgeable and responsible regarding
      your finances with the help of our personalized financial coaching.
    </div>
    <Link to="/customerPortal">Customer Portal</Link>
    <Link to="/adminPortal">Admin Portal</Link>
    <Link to="/AdminTable">Admin Table</Link>
    <Link to="/registrationForm">Registration Form</Link>
    <Link to="/EditPage">Edit</Link>
  </div>
  );
};

export default HomepageView;