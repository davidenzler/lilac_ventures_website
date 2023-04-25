import React from 'react';
import {StyleSheet} from 'react-native';
import { Link } from 'react-router-dom';

var style = StyleSheet.create({
    headers:{
      paddingTop:30
    },
    paragraphs:{
      padding: 10,
      borderRadius:25,
      width:"60%",
      marginLeft:'20%',
      backgroundColor:'#F5F5DC',
      textAlign:'center'
    },
  });
function Mission(){
    return(
        <div>
            <h1 style = {style.headers}>Our Mission</h1>
            <p style={style.paragraphs}>Winning and changing lives through mindful spending one dollar at a time.</p>
            <Link to='/about'>Back</Link>

        </div>
    );
}
export default Mission;