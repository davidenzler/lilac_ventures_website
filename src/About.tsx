import React from 'react';
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

function About() {
  return (
    <div>
      <h1 style={style.headers}>Meet Lilac Ventures</h1>
      <h2>About Us</h2>
      <Link to='/history'><img src='logo192.png'></img></Link>
      <h2>Our Mission</h2>
      <Link to='/mission'><img src='logo192.png'></img></Link>
      <h2>Our Values</h2>
      <Link to='/values'><img src='logo192.png'></img></Link>
      <h1>Meet Gail Tateyama</h1>
      <div style={style.listStyle}>
        <div>
          <p style={style.aboutClient}> 


YOU ARE NOT POOR, YOU ARE BROKE. 

I CAN’T FIX POOR BUT I CAN FIX BROKE.



I am a DOLLARS and SENSE MOM, a certified financial coach who believes in Mind Over Money aka MINDFUL SPENDING because it gives you CONTROL over and dictate where your money goes. 



But like many of you, I have made some financial mistakes that have put me in so much financial stress that I thought there was no way out of the debt hole. With focused intentionality, I was able to dig myself out and finally found financial stability and achieved a positive net worth.



I teach from experience because it is one of the most effective ways to share the lessons learned. My story is all too common that anybody can relate. The difference is not everybody is able to successfully say “I won over money”. And I DID! That’s why I make it my personal goal that YOU my clients will WIN in life one dollar at a time.



YOU hold the key to your success, I am your ally in the process.



You want to learn more? LET’S TALK!</p>
      </div>
      <div>
          <img style={style.aboutClientImage} src="./logo192.png"></img>
          <p style={style.aboutClientImageTag}> The client's image</p>
      </div>
    </div>
    </div>
  );
}

export default About;
