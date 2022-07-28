const { body } = require("express-validator");
const { errorHandler } = require("../helpers/errorHandler");
const Batches = require('../models/Batches');
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash")
const validatebatchesInput = require('../validators/batch')
const asyncHandler = require('express-async-handler')
exports.create =asyncHandler(async (req, res) => {

    const { title,   duration, timing,  subjects,selling_price,  listed_price} = req.body
    console.log(req.body)  
    console.log(title,   duration, timing,  subjects,selling_price,  listed_price);    
    const newBatch = await Batches.create({
        title,   duration, timing,  subjects,selling_price,  listed_price
        
    })

    if (newBatch) {
        res.status(200).json({
            message: 'new Batch created successfully!',
            data: newBatch,
        })
    } else {
        res.status(500)
        throw new Error("newBatch can't be created at the moment! Try again later.")
    }
})


exports.update = (req, res) => {
    const id = req.params.id;
    Batches.findById(id).exec(async (err, oldBatches) => {

        const { title,   duration, timing,  subjects,selling_price,  listed_price } = req.body
        oldBatches.title=  title;
        oldBatches.duration=  duration;

        oldBatches.timing = timing;
        oldBatches.subjects = subjects;
        oldBatches.selling_price = selling_price;
        oldBatches.listed_price = listed_price;
        

        oldBatches.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            return res.json(result);
        });

    })
}

exports.list = (req, res) => {
    Batches.find({})
        
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data)
        })
}

exports.read = (req, res) => {
    const id = req.params.id
    Batches.findById(id)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data)
        })
}





exports.createSubjects = (req, res) => {
    const id = req.params.id;
    const { subjects } = req.body;
    Batches.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                subjects:subjects,
            },
        }
    ).then((data, err) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
};

exports.updateSubjects = (req, res) => {
    const id = req.params.id;
    Batches.findById(id).exec(async (err, oldBatches) => {

        const { subjects } = req.body

        oldBatches.subjects = subjects;

        oldBatches.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            return res.json(result);
        });

    })
}

exports.getsubjects = (req, res) => {
    Batches.find({})
        .select('subjects')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json({ Batches: data })
        })
}



exports.removesubjects = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const {  subjectid } = req.body;
    console.log( subjectid);
    console.log(id);
    Batches.findByIdAndUpdate(
        {
            _id: id,
        },
        { $pull: {  subjects: { _id:  subjectid } } },
        { new: true }
    ).then((data, err) => {
        if (err) {
            res.json(err);
        }
        return res.json(data);
    });
}


