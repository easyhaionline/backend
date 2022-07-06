const asyncHandler = require('express-async-handler')
const Complaint = require('../models/Complaint')
const validateMongoID = require('../validators/id')

// to create a new complaint ********************************************************
const complaintCreate = asyncHandler(async (req, res) => {
    const {
        query,
        mobile,
        student,
        image,
        feedback,
        teacher,seprater
    } = req.body

    const newComplaint = await Complaint.create({
      query,
      mobile,
      student,
      image,
      feedback,
      teacher,seprater
    });

    if (newComplaint) {
        res.status(200).json({
            message: 'Your Complaint has been launched!',
            data: newComplaint,
        })
    } else {
        res.status(500)
        throw new Error("New Complaint can't be created at the moment! Try again later.")
    }
})

// to fetch all complaints available *******************************************************
const complaintGetAll = asyncHandler(async (req, res) => {
    const {type}  = req.params;
    console.log(req.params.type);
    let foundComplaints;
    if(req.params.type == 'All'){
        // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
                foundComplaints = await Complaint.find().where({feedback: "" }).sort({
                  createdAt: -1,
                }).populate({
                  path: 'student',
                  select: '_id username ',
              }).populate({
                path: 'teacher',
                select: '_id username ',
            });
                
    }
    else{
        foundComplaints = await Complaint.find().where({status:type,feedback: ""}).sort({ createdAt: -1 }).populate({
          path: 'student',
          select: '_id username ',
      }).populate({
        path: 'teacher',
        select: '_id username ',
    });
    }
    res.status(200).json(foundComplaints)
})

const complaintByStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let foundComplaints;
  if (req.params.id == "All") {
    console.log(req.params.id, id);

    // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
    foundComplaints = await Complaint.find() .where({feedback:""}).sort({
      createdAt: -1,
    }).populate({
      path: 'student',
      select: '_id username ',
  }).populate({
    path: 'teacher',
    select: '_id username ',
});
  } else {
    foundComplaints = await Complaint.find()
      .where({ student: id ,feedback: "" })
      .sort({ createdAt: -1 }).populate({
        path: 'student',
        select: '_id username ',
    }).populate({
      path: 'teacher',
      select: '_id username ',
  });;
  }
  res.status(200).json(foundComplaints);
});
const complaintByAllStudents = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let foundComplaints;
  if (req.params.id == "All") {
    console.log(req.params.id, id,"dasdasdasdas");

    // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
    foundComplaints = await Complaint.find().where({feedback:"",seprater:"C"}).sort({
      createdAt: -1,
    }).populate({
      path: 'student',
      select: '_id username ',
  }).populate({
    path: 'teacher',
    select: '_id username ',
});
  } else {
    foundComplaints = await Complaint.find()
      .where({ student: id ,feedback: "" })
      .sort({ createdAt: -1 }).populate({
        path: 'student',
        select: '_id username ',
    }).populate({
      path: 'teacher',
      select: '_id username ',
  });;
  }
  res.status(200).json(foundComplaints);
});
const complaintByAllTeachers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let foundComplaints;
  if (req.params.id == "All") {
    console.log(req.params.id, id);

    // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
    foundComplaints = await Complaint.find() .where({feedback:"",seprater:"T"}).sort({
      createdAt: -1,
    }).populate({
      path: 'student',
      select: '_id username ',
  }).populate({
    path: 'teacher',
    select: '_id username ',
});
  } else {
    foundComplaints = await Complaint.find()
      .where({ teacher: id ,feedback: "" })
      .sort({ createdAt: -1 }).populate({
        path: 'student',
        select: '_id username ',
    }).populate({
      path: 'teacher',
      select: '_id username ',
  });;
  }
  res.status(200).json(foundComplaints);
});
const feedbacksByStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id, id);
  let foundComplaints;
  if (req.params.id == "All") {
    // foundComplaints = await Complaint.find().sort({ createdAt: -1 }).populate("student","_id name")
    foundComplaints = await Complaint.find() .where({ query: "" }).sort({
      createdAt: -1,
    }).populate({
      path: 'student',
      select: '_id username ',
  }).populate({
    path: 'teacher',
    select: '_id username ',
})
  } else {
    foundComplaints = await Complaint.find()
      .where({ student: id,query: "" })
      .sort({ createdAt: -1 }).populate({
        path: 'student',
        select: '_id username ',
    }).populate({
      path: 'teacher',
      select: '_id username ',
  });
  }
  res.status(200).json(foundComplaints);
});


// to fetch complaints by id *******************************************************
const idGet = asyncHandler(async (req, res) => {
    const {complaintID}  = req.params;
    try {
      const foundId = await Complaint.findById(
        complaintID,
      )
      .populate({
        path: 'response',
        select: '_id answer image',
    })
      .populate({
        path: 'student',
        select: '_id username ',
    }).populate({
      path: 'teacher',
      select: '_id username ',
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
const deleteComplaint = asyncHandler(async (req, res) => {
    const { complaintID } = req.params
    try{
        const foundComplaintToDelete = await Complaint.findByIdAndDelete({ _id: complaintID })
        res.status(200).json(foundComplaintToDelete);
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
  complaintCreate,
  complaintGetAll,
  deleteComplaint,
  updateStatus,
  idGet,
  complaintByStudent,
  feedbacksByStudent,
  complaintByAllTeachers,
  complaintByAllStudents
};
