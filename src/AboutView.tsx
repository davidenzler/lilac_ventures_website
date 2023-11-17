import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import gailProfile from './assets/img/gail_profile_imag4e.jpg';


var style = StyleSheet.create({
  headers:{
    paddingTop:30
  },
  companyParagraphs:{
    padding: 10,
    borderRadius:25,
    width:"60%",
    marginLeft:'20%',
    backgroundColor:'#F5F5DC',
    textAlign:'center'
    
  },
  listStyle:{
    display:'flex',
    align:'center'
  },
  aboutClient:{
    padding:10,
    borderRadius:25,
    marginLeft: '20%',
    width:'30%',
    backgroundColor:'#F5F5DC'
  },
  aboutClientImage:{
    marginLeft:'-700%'
  },
  aboutClientImageTag:{
    fontSize:8,
    marginLeft:'-700%'
  },
});

interface AboutData {
  aboutUs: string,
  ourMission: string,
  ourValues: string,
  meet: string
}

const AboutView: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/about')
      .then((response) => response.json())
      .then((data: AboutData[]) => {
        if (data && data.length > 0) {
          setAboutData(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching about data:', error);
      });
  }, []);

  return (
    <div className="about-page">
        <section className="intro-section">
        <div className="intro-text">
                <p>YOU ARE NOT POOR, YOU ARE BROKE.</p>
                <p>I CAN’T FIX POOR BUT I CAN FIX BROKE.</p>
                <p>
                    I am a DOLLARS and SENSE MOM, a certified financial coach who believes in 
                    Mind Over Money aka MINDFUL SPENDING because it gives you CONTROL over and dictates where your money goes.
                </p>
                <p>
                    But like many of you, I have made some financial mistakes that have put me in so much financial stress 
                    that I thought there was no way out of the debt hole. With focused intentionality, I was able to dig myself 
                    out and finally found financial stability and achieved a positive net worth.
                </p>
                {/* Profile image is placed here, between the paragraphs */}
                <div className="profile-container">
                    <img src={gailProfile} alt="Gail Profile" className="profile-img"/>
                </div>
                <p>
                  {aboutData && (aboutData.meet)}
                </p>
                <p>
                    YOU hold the key to your success, I am your ally in the process.
                </p>
                <button className="talk-button">LET’S TALK!</button>
            </div>
        </section>

        <section className="history-section">
            <h2>Our History</h2>
            <p>
              {aboutData && (aboutData.aboutUs)}
            </p>
            <div className="center-button">
                <button className="talk-button">LET’S TALK!</button>
            </div>
        </section>

        <section className="mission-section">
            <h2>Our Mission</h2>
            <p>{aboutData && (aboutData.ourMission)}</p>
        </section>

        <section className="values-section">
            <h2>Our Values</h2>
            <p>
              {aboutData && (aboutData.ourValues)}
            </p>
        </section>
    </div>
  );
}


export default AboutView;
