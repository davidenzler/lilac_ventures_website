import React from 'react';
import {generateDate} from "./CalendarComponents/Calendar"

function CalendarView(){
  return (
  <div className="w-96 h-96 grid grid-col-7">
    {generateDate().map(({date,currentMonth,today},index) =>{
        return(
            <div>
                <h1>{date.date()}</h1>
            </div>
        );
    })}
  </div>
  );
}
export default CalendarView;