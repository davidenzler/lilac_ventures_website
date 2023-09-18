const Appointment =require("../model/Appointment.ts");

const addAppointment= async (res,req) => {
 
    const {date,time,user,duration}=req.body;
    if(!date||!time||!user||!duration) return res.status(400).json({'message': 'Incomplete appointment. Please choose date, time, and appointment type.'});
    try{
        const appointment = new Appointment(date,time,user,duration);
        await appointment.save();
        res.status(200).json({ message: 'Appointment added successfully!' });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
    
}
const delAppointment= async (res,req) => {
    const {date,time} = req.params;
    if(!date||!time) return res.status(400).json({'message': 'Missing Search Date and Time'})
    try{
        await Appointment.remove({date:date,time:time}).exec();
        res.status(200).json({ message: 'Appointment deleted successfully!' });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const editAppointment= async (res,req) => {
    const{oldDate,oldTime}=req.params;
    const {date,time,user,duration}=req.body;
    if(!date||!time||!user||!duration) return res.status(400).json({'message': 'Incomplete appointment. Please choose date, time, and appointment type.'});
    if(!oldDate||!oldTime) return res.status(400).json({'message': 'Missing Search Date and Time'})
    try{
        await Appointment.remove({date:oldDate,time:oldTime});
        const appointment = new Appointment(date,time,user,duration);
        await appointment.save();
        res.status(200).json({ message: 'Appointment edited successfully!' });
    }catch(err){

    }
}
const getAppointments= async (res,req) => {
    const {user} = req.params;
    if(!user) return res.status(400).json({'message': 'No user found'})
    let appts=[];
    try{
        appts= await Appointment.find({user:user});
        res.json(appts);
        res.status(200).json({ message: 'Appointment retreived successfully!' });

    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const getAllAppointments = async (res,req) => {
    let appts=[];
    try{
        appts= await Appointment.find({});
        res.json(appts);
        res.status(200).json({ message: 'Appointments retreieved successfully!' });

    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
module.exports={
    addAppointment,
    delAppointment,
    editAppointment,
    getAppointments,
    getAllAppointments
}