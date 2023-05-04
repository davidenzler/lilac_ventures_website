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
function History(){
    return(
        <div>
            <h1 style={style.headers}>Our History</h1>
            <p style={style.paragraphs}>Lilac Ventures offers financial coaching program that is focused on mindful spending. We help you understand the dynamics of income and spending and EMPOWER YOU to control your money. 

Our coaching service is not rocket science. It is based on proven strategic and progressive steps that are SIMPLE to follow and GUARANTEED to deliver the results you need as you take control of your life, while using the income and resources you have. We make your money work for you!

You want to learn more? LET’S TALK!</p>
            <Link to='/about'>Back</Link>
        </div>
    );
}
export default History;