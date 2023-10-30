const Appointment =require("../model/Appointment.ts");

const addAppointment= async (req,res) => {
 
    const {date,time,user,duration}=req.body;
    if(!date||!time||!user||!duration) return res.status(400).json({'message': 'Incomplete appointment. Please choose date, time, and appointment type.'});
    try{
        const appointment = Appointment.create({
            "date" : date,
            "time" : time,
            "user" : user,
            "duration" : duration
        })
        res.sendStatus(200)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
    
}
const delAppointment= async (req,res) => {
    const {date,time} = req.params;
    if(!date||!time) return res.status(400).json({'message': 'Missing Search Date and Time'})
    try{
        await Appointment.deleteOne({date:date,time:time}).exec();
        res.sendStatus(200)
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const editAppointment= async (req,res) => {
    const{oldDate,oldTime}=req.params;
    const {date,time,user,duration}=req.body;
    if(!date||!time||!user||!duration) return res.status(400).json({'message': 'Incomplete appointment. Please choose date, time, and appointment type.'});
    try{
        await Appointment.updateOne({"date":oldDate,"time":oldTime},{"date":date,"time":time,"user":user,"duration":duration}).exec()
        res.sendStatus(200)
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const getAppointments= async (req,res) => {
    const {user} = req.params;
    if(!user) return res.status(400).json({'message': 'No user found'})
    else{
        let appts=[];
        try{
            appts= await Appointment.find({user:user});
            res.json(appts);
        }
        catch(err){
            res.status(500).json({error:err.message});
        }
    }
}
const getAllAppointments = async (req,res) => {
    let appts=[];
    try{
        appts= await Appointment.find({});
        res.json(appts);
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