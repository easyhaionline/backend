// const fs = require("fs");
// const formidable = require("formidable");
// const Pricing = require("../models/Ourpricing");
const Course = require("../models/Course");
const { errorHandler } = require("../helpers/errorHandler");
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash");
const smartTrim = require("../utils/smarttrim");
const { generateCode, regenerateCode } = require("../utils/generateCode");
exports.displaycoursecreate = async (req, res) => {
  try {




    var {
      name,
      // stream,
      // details,
      // program,
      startDate,
      subject,
      standard,
      endDate,
      actualPrice,
      discountPrice,
      description,
      // highlights,
      // location,
      classes,
      courses,
      time,
      // priority,
    } = req.body;
    console.log("request body ", req.body);

    if (!time || !time.length) {
      const start = startDate.split('-')
      const end = endDate.split('-')

      var duration = Math.abs(((parseInt(end[0]) - parseInt(start[0])) * 12) - Math.abs(parseInt(end[1]) - parseInt(start[1])))

      if (Math.abs(parseInt(end[2]) - parseInt(start[2])) >= 25)
        time = duration + 1 + " Months";

    } else {
      time += " Months"
    }

    if (!name || !name.length) {
      return res.status(400).json({
        error: "name is required",
      });
    }

    if (!description || !description.length) {
      return res.status(400).json({
        error: "description is required",
      });
    }

    if (!courses || !courses.length) {
      return res.status(400).json({
        error: "courses is required",
      });
    }

    // if (!startDate || !startDate.length) {
    //   return res.status(400).json({
    //     error: "startDate is required",
    //   });
    // }

    // if (!endDate || !endDate.length) {
    //   return res.status(400).json({
    //     error: "endDate is required",
    //   });
    // }

    if (!actualPrice || !actualPrice.length) {
      return res.status(400).json({
        error: "actualPrice is required",
      });
    }

    if (!discountPrice || !discountPrice.length) {
      return res.status(400).json({
        error: "discountPrice is required",
      });
    }

    // if (!time || !time.length) {
    //   return res.status(400).json({
    //     error: "time is required",
    //   });
    // }

    // if (!classes || !classes.length) {
    //   return res.status(400).json({
    //     error: "point_three is required",
    //   });
    // }

    if (!req.file) return res.status(400).json({ message: "Select your file" });

    let uploadedFile = UploadApiResponse;
    // console.log("Let File", uploadedFile);
    // Image Uploading
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "image",
        resource_type: "auto",
      });
    } catch (err) {
      // console.log("Line1", err.message);
      res.status(400).json({ message: "Server Error:(" });
    }

    const { secure_url } = uploadedFile;
    // console.log(secure_url);
    let code = generateCode("COURSE", name);
    const codeBase = code.split("__")[0];
    const foundCoursesWithSimilarCode = Course.find({
      code: { $regex: codeBase + "__" + ".*" },
    }).sort({ createdAt: -1 });
    if (foundCoursesWithSimilarCode.length > 0) {
      const latestCode = foundCoursesWithSimilarCode[0].code;
      code = regenerateCode(latestCode);
    }

    let arrayOfsubjects = subject && subject.split(",");
    let arrayOfstandards = standard && standard.split(",");
    const createdByEmail = req.authAdmin.email;
    let course = new Course();

    (course.desktopImage = secure_url),
      (course.mobileImage = secure_url),
      (course.name = name),
      (course.description = description),
      (course.createdBy = createdByEmail),
      (course.mindescription = smartTrim(description, 200, " ", " ...")),
      (course.description = description),
      (course.time = time),
      (course.classes = classes),
      (course.courses = courses);
    course.actualPrice = actualPrice;
    course.discountPrice = discountPrice;
    course.standard = arrayOfstandards;
    course.subject = arrayOfsubjects;
    course.startDate = startDate;
    course.endDate = endDate;
    course.code = code;
    // console.log(course, "end");
    course.save((err, result) => {
      if (err) {
        return res.status(401).json({
          error: err,
        });
      }
      res.json(result);
    });

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Line 3 Server Error:(" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  // console.log("Id", id);

  Course.findById(id).exec(async (err, oldcourse) => {

    var secure_url2 = oldcourse.desktopImage;
    // console.log("old Banner url --> ", oldcourse.desktopImage);
    try {
      const {
        name,

        stream,
        details,
        program,
        startDate,
        endDate,
        standard,
        subject,
        actualPrice,
        discountPrice,
        description,
        highlights,
        location,
        classes,
        courses,
        time,
        priority,
      } = req.body;

      console.log(standard)

      if (!name || !name.length) {
        return res.status(400).json({
          error: "name is required",
        });
      }

      if (!description || !description.length) {
        return res.status(400).json({
          error: "description is required",
        });
      }

      if (!courses || !courses.length) {
        return res.status(400).json({
          error: "courses is required",
        });
      }

      // if (!startDate || !startDate.length) {
      //   return res.status(400).json({
      //     error: "startDate is required",
      //   });
      // }

      // if (!endDate || !endDate.length) {
      //   return res.status(400).json({
      //     error: "endDate is required",
      //   });
      // }

      if (!standard || !standard.length) {
        return res.status(400).json({
          error: "standard is required",
        });
      }

      if (!actualPrice || !actualPrice.length) {
        return res.status(400).json({
          error: "actualPrice is required",
        });
      }
      if (!discountPrice || !discountPrice.length) {
        return res.status(400).json({
          error: "discountPrice is required",
        });
      }

      // if (!time || !time.length) {
      //   return res.status(400).json({
      //     error: "time is required",
      //   });
      // }

      // if (!classes || !classes.length) {
      //   return res.status(400).json({
      //     error: "classes is required",
      //   });
      // }

      if (req.file) {
        let uploadedFile = UploadApiResponse;

        // Image Uploading
        try {
          uploadedFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "image",
            resource_type: "auto",

          });


          secure_url2 = uploadedFile.url
        } catch (err) {

          res.status(401).json({ err });
        }


      }

      let code = generateCode("COURSE", name);
      const codeBase = code.split("__")[0];
      const foundCoursesWithSimilarCode = Course.find({
        code: { $regex: codeBase + "__" + ".*" },
      }).sort({ createdAt: -1 });
      if (foundCoursesWithSimilarCode.length > 0) {
        const latestCode = foundCoursesWithSimilarCode[0].code;
        code = regenerateCode(latestCode);
      }

      let arrayOfsubjects = subject && subject.split(",");

      (oldcourse.desktopImage = secure_url2),
        (oldcourse.mobileImage = secure_url2),
        (oldcourse.name = name),
        (oldcourse.description = description),
        (oldcourse.mindescription = smartTrim(description, 200, " ", " ...")),
        (oldcourse.description = description),
        (oldcourse.time = time),
        (oldcourse.classes = classes),
        (oldcourse.courses = courses);
      oldcourse.actualPrice = actualPrice;
      oldcourse.discountPrice = discountPrice;
      oldcourse.standard = standard;
      oldcourse.subject = arrayOfsubjects;
      oldcourse.startDate = startDate;
      oldcourse.endDate = endDate;
      oldcourse.code = code;

      // console.log(arrayOfsubjects, oldcourse)
      oldcourse.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.status(200).json(result);
      });
    } catch (err) {

      res.status(401).json({ err });
    }
  });
};

exports.list = (req, res) => {
  Course.find({})
    .select(
      "pricingurl title description  point_one point_two point_three createdAt"
    )
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json({ pricing: data });
    });
};

exports.remove = (req, res) => {
  const _id = req.params.id;
  Course.findByIdAndRemove(_id).populate("standard", "_id name").populate("subject", "_id name").exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Course Data Deleted Successfully", data: { _id } });
  });
};

exports.read = (req, res) => {
  const id = req.params.id;
  Course.findById(id).populate("standard", "_id name").populate("subject", "_id name").exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
