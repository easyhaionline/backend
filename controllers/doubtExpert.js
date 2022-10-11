const asyncHandler = require('express-async-handler')
const Doubt = require('../models/DoubtExpert')

// to create a new doubt
const doubtCreate = asyncHandler(async (req, res) => {
    const {
        student,
        question,
        examType,
        link
    } = req.body;

    const teacher = null;
    const isResolved = false;

    const newDoubt = await Doubt.create({
        student,
        question,
        examType,
        link,
        teacher,
        isResolved
    });

    if (newDoubt) {
        res.status(200).json({
            message: 'Your Doubt has been created!',
            data: newDoubt,
        })
    } else {
        res.status(500)
        throw new Error("New Doubt can't be created at the moment! Try again later.")
    }
})

// to fetch all new doubts available *******************************************************
const getNewDoubt = asyncHandler(async (req, res) => {
    const {
        skip,
        limit
    } = req.body

    Doubt.find()
        .where({teacher: null})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else return res.status(400).json({error: error})
        })
});

const takeThisDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    try{
        const doubt = await Doubt.findByIdAndUpdate({_id})
        const { teacher } = req.body;       
        doubt.teacher = teacher;
        await doubt.save();
    } catch (err){
    console.error(err);
}
})

const getStudentDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const {
        skip,
        limit
    } = req.body

    console.log("I am id", _id);
    console.log("I am body", skip, limit);

    Doubt.find()
        .where({student: _id})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .populate({
            path: 'teacher',
            select: '_id username image',
          })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else{
                return console.log("I am error: ",error);
            } 
        })
});

const getTeacherDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const {
        skip,
        limit
    } = req.body

    console.log("I am id", _id);
    console.log("I am body", skip, limit);

    Doubt.find()
        .where({teacher: _id})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .populate({
            path: 'teacher',
            select: '_id username image',
          })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else{
                return console.log("I am error: ",error);
            } 
        })
});

// to fetch all complaints available *******************************************************
// const complaintGetAll = asyncHandler(async (req, res) => {
//     const {type}  = req.params;
//     console.log(req.params.type);
//     let foundComplaints;
//     if(req.params.type == 'All'){
//                 foundComplaints = await Complaint.find().where({feedback: "" }).sort({
//                   createdAt: -1,
//                 }).populate({
//                   path: 'student',
//                   select: '_id username ',
//               }).populate({
//                 path: 'teacher',
//                 select: '_id username ',
//             });
                
//     }
//     else{
//         foundComplaints = await Complaint.find().where({status:type,feedback: ""}).sort({ createdAt: -1 }).populate({
//           path: 'student',
//           select: '_id username ',
//       }).populate({
//         path: 'teacher',
//         select: '_id username ',
//     });
//     }
//     res.status(200).json(foundComplaints)
// })

// const complaintByStudent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   let foundComplaints;
//   if (req.params.id == "All") {
//     console.log(req.params.id, id);

//     foundComplaints = await Complaint.find() .where({feedback:""}).sort({
//       createdAt: -1,
//     }).populate({
//       path: 'student',
//       select: '_id username ',
//   }).populate({
//     path: 'teacher',
//     select: '_id username ',
// });
//   } else {
//     foundComplaints = await Complaint.find()
//       .where({ student: id ,feedback: "" })
//       .sort({ createdAt: -1 }).populate({
//         path: 'student',
//         select: '_id username ',
//     }).populate({
//       path: 'teacher',
//       select: '_id username ',
//   });;
//   }
//   res.status(200).json(foundComplaints);
// });

// const complaintByAllStudents = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   let foundComplaints;
//   if (req.params.id == "All") {
//     console.log(req.params.id, id,"dasdasdasdas");

//     foundComplaints = await Complaint.find().where({feedback:"",seprater:"C"}).sort({
//       createdAt: -1,
//     }).populate({
//       path: 'student',
//       select: '_id username ',
//   }).populate({
//     path: 'teacher',
//     select: '_id username ',
// });
//   } else {
//     foundComplaints = await Complaint.find()
//       .where({ student: id ,feedback: "" })
//       .sort({ createdAt: -1 }).populate({
//         path: 'student',
//         select: '_id username ',
//     }).populate({
//       path: 'teacher',
//       select: '_id username ',
//   });;
//   }
//   res.status(200).json(foundComplaints);
// });

// const complaintByAllTeachers = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   let foundComplaints;
//   if (req.params.id == "All") {
//     console.log(req.params.id, id);

//     foundComplaints = await Complaint.find() .where({feedback:"",seprater:"T"}).sort({
//       createdAt: -1,
//     }).populate({
//       path: 'student',
//       select: '_id username ',
//   }).populate({
//     path: 'teacher',
//     select: '_id username ',
// });
//   } else {
//     foundComplaints = await Complaint.find()
//       .where({ teacher: id ,feedback: "" })
//       .sort({ createdAt: -1 }).populate({
//         path: 'student',
//         select: '_id username ',
//     }).populate({
//       path: 'teacher',
//       select: '_id username ',
//   });;
//   }
//   res.status(200).json(foundComplaints);
// });

// const feedbacksByStudent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   console.log(req.params.id, id);
//   let foundComplaints;
//   if (req.params.id == "All") {
//     foundComplaints = await Complaint.find() .where({ query: "" }).sort({
//       createdAt: -1,
//     }).populate({
//       path: 'student',
//       select: '_id username ',
//   }).populate({
//     path: 'teacher',
//     select: '_id username ',
// })
//   } else {
//     foundComplaints = await Complaint.find()
//       .where({ student: id,query: "" })
//       .sort({ createdAt: -1 }).populate({
//         path: 'student',
//         select: '_id username ',
//     }).populate({
//       path: 'teacher',
//       select: '_id username ',
//   });
//   }
//   res.status(200).json(foundComplaints);
// });

// to fetch complaints by id *******************************************************
// const idGet = asyncHandler(async (req, res) => {
//     const {complaintID}  = req.params;
//     try {
//       const foundId = await Complaint.findById(
//         complaintID,
//       )
//       .populate({
//         path: 'response',
//         select: '_id answer image',
//     })
//       .populate({
//         path: 'student',
//         select: '_id username ',
//     }).populate({
//       path: 'teacher',
//       select: '_id username ',
//   });
    
//       if(foundId){
//           return res.send(foundId);

//       }
//     } catch {
//       res.status(404);
//       throw new Error("ID Not Found!");
//     }
// })

// to delete the complaint **************************************************************
// const deleteComplaint = asyncHandler(async (req, res) => {
//     const { complaintID } = req.params
//     try{
//         const foundComplaintToDelete = await Complaint.findByIdAndDelete({ _id: complaintID })
//         res.status(200).json(foundComplaintToDelete);
//     } 
//     catch {
//         res.status(404)
//         throw new Error('Complaint Not Found!')
//     }
// })

// to update the complaint status ********************************************************
// const updateStatus = asyncHandler(async (req, res) => {
//     const { complaintID } = req.params;
//     const {status}=  req.body;
//     try{
//         const foundStatusToUpdate = await Complaint.findByIdAndUpdate(complaintID, {status}, {new : true})
//         res.send(foundStatusToUpdate);
//     }
//     catch(e){
//         res.status(404)
//         throw new Error('Complaint Not Found!')
//     }
// })

module.exports = {
  doubtCreate,
  getNewDoubt,
  takeThisDoubt,
  getStudentDoubt,
  getTeacherDoubt
  // complaintGetAll,
  // deleteComplaint,
  // updateStatus,
  // idGet,
  // complaintByStudent,
  // feedbacksByStudent,
  // complaintByAllTeachers,
  // complaintByAllStudents
};
