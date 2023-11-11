import React, { useEffect, useReducer, useState } from 'react';
import {generateDate, months,times} from "./CalendarComponents/Calendar"
import "./CalendarComponents/Calendar.css"
import cn from './CalendarComponents/cn';
import dayjs from "dayjs";
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
import axios from './api/axios';
import useAuth from './hooks/useAuth'




function CalendarView(){
  interface appointment{
    date:string,
    time:string,
    user:string,
    duration:number
  }
  const days = ["S","M","T","W","T","F","S"];
  const currentDate=dayjs();
  const [today,setToday] =useState(currentDate);
  const [selectDate,setSelectDate]=useState(currentDate);
  const [selectDateString,setSelectDateString]=useState(selectDate.toDate().toDateString())
  const [showNew,setShowNew]=useState(false)
  const [appts,setAppts]=useState<appointment[]>([])
  const [,forceUpdate]=useReducer(x=>x+1,0)
  const { auth }:any = useAuth();
  const user = auth.user
  const roles = auth.roles
  const toggleNew = () =>{
    setShowNew((showNew)=>!showNew)
  }
  const dates=today.toDate().toDateString()
  return (
    
    <div className="flex ">
    
    <div className="bg-white w-1/2">
      <div className="flex justify-between">
        <h1>{months[today.month()]}
 {today.year()}</h1>
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
                  setSelectDateString(date.toDate().toDateString())
                }}>{date.date()}</h1>
            </div>
        );
    })}
  </div>
  </div>
  <div>
    <h1 className="mx-4 text-lg">Appointments for {selectDate.toDate().toDateString()}</h1>
    <br></br>
    {!showNew&&<button className='text-white bg-blue/75 rounded-sm text-center' onClick={()=>{toggleNew()}}>Set Availability</button>}
    <br />
    <br />
    {showNew &&<form>
      <input type="text" className="items-center justify-center text-center place-content-center" value={selectDate.toDate().toDateString()} disabled></input>
      <br />
      <br />
      <p>Start Time: </p>
      <select>{times.map((times)=><option value={times}>{times}</option>)}</select>
      <br></br>
      <br></br>
      <p>to:</p>
      <select>{times.map((times)=><option value={times}>{times}</option>)}</select>
      <br></br>
      <br></br>
      <button className='bg-red/75 rounded-sm text-white' onClick={()=>toggleNew()}>Cancel</button>
    </form>}
  </div>
  </div>
  );
}

export default CalendarView;