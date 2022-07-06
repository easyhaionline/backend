
const formidable = require('formidable');
const Banner = require("../models/Banner");
const asyncHandler = require('express-async-handler')
const { errorHandler } = require("../helpers/errorHandler");
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash")

exports.createImages = asyncHandler(async (req, res) => {
    console.log(req.file);
    try {
        if (!req.file)
            return res.status(400).json({ message: "Select your file" })

        let uploadedFile = UploadApiResponse
        // console.log("Let File", uploadedFile);
        // Image Uploading
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "image",
                resource_type: "auto"
            })
            // console.log("Upload files", uploadedFile);
        }
        catch (err) {
            console.log("Line1", err.message);
            res.status(400).json({ message: "Server Error:(" })
        }

        // Database upload 
        const { secure_url } = uploadedFile;
        let banner = new Banner();
        banner.bannerUrl = secure_url;

        banner.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Line 3 Server Error:(" })
    }
})


exports.imagesUpload = async (req, res) => {
    console.log(req.file);
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
                 
               
            
                res.json({secure_url});


    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Line 3 Server Error:(" })
    }
}


exports.update = asyncHandler((req, res) => {
    const id = req.params.id;
    console.log("Id", id);
    Banner.findById(id).exec(async (err, oldBanner) => {
        console.log("old Banner url --> ", oldBanner);
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
                // console.log("Upload file data...", uploadedFile);
            }
            catch (err) {
                console.log("Line 1 -> ", err.message);
                res.status(400).json({ message: "Line 2  Server Error:(" })
            }

            const { secure_url } = uploadedFile;
            console.log("old banner", oldBanner);
            oldBanner.bannerUrl = secure_url;

            oldBanner.save((err, result) => {
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
})

exports.remove = (req, res) => {
    const id = req.params.id;
    Banner.findByIdAndRemove(id).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            })
        }
        res.json({ message: 'Banner Deleted Successfully' });
    })
}

exports.photo = (req, res) => {
    Banner.find({})
        .select('bannerUrl')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json({ banner: data })
        })
}


exports.read = (req, res) => {
    const id = req.params.id
    Banner.findById(id)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data)
        })
}

