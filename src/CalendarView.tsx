import React, { useState } from 'react';
import {generateDate, months} from "./CalendarComponents/Calendar"
import "./CalendarComponents/Calendar.css"
import cn from './CalendarComponents/cn';
import dayjs from "dayjs";
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'



function CalendarView(){
  const days = ["S","M","T","W","T","F","S"];
  var times=["Select Time","8:00 AM PST","8:15 AM PST","8:30 AM PST","8:45 AM PST","9:00 AM PST","9:15 AM PST","9:30 AM PST","9:45 AM PST","10:00 AM PST","10:15 AM PST","10:30 AM PST","10:45 AM PST","11:00 AM PST","11:15 AM PST","11:30 AM PST","11:45 AM PST", "12:00 PM PST", "12:15 PM PST","12:30 PM PST","12:45 PM PST","1:00 PM PST","1:15 PM PST","1:30 PM PST","1:45 PM PST","2:00 PM PST","2:15 PM PST","2:30 PM PST","2:45 PM PST","3:00 PM PST","3:15 PM PST","3:30 PM PST","3:45 PM PST","4:00 PM PST","4:15 PM PST","4:30 PM PST","4:45 PM PST","5:00 PM PST"]
  const currentDate=dayjs();
  const [today,setToday] =useState(currentDate);
  const [selectDate,setSelectDate]=useState(currentDate);
  const [time,setTime]=useState("Select Date")
  const [showNew,setShowNew]=useState(false)
  const handleTimeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTime(e.target.value)
  }
  const toggleNew = () =>{
    setShowNew((showNew)=>!showNew)
    if(showNew){
      window.location.reload()
    }
  }
  const test=[{"date":today.toDate().toDateString(),"time":"3:45 PM PST"},{"date":"Fri Sep 15 2023","time":"11:00 AM PST"}]
  var dates: string | string[]=[]
  for(let i=0;i<test.length;i++){
    dates[i]=test[i].date
  }
  return (
    <div className="flex">
    <div className="bg-white">
      <div className="flex justify-between">
        <h1>{months[today.month()]} {today.year()}</h1>
      <div className='flex items-center gap-3'>
        <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={()=>{
          setToday(today.month(today.month()-1))
        }}/>
        <h4 className='grid place-conent-baseline'>{months[today.month()]}</h4>
        <GrFormNext className="w-5 h-5 cursor-pointer"onClick={()=>{
          setToday(today.month(today.month()+1))
        }} />
      </div>
      </div>
      <div className="w-full grid grid-cols-7 border-2">
        {days.map((day,index)=>{
          return(
            <h1 key={index} className='h-14 grid place-content-center'>{day}</h1>
          )
        })}
      </div>
  <div className="w-full grid grid-cols-7">
    {generateDate(today.month(),today.year()).map(({date,currentMonth,today},index) =>{
        return(
            <div className='h-14 border-2 border-black grid place-content-center'>
                <h1 key={index} className={cn(currentMonth?"":"text-gray",today?"bg-red text-white":"",dates.includes(date.toDate().toDateString())?"underline":"",selectDate.toDate().toDateString() === date.toDate().toDateString()?"bg-black text-white":"","h-50-w-50 grid place-content-center rounded-full hover:bg-blue hover:text-white transition-all cursor-pointer")} onClick={() =>{
                  setSelectDate(date)
                }}>{date.date()}</h1>
            </div>
        );
    })}
  </div>
  </div>
  <div className='content-center'>
    <h1 className="mx-4 text-lg">Appointments for {selectDate.toDate().toDateString()}</h1>
    <div>{test.map((test,i)=>test.date===selectDate.toDate().toDateString()&&<ul><li>{test.date} at {test.time}</li><li><button className='text-red'>Cancel</button></li></ul>)}</div>
    <br></br>
    {!showNew&&<button className='text-blue' onClick={()=>{toggleNew()}}>Schedule an Appointment</button>}
    <br />
    <br />
    {showNew &&<form>
      <input type="text" value={selectDate.toDate().toDateString()} disabled></input>
      <br />
      <select onChange={handleTimeChange}>{times.map((times)=><option value={times}>{times}</option>)}</select>
      <br></br>
      <button onClick={()=>toggleNew()}>Schedule</button>
    </form>}
  </div>
  </div>
  );
}

export default CalendarView;

