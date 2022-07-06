const { body } = require("express-validator");
const { errorHandler } = require("../helpers/errorHandler");
const Footer = require('../models/Footer');
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash")


exports.create = (req, res) => {

    const { about, iconlink1, iconlink2, iconlink3, iconlink4, iconlink5, iconlink6, heading1, heading2, heading2_number, heading2_email, heading3 } = req.body
    if (!about || !about.length) {
        return res.status(400).json({
            error: 'about is required'
        });
    }

    if (!heading1 || !heading1.length) {
        return res.status(400).json({
            error: 'heading is required'
        });
    }

    if (!heading2 || !heading2.length) {
        return res.status(400).json({
            error: 'heading2 is required'
        });
    }
    if (!heading2_number || !heading2_number.length) {
        return res.status(400).json({
            error: 'heading2_number is required'
        });
    }
    if (!heading2_email || !heading2_email.length) {
        return res.status(400).json({
            error: 'heading2_email is required'
        });
    }
    if (!heading3 || !heading3.length) {
        return res.status(400).json({
            error: 'heading3 is required'
        });
    }

    let footer = new Footer({ about, iconlink1, iconlink2, iconlink3, iconlink4, iconlink5, iconlink6, heading1, heading2, heading2_number, heading2_email, heading3 });

    footer.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler("err", err),
            });
        }
        return res.json(result);
    });
}

exports.update = (req, res) => {
    const id = req.params.id;
    Footer.findById(id).exec(async (err, oldFooter) => {

        const { about, iconlink1, iconlink2, iconlink3, iconlink4, iconlink5, iconlink6, heading1, heading2, heading2_number, heading2_email, heading3 } = req.body


        if (!about || !about.length) {
            return res.status(400).json({
                error: 'about is required'
            });
        }

        if (!heading1 || !heading1.length) {
            return res.status(400).json({
                error: 'heading is required'
            });
        }

        if (!heading2 || !heading2.length) {
            return res.status(400).json({
                error: 'heading2 is required'
            });
        }
        if (!heading2_number || !heading2_number.length) {
            return res.status(400).json({
                error: 'heading2_number is required'
            });
        }
        if (!heading2_email || !heading2_email.length) {
            return res.status(400).json({
                error: 'heading2_email is required'
            });
        }
        if (!heading3 || !heading3.length) {
            return res.status(400).json({
                error: 'heading3 is required'
            });
        }

        oldFooter.about = about;
        oldFooter.heading1 = heading1;

        oldFooter.heading2 = heading2;
        oldFooter.heading2_number = heading2_number;
        oldFooter.heading2_email = heading2_email;
        oldFooter.heading3 = heading3;
        oldFooter.iconlink1 = iconlink1
        oldFooter.iconlink2 = iconlink2
        oldFooter.iconlink3 = iconlink3
        oldFooter.iconlink4 = iconlink4
        oldFooter.iconlink5 = iconlink5
        oldFooter.iconlink6 = iconlink6

        oldFooter.save((err, result) => {
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
    Footer.find({})
        .select('iconlink1 iconlink2 iconlink3 iconlink4 iconlink5 iconlink6 about heading1 heading2 heading2_number heading2_email heading3 headingList')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json({ footer: data })
        })
}

exports.read = (req, res) => {
    const id = req.params.id
    Footer.findById(id)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data)
        })
}



exports.createheadingLink = (req, res) => {

    const { headingList } = req.body

    let footer = new Footer({ headingList });

    footer.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler("err", err),
            });
        }
        return res.json(result);
    });
}


exports.editHeadingLink = (req, res) => {
    const id = req.params.id;
    const { headingList } = req.body;
    Footer.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                headingList: headingList,
            },
        }
    ).then((data, err) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
};

exports.headingupdateLink = (req, res) => {
    const id = req.params.id;
    Footer.findById(id).exec(async (err, oldFooter) => {

        const { headingList } = req.body

        oldFooter.headingList = headingList;

        oldFooter.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            return res.json(result);
        });

    })
}

exports.headinglistlink = (req, res) => {
    Footer.find({})
        .select('headingList')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json({ footer: data })
        })
}



exports.removeheadingLink = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const { headinglistid } = req.body;
    console.log(headinglistid);
    console.log(id);
    Footer.findByIdAndUpdate(
        {
            _id: id,
        },
        { $pull: { headingList: { _id: headinglistid } } },
        { new: true }
    ).then((data, err) => {
        if (err) {
            res.json(err);
        }
        return res.json(data);
    });
}

