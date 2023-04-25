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
            <p style={style.paragraphs}>This will be a textbox that the client can put customized text Lilac Ventures, the client's company. Text on similiar websites usually include the following sections: History, Values, Mission, Etc. Filler text is added to demonstate the effects of styling. Lorem ipsum dolor sit amet. Et libero consequatur aut velit labore qui deleniti possimus eum atque quae At ducimus repudiandae qui consequatur omnis id rerum corrupti. Qui quaerat explicabo non tenetur quia rem sint quia. Sed tempora quod et vitae eius rem dolores quod sit officia praesentium.</p>
            <Link to='/about'>Back</Link>
        </div>
    );
}
export default History;