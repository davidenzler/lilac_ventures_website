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
    display:'flex'
  },
  aboutClient:{
    padding:10,
    borderRadius:25,
    marginLeft: '70%',
    width:'30%',
    backgroundColor:'#F5F5DC'
  },
  aboutClientImage:{
    paddingLeft: '60%'

  },
  aboutClientImageTag:{
    paddingLeft: '60%',
    fontSize:8
  },
});

function About() {
  return (
    <div>
      <h1 style={style.headers}>Meet Lilac Ventures</h1>
      <h2>Our History</h2>
      <Link to='/history'><img src='logo192.png'></img></Link>
      <h2>Our Mission</h2>
      <Link to='/mission'><img src='logo192.png'></img></Link>
      <h2>Our Values</h2>
      <Link to='/values'><img src='logo192.png'></img></Link>
      <h1>Meet Gail Tateyama</h1>
      <div style={style.listStyle}>
        <div>
          <p style={style.aboutClient}> Short paragraph introducong the client. May contain a quixk biography, relevant job experience, etc.</p>
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
