import React, { useEffect, useReducer, useState } from 'react';
import {generateDate, months,times} from "./CalendarComponents/Calendar"
import "./CalendarComponents/Calendar.css"
import cn from './CalendarComponents/cn';
import dayjs from "dayjs";
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
import axios from './api/axios';
import useAuth from './hooks/useAuth'
import { getAccountInformation } from './services/accountService';



function CalendarView(){
  interface appointment{
    date:string,
    time:string,
    user:string,
    duration:number
  }
  interface availability{
    date:string,
    time:number[]
  }
  interface admins{
    email:string
  }
  const days = ["S","M","T","W","T","F","S"];
  const meetingTypes=["Select Type","Consulation - 30 Mins","Coaching - 1Hr"]
  const currentDate=dayjs();
  const [today,setToday] =useState(currentDate);
  const [selectDate,setSelectDate]=useState(currentDate);
  const [selectDateString,setSelectDateString]=useState(selectDate.toDate().toDateString())
  const [time,setTime]=useState("Select Time")
  const [duration,setDuration]=useState(30)
  const [showNew,setShowNew]=useState(false)
  const [appts,setAppts]=useState<appointment[]>([])
  const [avail,setAvail]=useState<availability[]>([])
  const [availMap,setMap]=useState(new Map())
  const [consultTimes,setConsultTimes]=useState(["Select Times"])
  const [coachTimes,setCoachTimes]=useState(["Select Times"])
  const [slotType,setType]=useState(0)
  const [adminJSON,setAdminJSON]=useState<admins[]>([])
  const [admin,setAdmin]=useState("")
  const [,forceUpdate]=useReducer(x=>x+1,0)
  const { auth }:any = useAuth();
  const user = auth.user
  const roles = auth.roles
  const baseURL = process.env.REACT_APP_API_URL;
  const getAdmin=async()=>{
      axios.get(`${baseURL}/admins`).then((response)=>{
      setAdminJSON(response.data)
      setAdmin(adminJSON[0]?.email)
      }
      ).catch(function (error){
      console.log(error.response?.status)
      console.log("where the admin at")
    })
  }
  useEffect(()=>{
    getAdmin()
  },[admin])
  const handleTimeChange = (e:any) => {
    setTime(e.target.value)
  }
  const extractAvailList=()=>{
    try{
    var result:string[]=[]
    const tiempos= availMap.get(selectDateString)
    for(let i=0;i<tiempos.length;i+=2){
      var additions:string[]=times.slice(tiempos[i],tiempos[i+1])
      result=[...result,...additions]
    }
    var consTime:string[]=["Select Times"]
    for(let i=0;i<result.length;i++){
      if(times.indexOf(result[i])+1==times.indexOf(result[i+1])&&times.indexOf(result[i])+2==times.indexOf(result[i+2])&&i+1!=times.length-1&&i+2!==times.length-1){
        consTime=[...consTime,result[i]]
      }
    }
    consTime=consTime.filter((value,index)=>consTime.indexOf(value)===index)
    setConsultTimes(consTime)
    var coachTime:string[]=["Select Times"]
    for(let i=0;i<result.length;i++){
      if(times.indexOf(result[i])+1==times.indexOf(result[i+1])&&times.indexOf(result[i])+2==times.indexOf(result[i+2])&&times.indexOf(result[i])+3==times.indexOf(result[i+3])&&times.indexOf(result[i])+4==times.indexOf(result[i+4])&&i+3!=times.length-1&&i+2!==times.length-1&&i+1!=times.length-1&&i+4!=times.length-1){
        coachTime=[...coachTime,result[i]]
      }
    }
    coachTime=coachTime.filter((value,index)=>coachTime.indexOf(value)===index)
    setCoachTimes(coachTime)
    }catch{
      setConsultTimes(["Select Times"])

    }
    forceUpdate()
    return([])
  }
  const setAvailMap=()=>{
  for(let i=0;i<avail.length;i++){
    availMap.set(avail[i].date,avail[i].time)
  }
  }
  const getAvailability=async()=>{
    const getAvailURL=`${baseURL}/availability/`
    axios.get(getAvailURL).then((response)=>{
      setAvail(response.data)
      setAvailMap()
      
    }).catch(function (error){
      if(error.response?.status === 400){
        console.log("Data missing from appointment JSON");
      }
      else if(error.response?.status === 401){
        console.log("Unauthorized access");
      }
      else{
        console.log("oops")
      }
    })
    
  }
  useEffect(()=>{
    getAvailability()
  },[avail])
  
  const handleApptType=(e:any) => {
    if (e.target.value==2){
      setDuration(60)
      setType(2)
    }
    else if(e.target.value==1){
      setDuration(30)
      setType(1)
    }else{
      setType(0)
    }

  }
  const toggleNew = () =>{
    extractAvailList()
    setType(0)
    setShowNew((showNew)=>!showNew)
    forceUpdate()
  }
  const setApptURL=`${baseURL}/appointments`
  const scheduleAppts= async (e:any)=>{
     e.preventDefault()
     if(time!="Select Time"){
    toggleNew()
    try{const response: any = await axios.post(setApptURL, JSON.stringify({date:selectDateString,time:time,user:user,duration:duration}),
    {
      headers: { 'Content-Type' : 'application/json'}
    });
    forceUpdate()
  }
  catch (error:any){
    if(error.response?.status === 400){
      console.log("Data missing from appointment JSON");
    }
    else if(error.response?.status === 401){
      console.log("Unauthorized access");
    }
    else{
      console.log(error.response?.status)
    }
  }
    const startTime=times.indexOf(time)

    const windows= availMap.get(selectDateString)
    var left=0
    for(let i=0;i<windows.length;i+=2){
        if(windows[i]<times.indexOf(time)&&windows[i+1]>times.indexOf(time)){
          left=i
        }
      }
    var newTimes=availMap.get(selectDateString)
    if(duration==30){
      const endTime=startTime+2
      newTimes.splice(left+1,0,startTime)
      newTimes.splice(left+2,0,endTime)
    }
    else{
      const endTime=startTime+4
      newTimes.splice(left+1,0,startTime)
      newTimes.splice(left+2,0,endTime)
    }
    newTimes=newTimes.sort((a: number,b: number) => a-b)
    var temp:number[]=[]
    for(let i=0;i<newTimes.length;i++){
      var dup=0
      for(let j=0;j<newTimes.length;j++){
        if(newTimes[i]==newTimes[j]){
          dup++
        }
      }
      if(dup==1){
        temp.push(newTimes[i])
      }
    }
    console.log(temp)
    const setAvailURL= `${baseURL}/availability/date/${selectDateString}`
    try{const response: any = await axios.post(setAvailURL, JSON.stringify({dates:selectDateString,time:temp}),
    {
      headers: { 'Content-Type' : 'application/json'}
    });
    getAvailability()
    forceUpdate()
  }
  catch (error:any){
    if(!error.response){
      console.log("bad avail reset");
    }
    else if(error.response?.status === 400){
      console.log("Yowza");
    }
    else if(error.response?.status === 401){
      console.log("Unauthorized access");
    }
    else{
      console.log("nope")
    }
  }
  try{
  const sendMessageURL = `${baseURL}/messages`
  var res = await axios.post(sendMessageURL,{senderEmail:admin,receiverEmail:user,subject:`New Appointment ${selectDateString}`,content:`New Appointment created for ${selectDateString} at ${time}.\n This is an automated message, please do not reply`})
  console.log(res.data)
  res = await axios.post(sendMessageURL,{senderEmail:user,receiverEmail:admin,subject:`New Appointment ${selectDateString}`,content:`New Appointment created for ${selectDateString} at ${time} with ${user}.\n This is an automated message, please do not reply`})
  console.log(res.data)
  }catch{

  }
}
  getAvailability()
  forceUpdate()
}
  var dates: string | string[]=[]
  const getAppts= async()=>{
    if(roles==="admin"){
      const getApptsURL=`${baseURL}/appointments/`
      axios.get(getApptsURL).then((response)=>{setAppts(response.data)}).catch(function (error){
      if(error.response?.status === 400){
        console.log("Data missing from appointment JSON");
      }
      else if(error.response?.status === 401){
        console.log("Unauthorized access");
      }
    })
    }else{
    const getApptsURL=`${baseURL}/appointments/user/${user}`
    axios.get(getApptsURL).then((response)=>{setAppts(response.data)}).catch(function (error){
      if(!error.response){
        console.log("bad customer get");
      }
      else if(error.response?.status === 400){
        console.log("Data missing from appointment JSON");
      }
      else if(error.response?.status === 401){
        console.log("Unauthorized access");
      }
      else{
        console.log("Login failed")
      }
    })
  }
  }
  useEffect(()=>{
    getAppts()
  },[appts])
  
  const delAppt=async(date:string,time:string,duration:Number,apptUser:string)=>{
    getAvailability()
    const url="/appointments/del/"+date+"/"+time
    try{
      const response = await axios.post(url)
    }
    catch (error:any){
      if(!error.response){
        console.log("bad appt get");
      }
      else if(error.response?.status === 400){
        console.log("Data missing from appointment JSON");
      }
      else if(error.response?.status === 401){
        console.log("Unauthorized access");
      }
      else{
        console.log("Login failed")
      }
    }
    var startTime=times.indexOf(time)
    var endTime
    if(duration==30){
      endTime=startTime+2
    }else{
      endTime=startTime+4
    }
      var newTimes=availMap.get(date)
      newTimes.push(startTime)
      newTimes.push(endTime)
      newTimes=newTimes.sort((a: number,b: number) => a-b)
      var temp:number[]=[]
    for(let i=0;i<newTimes.length;i++){
      var dup=0
      for(let j=0;j<newTimes.length;j++){
        if(newTimes[i]==newTimes[j]){
          dup++
        }
      }
      if(dup==1){
        temp.push(newTimes[i])
      }
    }
    console.log(temp)
    const setAvailURL= `${baseURL}/availability/date/${selectDateString}`
    try{const response: any = await axios.post(setAvailURL, JSON.stringify({dates:selectDateString,time:temp}),
      {
        headers: { 'Content-Type' : 'application/json'}
      });
      forceUpdate()
    }
    catch (error:any){
      if(!error.response){
        console.log("bad avail get");
      }
      else if(error.response?.status === 400){
        console.log("Yowza");
      }
      else if(error.response?.status === 401){
        console.log("Unauthorized access");
      }
      else{
        console.log("nope")
      }
    }
    try{
      const sendMessageURL = `${baseURL}/messages`
      var res = await axios.post(sendMessageURL,{senderEmail:admin,receiverEmail:apptUser,subject:`Canceled Appointment ${selectDateString}`,content:`NCanceled Appointment for ${selectDateString} at ${time}.\n This is an automated message, please do not reply`})
      console.log(res.data)
      res = await axios.post(sendMessageURL,{senderEmail:apptUser,receiverEmail:admin,subject:`Canceled Appointment ${selectDateString}`,content:`Caneled Appointment  for ${selectDateString} at ${time} with ${user}.\n This is an automated message, please do not reply`})
      console.log(res.data)
      }catch{
    
      }
    setShowNew(false)
  }
  for(let i=0;i<appts.length;i++){
    dates[i]=appts[i].date
  }
  //JSON.parse(raw_dates)
  return (
    <div className="flex">
    <div className="bg-white w-1/2">
      <div className="flex justify-between">
        <h1>{months[today.month()]}
 {today.year()}</h1>      <div className='flex items-center gap-3'>
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
                  setShowNew(false)
                  extractAvailList()                   
                  forceUpdate()
                }}>{date.date()}</h1>
            </div>
        );
    })}
  </div>
  </div>
  <div>
    <h1 className="mx-4 text-lg">Appointments for {selectDate.toDate().toDateString()}</h1>
    <div>{appts.map((appts,i)=>appts.date===selectDate.toDate().toDateString()&&<ul className='text-center'><li  className="text-center">{appts.date} at {appts.time}</li>{roles=="admin"&&<li>with {appts.user}</li>}<li><button className='bg-red/75 rounded-sm text-white' onClick={()=>delAppt(appts.date,appts.time,appts.duration,appts.user)}>Cancel Appointment</button></li></ul>)}</div>
    <br></br>
    {!showNew&&roles!="admin"&&<button className='text-white bg-blue/75 rounded-sm text-center' onClick={()=>{toggleNew()}}>Schedule an Appointment</button>}
    <br />
    <br />
    {showNew &&<form>
      <input type="text" value={selectDate.toDate().toDateString()} disabled></input>
      <br />
      <br />      
      <select onChange={handleApptType}>{meetingTypes.map((meetingTypes,i)=><option value={i}>{meetingTypes}</option>)}</select>
      <br></br>
      <br></br>
      {slotType==1&&<select onChange={handleTimeChange}>{consultTimes.map((consultTimes)=><option value={consultTimes}>{consultTimes}</option>)}</select>}
      {slotType==2&&<select onChange={handleTimeChange}>{coachTimes.map((coachTimes)=><option value={coachTimes}>{coachTimes}</option>)}</select>}
      <br></br>
      <br></br>
      <button className='text-white bg-blue/75 rounded-sm text-center' onClick={scheduleAppts}>Schedule Appointment</button>
      <br></br>
      <br></br>
      <button className='text-white bg-red/75 rounded-sm text-center' onClick={toggleNew}>Cancel</button>
    </form>}
  </div>
  </div>
  );
}

export default CalendarView;