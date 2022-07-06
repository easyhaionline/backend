const asyncHandler = require('express-async-handler')
const Response = require('../models/Response')
const validateMongoID = require('../validators/id')
const Complaint = require ('../models/Complaint')

// to create a new Response ********************************************************

const ResponseCreate = asyncHandler(async (req, res) => {
    const {
        answer,
        image,
        complaint

    } = req.body

    const newResponse = await Response.create({
        answer,
        image,
        complaint
    });
    const editcomplaint  = await Complaint.findByIdAndUpdate(complaint,{response:newResponse._id}, {new : true})
    
    if (newResponse) {
        res.status(200).json({
            message: 'Your Response has been launched!',
            data: editcomplaint,
        })
    } else {
        res.status(500)
        throw new Error("New Response can't be created at the moment! Try again later.")
    }
})

// to fetch all Response available *******************************************************
const ResponseGetAll = asyncHandler(async (req, res) => {
    const {type}  = req.params;
    console.log(req.params.type);
    let foundResponse;
    if(req.params.type == 'All'){
        // foundComplaints = await Response.find().sort({ createdAt: -1 }).populate("student","_id name")
                foundResponse = await Response.find().populate({
                  path: 'response',
                  select: '_id answer image',
              }).sort({
                  createdAt: -1,
                });
                
    }
    else{
        foundResponse = await Response.find().where({status:type}).populate({
          path: 'response',
          select: '_id answer image',
      }).sort({ createdAt: -1 });
    }
    res.status(200).json(foundComplaints)
})

const complaintByStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id, id);
  let foundComplaints;
  if (req.params.type == "All") {
    // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
    foundComplaints = await Complaint.find().populate({
      path: 'response',
      select: '_id answer image',
  }).sort({
      createdAt: -1,
    });
  } else {
    foundComplaints = await Complaint.find()
      .where({ student: id ,feedback: "" }).populate({
        path: 'response',
        select: '_id answer image',
    })
      .sort({ createdAt: -1 });
  }
  res.status(200).json(foundComplaints);
});
const feedbacksByStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id, id);
  let foundComplaints;
  if (req.params.type == "All") {
    // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
    foundComplaints = await Complaint.find().populate({
      path: 'response',
      select: '_id answer image',
  }).sort({
      createdAt: -1,
    });
  } else {
    foundComplaints = await Complaint.find()
      .where({ student: id,query: "" }).populate({
        path: 'response',
        select: '_id answer image',
    })
      .sort({ createdAt: -1 });
  }
  res.status(200).json(foundComplaints);
});


// to fetch complaints by id *******************************************************
const idGet = asyncHandler(async (req, res) => {
    const {complaintID}  = req.params;
    try {
      const foundId = await Complaint.findById(
        complaintID,
      ).populate({
        path: 'response',
        select: '_id answer image',
    });
      if(foundId){
          return res.send(foundId);

      }
    } catch {
      res.status(404);
      throw new Error("ID Not Found!");
    }
})

// to delete the complaint **************************************************************
const deleteResponse = asyncHandler(async (req, res) => {
    const { responseID } = req.params
    try{
        const foundResponseToDelete = await Response.findByIdAndDelete({ _id: responseID })
        res.status(200).json(foundResponseToDelete);
    } 
    catch {
        res.status(404)
        throw new Error('Complaint Not Found!')
    }
})

// to update the complaint status ********************************************************
const updateStatus = asyncHandler(async (req, res) => {
    const { complaintID } = req.params;
    const {status}=  req.body;
    try{
        const foundStatusToUpdate = await Complaint.findByIdAndUpdate(complaintID, {status}, {new : true})
        res.send(foundStatusToUpdate);
    }
    catch(e){
        res.status(404)
        throw new Error('Complaint Not Found!')
    }
})


module.exports = {
    ResponseCreate,
    ResponseGetAll,
  deleteResponse,
  updateStatus,
  idGet,
  complaintByStudent,
  feedbacksByStudent
};
