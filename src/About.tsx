import React from 'react';
import {StyleSheet} from 'react-native';

var style = StyleSheet.create({
  headers:{
    paddingTop:30
  },
  companyParagraphs:{
    padding: 10,
    borderRadius:25,
    width:"60%",
    marginLeft:'20%',
    //backgroundClip:'content-box',
    backgroundColor:'#F5F5DC',
    textAlign:'center'
    
  },
  listStyle:{
    display:'flex'
  },
  backgroundStyle:{
    backgroundColor:'#c8a2c8'
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
    <div style={style.backgroundStyle}>
      <h1 style={style.headers}>Meet Lilac Ventures</h1>
      <p style={style.companyParagraphs}>This will be a textbox that the client can put customized text Lilac Ventures, the client's company. Text on similiar websites usually include the following sections: History, Values, Mission, Etc. Filler text is added to demonstate the effects of styling. Lorem ipsum dolor sit amet. Et libero consequatur aut velit labore qui deleniti possimus eum atque quae At ducimus repudiandae qui consequatur omnis id rerum corrupti. Qui quaerat explicabo non tenetur quia rem sint quia. Sed tempora quod et vitae eius rem dolores quod sit officia praesentium.</p>
      <h2>Our History</h2>
      <p style={style.companyParagraphs}>This is a short paragraph documenting the history of Lilac Ventures. Common events that are included are when the company was founded, major events in its growth, milestones that it has achieved, etc. </p>
      <h2>Our Mission</h2>
      <p style={style.companyParagraphs}>Short paragraph with Lilac Ventures mission statement, who it wants to help, why, etc.  Lorem ipsum dolor sit amet. Et libero consequatur aut velit labore qui deleniti possimus eum atque quae At ducimus repudiandae qui consequatur omnis id rerum corrupti. Qui quaerat explicabo non tenetur quia rem sint quia. Sed tempora quod et vitae eius rem dolores quod sit officia praesentium.</p>
      <h2>Our Values</h2>
      <p style={style.companyParagraphs}>Short paragraph about the core values of Lilac Ventures.  Lorem ipsum dolor sit amet. Et libero consequatur aut velit labore qui deleniti possimus eum atque quae At ducimus repudiandae qui consequatur omnis id rerum corrupti. Qui quaerat explicabo non tenetur quia rem sint quia. Sed tempora quod et vitae eius rem dolores quod sit officia praesentium.</p>
      <h1>About the Client</h1>
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
