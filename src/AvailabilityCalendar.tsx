import React, { useEffect, useReducer, useState } from 'react';
import {generateDate, months,times} from "./CalendarComponents/Calendar"
import "./CalendarComponents/Calendar.css"
import cn from './CalendarComponents/cn';
import dayjs from "dayjs";
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
import axios from './api/axios';
import useAuth from './hooks/useAuth'


function AvailabilityView(){
  interface availability{
    date:string,
    time:number[]
  }
  const days = ["S","M","T","W","T","F","S"];
  const currentDate=dayjs();
  const [today,setToday] =useState(currentDate);
  const [selectDate,setSelectDate]=useState(currentDate);
  const [selectDateString,setSelectDateString]=useState(selectDate.toDate().toDateString())
  const [showNew,setShowNew]=useState(false)
  const [avail,setAvail]=useState<availability[]>([])
  const [availTime,setAvailTime]=useState(times)
  const [startTime,setStartTime]=useState(0)
  const [availDisp,setAvailDisp]=useState("")
  const [endTime,setEndTime]=useState(times.length-1)
  const [,forceUpdate]=useReducer(x=>x+1,0)
  const { auth }:any = useAuth();
  const baseURL = process.env.REACT_APP_API_URL;
  var dates: string | string[]=[];
  const handleStartChange=(e:any)=>{
    setStartTime(times.indexOf(e.target.value))
  }
  const handleEndChange=(e:any)=>{
    setEndTime(times.indexOf(e.target.value))
  }
  const parseTimes= (avail:availability)=>{
    var result=""
    for(let i=0;i<avail.time.length;i+=2){
      result=result+times[avail.time[i]]+"-"+times[avail.time[i+1]]+" "
    }
    setAvailDisp(result)
  }

  const extractAvailList=(avail:availability)=>{
    if(avail.time.length!==0){
      var result:string[]=[]
    for(let i=0;i<avail.time.length;i+=2){
      result.concat(times.slice(avail.time[i],avail.time[i+1]))
    }
    setAvailTime(result)
    parseTimes(avail)
  }else{
    setAvailDisp("No Availability Set For Today")
  }
  }
  const toggleNew = () =>{
    setShowNew((showNew)=>!showNew)
  }
  const getAvailability=async()=>{
    const getAvailURL=`${baseURL}/availability`
    await axios.get(getAvailURL).then((response)=>{
      setAvail(response.data)
      checkAvail(selectDate)
      forceUpdate()
    }).catch(function (error){
    })
  }
  useEffect(()=>{
      getAvailability()
  },[avail])
  var dates: string | string[]=[]
  for(let i=0;i<avail.length;i++){
    dates[i]=avail[i].date
  }
  const setAvailability= async (e:any)=>{
    var flag=false
    getAvailability()
    for(let i=0;i<avail.length;i++){
      if(avail[i].date==selectDate.toDate().toDateString()){
        extractAvailList(avail[i])
        flag=true
      }
    }
    if(!flag){
    const setAvailURL= `${baseURL}/availability/`
    e.preventDefault()
    toggleNew()
    var sendTime=[startTime,endTime]
    sendTime=sendTime.sort((a: number,b: number) => a-b)
    console.log("new")
   try{const response: any = await axios.post(setAvailURL, JSON.stringify({date:selectDateString,time:sendTime}),
    {
      headers: { 'Content-Type' : 'application/json'}
    });
    forceUpdate()
  }
  catch (error:any){
    if(!error.response){
      console.log("bad set");
    }
    else if(error.response?.status === 400){
      console.log("Data missing from appointment JSON");
    }
    else if(error.response?.status === 401){
      console.log("Unauthorized access");
    }
    else{
    }
  }
  }
  else{
    const setAvailURL= "/availability/date/"+selectDateString
    e.preventDefault()
    toggleNew()
    var sendTime=[startTime,endTime]
    sendTime=sendTime.sort((a: number,b: number) => a-b)
    console.log("old")
    try{const response: any = await axios.post(setAvailURL, JSON.stringify({dates:selectDateString,time:sendTime}),
    {
      headers: { 'Content-Type' : 'application/json'}
    });
    forceUpdate()
  }
  catch (error:any){
    if(!error.response){
      console.log("bad edit ");
    }
    else if(error.response?.status === 400){
      console.log("Yowza");
    }
    else if(error.response?.status === 401){
      console.log("Unauthorized access");
    }
    else{
    }
  }
  }
  getAvailability()
  }
  const checkAvail=(date: dayjs.Dayjs)=>{
    var flag=false
    for(let i=0;i<avail.length;i++){
      if(avail[i].date==date.toDate().toDateString()){
        extractAvailList(avail[i])
        flag=true
      }
    }
    if(!flag){
      setAvailDisp("No Availability Set For Today")
    }
    return([])
  }
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
    <h1 className="mx-4 text-lg">Availability for {selectDate.toDate().toDateString()}</h1>
    <br></br>
    <p>{availDisp}</p>
    <br />
    {!showNew&&<button className='text-white bg-blue/75 rounded-sm text-center' onClick={()=>{toggleNew()}}>Set Availability</button>}
    <br />
    <br />
    {showNew &&<form>
      <input type="text" className="items-center justify-center text-center place-content-center" value={selectDate.toDate().toDateString()} disabled></input>
      <br />
      <br />
      <p>Start Time: </p>
      <select onChange={handleStartChange}>{times.map((availTimes)=><option value={availTimes} >{availTimes}</option>)}</select>
      <br></br>
      <br></br>
      <p>to:</p>
      <select onChange={handleEndChange}>{times.map((availTimes)=><option value={availTimes} >{availTimes}</option>)}</select>
      <br></br>
      <br></br>
      <button className='bg-blue/75 rounded-sm text-white' onClick={setAvailability}>Set Availability</button>
      <br></br>
      <br></br>
      <button className='bg-red/75 rounded-sm text-white' onClick={()=>toggleNew()}>Cancel</button>
    </form>} 
  </div>
  </div>
  );
}

export default AvailabilityView;