import React, { useEffect, useState } from 'react';
import {generateDate, months} from "./CalendarComponents/Calendar"
import "./CalendarComponents/Calendar.css"
import cn from './CalendarComponents/cn';
import dayjs from "dayjs";
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
import axios from './api/axios';



function CalendarView(){
  interface appointment{
    date:string,
    time:string,
    user:string,
    duration:number
  }
  const days = ["S","M","T","W","T","F","S"];
  var times=["Select Time","8:00 AM PST","8:15 AM PST","8:30 AM PST","8:45 AM PST","9:00 AM PST","9:15 AM PST","9:30 AM PST","9:45 AM PST","10:00 AM PST","10:15 AM PST","10:30 AM PST","10:45 AM PST","11:00 AM PST","11:15 AM PST","11:30 AM PST","11:45 AM PST", "12:00 PM PST", "12:15 PM PST","12:30 PM PST","12:45 PM PST","1:00 PM PST","1:15 PM PST","1:30 PM PST","1:45 PM PST","2:00 PM PST","2:15 PM PST","2:30 PM PST","2:45 PM PST","3:00 PM PST","3:15 PM PST","3:30 PM PST","3:45 PM PST","4:00 PM PST","4:15 PM PST","4:30 PM PST","4:45 PM PST","5:00 PM PST"]
  const meetingTypes=["Consulation - 30 Mins","Coaching - 1Hr"]
  const currentDate=dayjs();
  const user = "test user"
  const [today,setToday] =useState(currentDate);
  const [selectDate,setSelectDate]=useState(currentDate);
  const [selectDateString,setSelectDateString]=useState(selectDate.toDate().toDateString())
  const [time,setTime]=useState("Select Time")
  const [duration,setDuration]=useState(30)
  const [showNew,setShowNew]=useState(false)
  const [appts,setAppts]=useState<appointment[]>([])
  const handleTimeChange = (e:any) => {
    setTime(e.target.value)
  }
  const handleApptType=(e:any) => {
    if (e.target.value==1){
      setDuration(60)
    }
    else{
      setDuration(30)
    }

  }
  const toggleNew = () =>{
    setShowNew((showNew)=>!showNew)
  }
  const setApptURL="/appointments"
  const scheduleAppts= async (e:any)=>{
    e.preventDefault()
    toggleNew()
    try{const response: any = await axios.post(setApptURL, JSON.stringify({date:selectDateString,time:time,user:user,duration:duration}),
    {
      headers: { 'Content-Type' : 'application/json'}
    });
    window.location.reload()
  }
  catch (error:any){
    if(!error.response){
      console.log("No response");
    }
    else if(error.response?.status === 400){
      alert("Data missing from appointment JSON");
    }
    else if(error.response?.status === 401){
      alert("Unauthorized access");
    }
    else{
      alert("Login failed")
    }
  }
  }
  const test=[{"date":today.toDate().toDateString(),"time":"3:45 PM PST"},{"date":"Sun Oct 15 2023","time":"11:00 AM PST"}]
  var dates: string | string[]=[]
  
  const getApptsURL="/appointments/user/"+user

 /* const getAppts= async()=>{
    const apptResponse= await axios.get(getApptsURL,{responseType: "json"}).then(function (response) {
      return response
    })
    
    //console.log(typeof(apptResponse.data))
    return apptResponse.data
  }*/
  const getAppts= async()=>{
    axios.get(getApptsURL).then((response)=>{setAppts(response.data)})
  }
  getAppts()
  const delAppt=async(date:string,time:string)=>{
    const url="/appointments/del/"+date+"/"+time
    try{
      const response = await axios.post(url)
    }
    catch (error:any){
      if(!error.response){
        console.log("No response");
      }
      else if(error.response?.status === 400){
        alert("Data missing from appointment JSON");
      }
      else if(error.response?.status === 401){
        alert("Unauthorized access");
      }
      else{
        alert("Login failed")
      }
    }
    window.location.reload()
  }
  const editAppt=async(date:string,time:string)=>{

  }
  for(let i=0;i<appts.length;i++){
    dates[i]=appts[i].date
  }
  //JSON.parse(raw_dates)
  return (
    <div className="flex">
    <div className="bg-white">
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
    <div>{appts.map((appts,i)=>appts.date===selectDate.toDate().toDateString()&&<ul className='text-center'><li  className="text-center">{appts.date} at {appts.time}</li><li><button className='bg-red/75 rounded-sm text-white' onClick={()=>delAppt(appts.date,appts.time)}>Cancel Appointment</button></li></ul>)}</div>
    <br></br>
    {!showNew&&<button className='text-white bg-blue/75 rounded-sm text-center' onClick={()=>{toggleNew()}}>Schedule an Appointment</button>}
    <br />
    <br />
    {showNew &&<form>
      <input type="text" value={selectDate.toDate().toDateString()} disabled></input>
      <br />
      <br />
      <select onChange={handleTimeChange}>{times.map((times)=><option value={times}>{times}</option>)}</select>
      <br></br>
      <br></br>
      <select onChange={handleApptType}>{meetingTypes.map((meetingTypes,i)=><option value={i}>{meetingTypes}</option>)}</select>
      <br></br>
      <br></br>
      <button onClick={scheduleAppts}>Schedule Appointment</button>
    </form>}
  </div>
  </div>
  );
}

export default CalendarView;

