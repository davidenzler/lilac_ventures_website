const Availability =require("../model/Availability.ts");

const addAvailability= async (req,res) => {
 
    const {date,time}=req.body;
    if(!date||!time) return res.status(400).json({'message': 'Incomplete availability. Please choose date and times'});
    try{
        const availability = Availability.create({
            "date" : date,
            "time" : time
        })
        res.sendStatus(200)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
    
}
const editAvailability= async (req,res) => {
    const date=req.params;
    const {dates,time}=req.body;
    if(!dates||!time) return res.status(400).json({'message': 'Incomplete availability. Please choose date and times'});
    try{
        await Availability.updateOne({"date":date},{"date":dates,"time":time}).exec()
        res.sendStatus(200)
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const getAvailability= async (req,res) => {
    const {date} = req.params;
    if(!date) return res.status(400).json({'message': 'No date found'})
    else{
        let avail=[];
        try{
            avail= await Availability.find({date:date});
            res.json(avail);
        }
        catch(err){
            res.status(404).json({error:err.message});
        }
    }
}
const getAllAvailabilities = async (req,res) => {
    let avail=[];
    try{
        avail= await Availability.find({});
        res.json(avail);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
module.exports={
    addAvailability,
    editAvailability,
    getAvailability,
    getAllAvailabilities
}