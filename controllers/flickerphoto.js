const { body } = require("express-validator");
const { errorHandler } = require("../helpers/errorHandler");
const FlickerPhoto = require('../models/FlickerPhoto');
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash")

exports.uploadphotos = async (req, res) => {
    try {
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
            console.log("Upload files", uploadedFile);
        }
        catch (err) {
            console.log("Line1", err.message);
            res.status(400).json({ message: "Server Error:(" })
        }

        // Database upload 
        const { secure_url } = uploadedFile;
        console.log(secure_url);
        let flickerPhoto = new FlickerPhoto();
        flickerPhoto.photos_url = secure_url;
        flickerPhoto.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            return res.json(result);
        });

    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: "Line 3 Server Error:(" })
    }
}

exports.getphoto = (req, res) => {
    const id = req.params.id
    FlickerPhoto.find({}).
        select('photos_url')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            return res.json(data)
        })
}


exports.read = (req, res) => {
    const id = req.params.id
    FlickerPhoto.findById(id)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data)
        })
}

exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Id", id);
    FlickerPhoto.findById(id).exec(async (err, oldFlickerPhoto) => {
        console.log("old Flicker Photo url --> ", oldFlickerPhoto);
        try {
            console.log("Req file", req.file.path)
            if (!req.file) {
                return res.status(400).json({ message: "Select your file" })
            }
            let uploadedFile = UploadApiResponse

            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: "image",
                    resource_type: "auto"
                })
            }
            catch (err) {
                console.log("Line 1 -> ", err.message);
                res.status(400).json({ message: "Line 2  Server Error:(" })
            }
            const { secure_url } = uploadedFile;
            console.log("old banner", oldFlickerPhoto);
            oldFlickerPhoto.photos_url = secure_url;
            oldFlickerPhoto.save((err, result) => {
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
    }
    );
}

exports.remove = (req, res) => {
    const id = req.params.id;
    FlickerPhoto.findByIdAndRemove(id).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            })
        }
        res.json({ message: 'Flicker Photos Deleted Successfully' });
    })
}