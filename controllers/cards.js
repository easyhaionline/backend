const fs = require("fs")
const formidable = require('formidable');
const Card = require("../models/Cards")
const { errorHandler } = require("../helpers/errorHandler");
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash")

exports.create = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            });
        }
        if (!description || !description.length) {
            return res.status(400).json({
                error: 'description is required'
            });
        }
        if (!req.file)
            return res.status(400).json({ message: "Select your file" })
        let uploadedFile = UploadApiResponse
        console.log("Let File", uploadedFile);
        // Image Uploading
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "image",
                resource_type: "auto"
            })
        }
        catch (err) {
            console.log("Line1", err.message);
            res.status(400).json({ message: "Server Error:(" })
        }

        // Database upload 
        const { secure_url } = uploadedFile;
        console.log(secure_url);
        let card = new Card();
        console.log(card);
        card.card_icon_url = secure_url,
            card.title = title,
            card.description = description,

            card.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.status(result);
            });

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Line 3 Server Error:(" })
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    Card.findById(id).exec(async (err, oldCards) => {
        console.log("old Banner url --> ", oldCards);
        try {
            const { title, description } = req.body
            console.log(title,description);

            if (!title || !title.length) {
                return res.status(400).json({
                    error: 'title is required'
                });
            }
        
            if (!description || !description.length) {
                return res.status(400).json({
                    error: 'description is required'
                });
            }
        


            if (!req.file)
                return res.status(400).json({ message: "Select your file" })

            let uploadedFile = UploadApiResponse
            console.log("Let File", uploadedFile);
            // Image Uploading
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: "image",
                    resource_type: "auto"
                })
            }
            catch (err) {
                console.log("Line1", err.message);
                res.status(400).json({ message: "Server Error:(" })
            }

            // Database upload 
            const { secure_url } = uploadedFile;
            console.log(secure_url);
            console.log(oldCards);
            oldCards.card_icon_url = secure_url,
                oldCards.title = title,
                oldCards.description = description,
                oldCards.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    return res.json(result);
                });

        } catch (err) {
            console.log(err.message);
            res.status(400).json({ message: "Line 3 Server Error:(" })
        }
    })
}

exports.list = (req, res) => {
    Card.find({})
        .select('title description card_icon_url')
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
    Card.findById(id)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data)
        })
}

exports.remove = (req, res) => {
    const id = req.params.id;
    Card.findByIdAndRemove(id).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            })
        }
        res.json({ message: 'Card Deleted Successfully' });
    })
}



