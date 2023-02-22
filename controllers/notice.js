const Notice = require("../models/notice");

const createNotes= async(req, res)=>{
    const {title, link}= req.body;
    const newnotice= await Notice.create({ title, link})
    // console.log(newnotice)
    try{
        if(newnotice){
            return res.status(201).json({ message: "Succesfully created" })
        }
    }
    catch(error){
        return res.status(500).json({error, message: "Server error"})
    }
}

const getAllNotes= async(req, res)=>{
    const getnotice= await Notice.find({})
    // console.log(getnotice)
    try{
        if(getnotice){
            return res.status(201).json({ getnotice, message: "Succesfully getNotice" })
        }
    }
    catch(error){
        return res.status(500).json({error, message: "Server error"})
    }
}

const deleteNotice= async(req, res)=>{
    const deletenotice= await Notice.findByIdAndDelete(req.params.id)
    // console.log(deletenotice)
    try{
        if(deletenotice){
            return res.status(201).json({ deletenotice, message: "Succesfully deleted" })
        }
    }
    catch(error){
        return res.status(500).json({error, message: "Server error"})
    }
}

module.exports= {
    createNotes,
    getAllNotes, 
    deleteNotice,
}