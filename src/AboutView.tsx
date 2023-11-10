import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import { Link } from 'react-router-dom';


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
    <div>
      <h1 style={style.headers}>Meet Lilac Ventures</h1>
      <h2>About Us</h2>
        {aboutData && (aboutData.aboutUs)}
      <h2>Our Mission</h2>
        {aboutData && (aboutData.ourMission)}
      <h2>Our Values</h2>
        {aboutData && (aboutData.ourValues)}
      <h1>Meet Gail Tateyama</h1>
      <div style={style.listStyle}>
        <div>
          <p style={style.aboutClient}>{aboutData && (aboutData.meet)}</p>
      </div>
      <div>
          <img style={style.aboutClientImage} src="./logo192.png"></img>
          <p style={style.aboutClientImageTag}> The client's image</p>
      </div>
    </div>
    <Link to="/CalendarView">Test</Link>
    </div>
  );
}


export default AboutView;
