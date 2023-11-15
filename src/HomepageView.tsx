import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import money from "./assets/img/homepage-photo-gigapixel-low_res-scale-2_00x.jpg";

interface HomeData {
  hero: string;
  info: string;
}

const HomepageView: React.FC = () => {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  const routeChange = () => {
    let path = `/contact`;
    navigate(path);
  };

  useEffect(() => {
    fetch('http://localhost:8080/home')
      .then((response) => response.json())
      .then((data: HomeData[]) => {
        if (data && data.length > 0) {
          setHomeData(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching home data:', error);
      });
  }, []);

  return (
    <div className="homepageContainer">
      <div className="homepageCatchPhrase">
        {homeData && (
          <>
            {homeData.hero}{' '}
          </>
        )}
        <span className="homepageLilacColor">Lilac Financial</span>
      </div>
      <button className="homepageContactUs" onClick={routeChange}>
        Contact us!
      </button>
      <img className="homepagePhoto" src={money} alt="Logo" />
      <div className="homepageIntroduction">
        {homeData && homeData.info}
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