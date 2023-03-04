const asyncHandler = require("express-async-handler");
const Cryptr = require("cryptr");
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const ChatUser = require("../models/chatUser");
const Parent = require("../models/Parent");
const ActiveStudent = require("../models/ActiveStudent");
const BusinessPartner = require("../models/BusinessPartner");
const SubBusinessPartner = require("../models/SubBusinessPartner");
const Retailer = require("../models/Retailer");
const generateToken = require("../utils/generateToken");
const validateAdminInputs = require("../validators/admin");
const { sendEmailWithNodemailer } = require("../utils/email");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const request = require("request");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const Studentlog = require("../models/StudentLogger");
const Teacherlog = require("../models/TeacherLogger");
const StudentAttendancelog = require("../models/StudentAttendance");
const TeacherAttendance = require("../models/TeacherAttendance");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.Notification_Access_Key_Id,
  secretAccessKey: process.env.Notification_Secret_Access_Key,
  region: "us-east-1",
});
// to register a super admin ************************************************************************
const adminRegisterSuper = asyncHandler(async (req, res) => {
  const { username, email, image, password } = req.body;

  // validating inputs
  const { isValid, message } = validateAdminInputs(req.body);
  if (!isValid) {
    res.status(400);
    throw new Error(message);
  }

  //  checking for the uniqueness of email address
  const isUniqueEmail =
    (await Admin.countDocuments({ email })) > 0 ? false : true;
  if (!isUniqueEmail) {
    res.status(400);
    throw new Error("Email is already registered! Try Logging in.");
  }
  const role = 1;
  const newAdmin = await Admin.create({
    username,
    email,
    image,
    password,
    isSuper: true,
    role,
  });

  if (newAdmin) {
    // removing password before sending to client
    newAdmin.password = null;
    res.status(200).json({
      message: "New SUPER admin created!",
      data: newAdmin,
    });
  } else {
    res.status(500);
    throw new Error("New admin can't be registered at the moment! Try again.");
  }
});

const sendotp = asyncHandler(async (req, res) => {
  const { number, otp, name } = req.body;
  // Dear {#var#},
  // Your OTP for registration is {#var#} and is valid up to 15 minutes at easyhaionline.com1005164250533612950
  // http://digimate.airtel.in:15181/BULK_API/SendMessage?loginID=harshlyg_hsi&password=harshlyg@123&mobile=${number}&text=Dear ${name} Your OTP for registration is  ${otp}  and is valid up to 15 minutes at easyhaionline.com&senderid=DGMATE&DLT_TM_ID=1001096933494158&DLT_CT_ID=&DLT_PE_ID=1001751517438613463&route_id=DLT_SERVICE_IMPLICT&Unicode=0&camp_name=harshlyg_u
  // Dear {#var#},
  // Your OTP for registration is {#var#} and is valid up to 15 minutes at easyhaionline.com
  axios
    .get(
      `http://digimate.airtel.in:15181/BULK_API/SendMessage?loginID=harshlyg_hsi&password=harshlyg@123&mobile=${number}&text=Dear  ${name}, Your OTP for registration is ${otp}  and is valid up to 15 minutes at easyhaionline.com&senderid=EASHAI&DLT_TM_ID=1001096933494158&DLT_CT_ID=1007164283234091360&DLT_PE_ID=1001628200000063616&route_id=DLT_SERVICE_IMPLICT&Unicode=0&camp_name=harshlyg_u`
    )
    .then((response) => {
      console.log(`statusCode:200`);
      console.log(response);
      res.json("message send");
    })
    .catch((error) => {
      console.error(error);
    });
});

// to register a teacher ************************************************************************
const adminRegisterTeacher = asyncHandler(async (req, res) => {
  const { username, email, password, image, phone, standard, subject } =
    req.body;

  // validate inputs

  //  checking for the uniqueness of email address
  const isUniqueEmail =
    (await Teacher.countDocuments({ email })) > 0 ? false : true;
  if (!isUniqueEmail) {
    res.status(400);
    throw new Error("Email is already registered! Try Logging in.");
  }

  //  checking for the uniqueness of phone
  const isUniquePhone =
    (await Teacher.countDocuments({ phone })) > 0 ? false : true;
  if (!isUniquePhone) {
    res.status(400);
    throw new Error("Phone is already registered! Try Logging in.");
  }
  const role = 1;

  const newTeacher = await Teacher.create({
    username,
    email,
    phone,
    image,
    password,
    standard,
    subject,
    role,
  });

  await ChatUser.create({ _id: newTeacher._id, username: newTeacher.username });
  await Teacherlog.create({ teacherId: newTeacher._id });
  await TeacherAttendance.create({ teacherId: newTeacher._id });

  if (newTeacher) {
    // removing password before sending to client
    newTeacher.password = null;

    res.status(200).json({
      message: "New teacher created!",
      data: newTeacher,
    });
  } else {
    res.status(500);
    throw new Error("Teacher can't be registered at the moment! Try again.");
  }
});

// to register a new admin *******************************************************************************
const adminRegister = asyncHandler(async (req, res) => {
  const { username, email, image, password } = req.body;

  //  checking for the uniqueness of email address
  const isUniqueEmail =
    (await Admin.countDocuments({ email })) > 0 ? false : true;
  if (!isUniqueEmail) {
    res.status(400);
    throw new Error("Email is already registered! Try Logging in.");
  }

  const role = 1;
  const newAdmin = await Admin.create({
    username,
    email,
    image,
    password,
    role,
  });

  if (newAdmin) {
    // removing password before sending to client
    newAdmin.password = null;
    res.status(200).json(newAdmin);
  } else {
    res.status(500);
    throw new Error(
      "New admin can't be registered at the moment! Try again later."
    );
  }
});

// to register a new student *******************************************************************************
const studentRegister = asyncHandler(async (req, res) => {
  const { username, email, number, password, courseId, deviceToken } = req.body;
  //  checking for the uniqueness of email address
  const isUniqueEmail =
    (await Student.countDocuments({ email })) > 0 ? false : true;
  if (!isUniqueEmail) {
    res.status(400);
    throw new Error("Email is already registered! Try Logging in.");
  }

  // console.log(req.body);

  if(deviceToken.length != 0) {
    const endpointParams = {
      PlatformApplicationArn: process.env.ANDROID_PUSH_NOTIFICATION,
      Token: deviceToken,
    };
  
    const sns = new AWS.SNS();
    sns.createPlatformEndpoint(endpointParams, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const newAdmin = await Student.create({
          username,
          email,
          password,
          number,
          courses: courseId,
          deviceToken: deviceToken,
          endpointArn: data.EndpointArn,
        });
  
        await ChatUser.create({ _id: newAdmin._id, username: newAdmin.username });
        await Studentlog.create({ studentId: newAdmin._id });
        await StudentAttendancelog.create({ studentId: newAdmin._id });
  
        if (newAdmin) {
          // removing password before sending to client
          newAdmin.password = null;
          res.status(200).json(newAdmin);
        } else {
          res.status(500);
          throw new Error(
            "New admin can't be registered at the moment! Try again later."
          );
        }
      }
    });
  } else {
    const newAdmin = await Student.create({
      username,
      email,
      password,
      number,
      courses: courseId,
    });

    await ChatUser.create({ _id: newAdmin._id, username: newAdmin.username });
    await Studentlog.create({ studentId: newAdmin._id });
    await StudentAttendancelog.create({ studentId: newAdmin._id });

    if (newAdmin) {
      // removing password before sending to client
      newAdmin.password = null;
      res.status(200).json(newAdmin);
    } else {
      res.status(500);
      throw new Error(
        "New admin can't be registered at the moment! Try again later."
      );
    }
  }
});

// to register a new parent *******************************************************************************
const parentRegister = asyncHandler(async (req, res) => {
  const { username, email, password, student } = req.body;
  console.log(req.body);
  const isUniqueEmail =
    (await Parent.countDocuments({ email })) > 0 ? false : true;
  if (!isUniqueEmail) {
    res.status(400);
    throw new Error("Email is already registered! Try Logging in.");
  }
  const role = 3;

  const newAdmin = await Parent.create({
    username,
    email,
    password,
    role,
    student,
  });
  console.log(req.body);
  if (newAdmin) {
    // removing password before sending to client
    newAdmin.password = null;
    res.status(200).json(newAdmin);
  } else {
    res.status(500);
    throw new Error(
      "New parent can't be registered at the moment! Try again later."
    );
  }
});

const parentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // finding the parent
  const foundParent = await Parent.findOne({
    email,
    isActive: true,
  });
  if (
    foundParent &&
    (await foundParent.matchPassword(password)) &&
    foundParent.role == 3
  ) {
    const token = generateToken(foundParent._id);
    const dbhalf = token.substr(0, 100);
    const htoken = token.substr(100);
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const encryptedString = cryptr.encrypt(dbhalf);
    foundParent.encryption = encryptedString;
    foundParent.save();
    const decryptedString = cryptr.decrypt(encryptedString);
    var _id = foundParent.student;
    res.send({
      fulltoken: token,
      _id,
      email: foundParent.email,
      username: foundParent.username,
      image: foundParent.image,
      isSuper: foundParent.isSuper,
      token: htoken,
      dbtoken: foundParent.encryption,
      decrypted: decryptedString,
      foundParent: foundParent,
    });
  } else {
    res.status(401);
    throw new Error(
      "Either your credentials are wrong or your account is deactivated! Try again."
    );
  }
});

const adminRegisterbynumber = asyncHandler(async (req, res) => {
  const { number, username } = req.body;
  const isUniqueMobile =
    (await Student.countDocuments({ username, number })) > 0 ? true : false;
  console.log(isUniqueMobile);
  if (!isUniqueMobile) {
    console.log("entercreate");
    const newAdmin = await Student.create({
      username,
      number,
    });
    if (newAdmin) {
      const token = generateToken(newAdmin._id);
      const dbhalf = token.substr(0, 100);
      const htoken = token.substr(100);
      const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
      const encryptedString = cryptr.encrypt(dbhalf);
      newAdmin.encryption = encryptedString;
      newAdmin.save();

      res.status(200).json({
        _id: newAdmin._id,
        number: newAdmin.number,
        username: newAdmin.username,
        isSuper: newAdmin.isSuper,
        token: htoken,
        dbtoken: newAdmin.encryption,
        data: newAdmin,
      });
    }
  } else if (isUniqueMobile) {
    console.log("enetrmid");
    const foundAdmin = await Student.findOne({
      username: username,
      isActive: true,
    });
    console.log(foundAdmin._id, number, {
      number: number,
      isActive: true,
    });
    const token = generateToken(foundAdmin._id);

    const dbhalf = token.substr(0, 100);
    const htoken = token.substr(100);
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const encryptedString = cryptr.encrypt(dbhalf);
    console.log(dbhalf, foundAdmin._id, foundAdmin.encryption, encryptedString);
    foundAdmin.encryption = encryptedString;
    foundAdmin.save();
    const decryptedString = cryptr.decrypt(encryptedString);

    res.status(200).json({
      _id: foundAdmin._id,
      email: foundAdmin.email,
      username: foundAdmin.username,
      image: foundAdmin.image,
      isSuper: foundAdmin.isSuper,
      token: htoken,
      dbtoken: foundAdmin.encryption,
      decrypted: decryptedString,
    });
  }
});

// to login an existing admin *************************************************************************
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // finding the admin
  const foundAdmin = await Admin.findOne({
    email,
    isActive: true,
  });
  if (
    foundAdmin &&
    (await foundAdmin.matchPassword(password)) &&
    foundAdmin.role == 1
  ) {
    const token = generateToken(foundAdmin._id);
    const dbhalf = token.substr(0, 100);
    const htoken = token.substr(100);
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const encryptedString = cryptr.encrypt(dbhalf);
    foundAdmin.encryption = encryptedString;
    foundAdmin.save();
    const decryptedString = cryptr.decrypt(encryptedString);
    res.send({
      fulltoken: token,
      _id: foundAdmin._id,
      email: foundAdmin.email,
      username: foundAdmin.username,
      image: foundAdmin.image,
      isSuper: foundAdmin.isSuper,
      token: htoken,
      dbtoken: foundAdmin.encryption,
      decrypted: decryptedString,
      foundAdmin: foundAdmin,
    });
  } else {
    res.status(401);
    throw new Error(
      "Either your credentials are wrong or your account is deactivated! Try again."
    );
  }
});

const studentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // finding the admin
  const foundAdmin = await Student.findOne({
    email,
    isActive: true,
  });
  if (
    foundAdmin &&
    (await foundAdmin.matchPassword(password)) &&
    foundAdmin.role == 0
  ) {
    const token = generateToken(foundAdmin._id);
    const dbhalf = token.substr(0, 100);
    const htoken = token.substr(100);
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const encryptedString = cryptr.encrypt(dbhalf);
    foundAdmin.encryption = encryptedString;
    foundAdmin.save();
    const decryptedString = cryptr.decrypt(encryptedString);
    res.send({
      fulltoken: token,
      _id: foundAdmin._id,
      email: foundAdmin.email,
      username: foundAdmin.username,
      image: foundAdmin.image,
      isSuper: foundAdmin.isSuper,
      token: htoken,
      dbtoken: foundAdmin.encryption,
      decrypted: decryptedString,
      foundAdmin: foundAdmin,
    });
  } else {
    res.status(401);
    throw new Error(
      "Either your credentials are wrong or your account is deactivated! Try again."
    );
  }
});

const teacherLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // finding the admin
  const foundAdmin = await Teacher.findOne({
    email,
    isActive: true,
  });

  console.log("WEARE HERE: ", foundAdmin);

  if (
    foundAdmin &&
    (await foundAdmin.matchPassword(password)) &&
    foundAdmin.role == 1
  ) {
    const token = generateToken(foundAdmin._id);
    const dbhalf = token.substr(0, 100);
    const htoken = token.substr(100);
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    const encryptedString = cryptr.encrypt(dbhalf);
    foundAdmin.encryption = encryptedString;
    foundAdmin.save();
    const decryptedString = cryptr.decrypt(encryptedString);
    res.send({
      fulltoken: token,
      _id: foundAdmin._id,
      email: foundAdmin.email,
      username: foundAdmin.username,
      image: foundAdmin.image,
      isSuper: foundAdmin.isSuper,
      token: htoken,
      dbtoken: foundAdmin.encryption,
      decrypted: decryptedString,
      foundAdmin: foundAdmin,
    });
  } else {
    res.status(401);
    throw new Error(
      "Either your credentials are wrong or your account is deactivated! Try again."
    );
  }
});

const encryprttoken = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const foundAdmin = await Student.findOne({
    _id: id,
  });
  const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
  const decryptedString = cryptr.decrypt(foundAdmin.encryption);
  res.json({
    token: decryptedString,
    user: foundAdmin,
  });
});

const teacherToggle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // getting the logged in admin

  // checking if the logged in admin is a SUPER ADMIN (only super admin can toggle admins)

  const foundAdminToToggle = await Teacher.findOne({ _id: id });

  // checking if the admin to delete is NOT a super admin (super admin can't be deleted)

  foundAdminToToggle.isActive = foundAdminToToggle.isActive ? false : true;
  foundAdminToToggle.save();

  res.status(200).json({
    message: foundAdminToToggle.isActive
      ? "Admin Activated!"
      : "Admin Deactivated!",
  });
});

const studentToggle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // getting the logged in admin

  // checking if the logged in admin is a SUPER ADMIN (only super admin can toggle admins)

  const foundAdminToToggle = await Student.findOne({ _id: id });

  // checking if the admin to delete is NOT a super admin (super admin can't be deleted)

  foundAdminToToggle.isActive = foundAdminToToggle.isActive ? false : true;
  foundAdminToToggle.save();

  res.status(200).json({
    message: foundAdminToToggle.isActive
      ? "Admin Activated!"
      : "Admin Deactivated!",
  });
});

// to delete an admin *********************************************************************************
const adminToggle = asyncHandler(async (req, res) => {
  const { adminEmail } = req.params;

  // getting the logged in admin
  const foundAdmin = req.authAdmin;

  if (foundAdmin) {
    // checking if the logged in admin is a SUPER ADMIN (only super admin can toggle admins)
    let isSuperAdmin = foundAdmin.isSuper;
    if (!isSuperAdmin) {
      res.status(403);
      throw new Error("Only super admin has the permission to toggle admins!");
    }

    const foundAdminToToggle = await Admin.findOne({ email: adminEmail });

    // checking if the admin to delete is NOT a super admin (super admin can't be deleted)
    isSuperAdmin = foundAdminToToggle.isSuper;
    if (isSuperAdmin) {
      res.status(403);
      throw new Error("Super admin cannot be deactivated!");
    }

    foundAdminToToggle.isActive = foundAdminToToggle.isActive ? false : true;
    foundAdminToToggle.save();

    res.status(200).json({
      message: foundAdminToToggle.isActive
        ? "Admin Activated!"
        : "Admin Deactivated!",
    });
  } else {
    res.status(401);
    throw new Error("Your credentials might be wrong! Try again.");
  }
});

// to get all the Admins ****************************************************************************
const adminGetAll = asyncHandler(async (_, res) => {
  const foundAdmins = await Admin.find()
    .select("-password")
    .sort({ createdAt: -1 });
  res.status(200).json(foundAdmins);
});
// to get all the students ****************************************************************************
const adminGetAllStudents = asyncHandler(async (_, res) => {
  const foundAdmins = await Student.find({ role: 0 })
    .select("-password")
    .sort({ createdAt: -1 });
  res.status(200).json(foundAdmins);
});
// to get all the teachers ****************************************************************************
const adminGetAllTeachers = asyncHandler(async (_, res) => {
  const foundAdmins = await Teacher.find({ role: 1, isSuper: false })
    .select("-password")
    .sort({ createdAt: -1 });
  res.status(200).json(foundAdmins);
});

const adminGetcourse = asyncHandler(async (req, res) => {
  _id = req.params.id;
  await Student.findById(_id)
    .select("courses")
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      return res.status(200).json(data);
    });
});
const allCoursesAdmin = asyncHandler(async (req, res) => {
  // controller for admin courses access
  _id = req.params.id;
  console.log(_id);
  await Admin.findById(_id)
    .select("courses")
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      return res.status(200).json(data);
    });
});

const studentsByCourseFilter = asyncHandler(async (req, res) => {
  const { course } = req.params;

  let courses = [];
  courses.push(course);
  console.log(req.params.course);
  let foundstudent;
  {
    foundstudent = await Student.find()
      .where({ courses })
      .sort({ createdAt: -1 });
  }
  res.status(200).json(foundstudent);
});

const studentsBySearchFilter = asyncHandler(async (req, res) => {
  const { data } = req.body;

  let foundstudent;
  {
    foundstudent = await Student.find()
      .where({ email: data })
      .sort({ createdAt: -1 });
    if (foundstudent.length == 0) {
      foundstudent = await Student.find()
        .where({ username: data })
        .sort({ createdAt: -1 });
    }
  }

  res.status(200).json(foundstudent);
});

// to update an admin *******************************************************************************
const adminUpdate = asyncHandler(async (req, res) => {
  const { username, image, email, password } = req.body;

  // validating inputs
  const { isValid, message } = validateAdminInputs(req.body, true);
  if (!isValid) {
    res.status(400);
    throw new Error(message);
  }

  // finding the admin whose details are need to be updated
  const foundAdmin = await Admin.findOne({
    email,
  });

  // getting the logged in admin
  const loggedInAdmin = req.authAdmin;

  // checking if the logged in user is a super admin or not
  const isSuperAdmin = loggedInAdmin.isSuper;

  if (foundAdmin) {
    // checking if the logged in user is updating his own details or else he is a super admin
    // (super admin can update any admin's details)
    if (!isSuperAdmin && loggedInAdmin.username !== foundAdmin.username) {
      res.status(403);
      throw new Error(
        "Only super admin has the permission to update any other admin's details!"
      );
    }

    if (username) foundAdmin.username = username;
    if (image) foundAdmin.image = image;
    if (password) foundAdmin.password = password;
    foundAdmin.save();
    res.status(200).json({
      message: "Admin updated successfully!",
      data: { ...foundAdmin._doc, password: null },
    });
  } else {
    res.status(404);
    throw new Error("No admin exists with this email!");
  }
});

const Updatingcourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const { id } = req.params;
  // validating inputs

  // finding the admin whose details are need to be updated
  const foundAdmin = await Admin.findById(id);

  // getting the logged in admin
  const loggedInAdmin = req.authAdmin;

  // checking if the logged in user is a super admin or not

  if (foundAdmin) {
    // checking if the logged in user is updating his own details or else he is a super admin
    // (super admin can update any admin's details)

    foundAdmin.courses = courseId;

    foundAdmin.save();
    res.status(200).json({
      message: "Admin updated successfully!",
      data: { ...foundAdmin._doc, password: null },
    });
  } else {
    res.status(404);
    throw new Error("No user exists with this email!");
  }
});

const profileUpdate = asyncHandler(async (req, res) => {
  const { username, image, email, number } = req.body;
  console.log(image);
  // validating inputs
  const { isValid, message } = validateAdminInputs(req.body, true);
  if (!isValid) {
    res.status(400);
    throw new Error(message);
  }

  // finding the admin whose details are need to be updated
  const foundAdmin = await Admin.findOne({
    email,
  });

  if (foundAdmin) {
    // checking if the logged in user is updating his own details or else he is a super admin
    // (super admin can update any admin's details)

    if (username) foundAdmin.username = username;
    if (image) foundAdmin.image = image[1];
    if (number) foundAdmin.number = number;
    foundAdmin.save();
    res.status(200).json({
      message: "User updated successfully!",
      data: { ...foundAdmin._doc, password: null },
    });
  } else {
    res.status(404);
    throw new Error("No user exists with this email!");
  }
});

// teacher forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await Teacher.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });

    const template = `
        <p>Click the link below to reset your password:</p>
        <p>https://student.easyhaionline.com/reset-password/${token}</p>
        <hr />
        <p>If you did not request a password reset you can safely ignore this email.</p>
        <p>https://teacher.easyhaionline.com</p>
    `;

    // populating the db > user > resetPasswordLink
    return user.updateOne(
      { resetPasswordLink: token },
      async (err, success) => {
        if (err) {
          return res.json({ error: err });
        } else {
          // sendEmailWithNodemailer(req, res, emailData);
          await axios.post(
            "https://api.easyhaionline.com/api/notification/send-email",
            {
              recipientEmail: [email],
              template,
              emailSubject: "Password reset link",
            }
          );
          return res.json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`,
          });
        }
      }
    );
  });
});

const resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired link. Try again",
          });
        }
        Teacher.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: "Something went wrong. Try later",
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};

const forgotPasswordStudent = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await Student.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });

    const template = `
        <p>Click the link below to reset your password:</p>
        <p>https://student.easyhaionline.com/reset-password/${token}</p>
        <hr />
        <p>If you did not request a password reset you can safely ignore this email.</p>
        <p>https://easyhaionline.com</p>
    `;

    // email
    // const emailData = {
    //   from: "",
    //   to: email,
    //   subject: `Password reset link`,
    //   const template: `
    //         <p>Please use the following link to reset your password:</p>
    //         <p>${process.env.PRODUCTION_URL}/resetpassword/${token}</p>
    //         <hr />
    //         <p>This email may contain sensetive information</p>
    //         <p>https://easyhaionline.com</p>
    //     `,
    // };
    // populating the db > user > resetPasswordLink
    return user.updateOne(
      { resetPasswordLink: token },
      async (err, success) => {
        if (err) {
          return res.json({ error: err });
        } else {
          //   sendEmailWithNodemailer(req, res, emailData);
          await axios.post(
            "https://api.easyhaionline.com/api/notification/send-email",
            {
              recipientEmail: [email],
              template,
              emailSubject: "Password reset link",
            }
          );
          return res.json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`,
          });
        }
      }
    );
  });
});

const resetPasswordStudent = (req, res) => {
  const { resetPasswordLink } = req.params;
  // console.log("reset password link:", resetPasswordLink)
  // const { newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      async function (err, decoded) {
        if (err) {
          res.json({
            error: "Expired link. Try again",
          });
        }

        const salt = await bcrypt.genSalt(13);
        const finalPassword = await bcrypt.hash(req.body.password, salt);
        const updatedStudent = await Student.findOneAndUpdate(
          { resetPasswordLink: resetPasswordLink },
          { password: finalPassword, resetPasswordLink: "" }
        );

        if (updatedStudent) {
          res.json({
            message: `Great! Now you can login with your new password`,
          });
        }
      }
    );
  }
};

const removeTeacher = (req, res) => {
  const id = req.params.id;
  Teacher.findByIdAndRemove(id).exec((err, data) => {
    if (err) {
      return res.json({
        err,
      });
    }
    res.json({ message: "techer Deleted Successfully" });
  });
};

const removeStudent = (req, res) => {
  const id = req.params.id;
  Student.findByIdAndRemove(id).exec((err, data) => {
    if (err) {
      return res.json({
        err,
      });
    }
    res.json({ message: "Student Deleted Successfully" });
  });
};

const approveStudent = async (req, res) => {
  const email = req.body.email;
  try {
    console.log(req.body);
    let user = await ActiveStudent.findOneAndUpdate(
      { user_email: email },
      { $set: { isActive: true } },
      { new: true }
    );
    return res.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error in approving user" });
  }
};

//create approval req after paying by cash
const createApproveStudent = async (req, res) => {
  const email = req.body.email;
  try {
    let user = await ActiveStudent.findOne({ user_email: email });
    if (user) {
      console.log("Already submitetd for approval");
      return res.status(400).json({ message: "approval req already existes" });
    } else {
      console.log("Requested created");
      user = await ActiveStudent.create({ user_email: email });
      return res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get the list of student to approve payment
const getAllApproveStudentList = async (req, res) => {
  try {
    const foundStudents = await ActiveStudent.find({});
    res.status(200).json(foundStudents);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server error" });
  }
};

//api will be called from student portal to approve to pay by cash
const isActive = async (req, res) => {
  try {
    let user = await ActiveStudent.find({ user_email: req.body.email });
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server error" });
  }
};

//to create business partner
const createBusinessPartner = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      pan,
      aadhar,
      panlink,
      aadharlink,
      accountname,
      accountnumber,
      typeofaccount,
      ifsccode,
    } = req.body;
    var user = await BusinessPartner.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    var user = await SubBusinessPartner.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    var user = await Retailer.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    var referralCode;
    var randomBool = true;
    var numbp = 1;

    //create a referral code it is unique
    do {
      referralCode = "HEST/BP/" + numbp.toString();
      user = await BusinessPartner.findOne({ referralCode: referralCode });
      if (!user) {
        randomBool = false;
      }
    } while (randomBool && numbp++);

    const newUser = await BusinessPartner.create({
      name,
      email,
      password,
      phone,
      referralCode,
      pan,
      aadhar,
      panlink,
      aadharlink,
      accountname,
      accountnumber,
      typeofaccount,
      ifsccode,
    });
    // delete newUser.passoword;
    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

// to create sub business partner
const createSubBusinessPartner = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      user_id,
      pan,
      aadhar,
      panlink,
      aadharlink,
      accountname,
      accountnumber,
      typeofaccount,
      ifsccode,
    } = req.body;
    var user = await BusinessPartner.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    var user = await SubBusinessPartner.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    var user = await Retailer.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    var referralCode;
    var randomBool = true;
    var randomsbp = true;
    var numbp = 1;
    var numsbp = 1;
    var num;
    while (randomsbp) {
      var bp = await BusinessPartner.findOne({ _id: user_id });
      console.log("AAAA:", bp.referralCode);
      if (bp.referralCode === "HEST/BP/" + numbp.toString()) {
        num = numbp;
        randomsbp = false;
      } else {
        numbp++;
      }
    }

    do {
      referralCode = "HEST/SBP/" + num.toString() + "-" + numsbp.toString();
      user = await SubBusinessPartner.findOne({ referralCode: referralCode });
      if (!user) {
        randomBool = false;
      }
    } while (randomBool && numsbp++);

    const newUser = await SubBusinessPartner.create({
      name,
      email,
      password,
      phone,
      pan,
      aadhar,
      panlink,
      aadharlink,
      businessPartner: user_id,
      referralCode,
      accountname,
      accountnumber,
      typeofaccount,
      ifsccode,
    });
    delete newUser.password;
    console.log(newUser);
    //add sub business partner to the business partner array
    const businessPartnerObject = await BusinessPartner.updateOne(
      { _id: user_id },
      { $push: { subBusinessPartner: newUser._id } }
    );
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
};

//create retailer
const createRetailer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      user_id,
      pan,
      aadhar,
      panlink,
      aadharlink,
      accountname,
      accountnumber,
      typeofaccount,
      ifsccode,
    } = req.body;
    var user = await BusinessPartner.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    var user = await SubBusinessPartner.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    var user = await Retailer.findOne({
      $or: [{ email: email }, { pan: pan }, { aadhar: aadhar }],
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    var referralCode;
    var randomBool = true;
    var randombp = true;
    var randomsbp = true;
    var numbp = 1;
    var numsbp = 1;
    var numrt = 1;
    var numone;
    var numtwo;

    while (randombp) {
      var sbp = await SubBusinessPartner.findOne({ _id: user_id });
      var bp = await BusinessPartner.findOne({ _id: sbp.businessPartner });
      // console.log("CCCCCCCC:", bp.referralCode)
      if (bp.referralCode === "HEST/BP/" + numbp.toString()) {
        numone = numbp;
        randombp = false;
      } else {
        numbp++;
      }
    }
    while (randomsbp) {
      var sbp = await SubBusinessPartner.findOne({ _id: user_id });
      // console.log("cccc:", sbp.referralCode)
      if (
        sbp.referralCode ===
        "HEST/SBP/" + numone.toString() + "-" + numsbp.toString()
      ) {
        numtwo = numsbp;
        randomsbp = false;
      } else {
        numsbp++;
      }
    }

    do {
      referralCode =
        "HEST/" +
        numone.toString() +
        "-" +
        numtwo.toString() +
        "/A" +
        numrt.toString();
      user = await Retailer.findOne({ referralCode: referralCode });
      if (!user) {
        // console.log("ACBC:", numrt)
        randomBool = false;
      }
    } while (randomBool && numrt++);

    newUser = await Retailer.create({
      name,
      email,
      password,
      phone,
      pan,
      aadhar,
      panlink,
      aadharlink,
      subBusinessPartner: user_id,
      referralCode,
      accountname,
      accountnumber,
      typeofaccount,
      ifsccode,
    });
    delete newUser.password;
    console.log("new retailer:", newUser);
    const sbpartner = await SubBusinessPartner.updateOne(
      { _id: user_id },
      { $push: { retailer: newUser._id } }
    );
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
};

//to get the list of buisness partner
const getBusinessPartner = async (req, res) => {
  const user = await BusinessPartner.find({});
  res.status(200).json(user);
};

const deleteBusinessPartner = async (req, res) => {
  try {
    const user = await BusinessPartner.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Success" });
  } catch (err) {
    if (err) {
      res.status(400).json({ message: "Error occured" });
    }
  }
};

// to get the list of sub buisness partner
const getSubBusinessPartner = async (req, res) => {
  const user = await SubBusinessPartner.find({
    businessPartner: req.params.id,
  });
  user.map((elem) => {
    delete elem.password;
  });
  res.status(200).json(user);
};

const deleteSubBusinessPartner = async (req, res) => {
  try {
    const user = await SubBusinessPartner.findOneAndDelete({
      _id: req.params.id,
    });
    const bp = await BusinessPartner.updateOne(
      { _id: user.businessPartner },
      { $pull: { subBusinessPartner: user._id } }
    );
    res.status(200).json({ message: "Success" });
  } catch (err) {
    if (err) {
      res.status(400).json({ message: "Error occured" });
    }
  }
};

//Get all retailer
const getRetailer = async (req, res) => {
  const user = await Retailer.find({ subBusinessPartner: req.params.id });
  user.map((elem) => {
    delete elem.password;
  });
  res.status(200).json(user);
};

const deleteRetailer = async (req, res) => {
  try {
    const user = await Retailer.findOneAndDelete({ _id: req.params.id });
    const sbp = await SubBusinessPartner.updateOne(
      { _id: user.subBusinessPartner },
      { $pull: { retailer: user._id } }
    );
    res.status(200).json({ message: "Success" });
  } catch (err) {
    if (err) {
      res.status(400).json({ message: "Error occured" });
    }
  }
};

const getStudentList = async (req, res) => {
  try {
    const referralUser = await Retailer.findOne({ _id: req.params.id });
    const students = await Student.find({
      referralCode: referralUser.referralCode,
    });
    console.log(students);
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(400).json({ Message: "Error Occured" });
  }
};

const allocateCourse = async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });

  console.log(student);

  if (student) {
    student.courses.push(req.body.courseId);
    student.save();
  }

  res.status(200).json(student);
};

const getAllStudentsForBp = async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await SubBusinessPartner.find({ businessPartner: id });
    let arr = [];
    for (let i = 0; i < sub.length; i++) {
      const ret = await Retailer.find({ subBusinessPartner: sub[i]._id });
      for (let j = 0; j < ret.length; j++) {
        const stud = await Student.find({ referralCode: ret[j].referralCode });
        for (let k = 0; k < stud.length; k++) {
          arr.push(stud[k]);
        }
      }
    }
    res.status(200).json(arr);
  } catch (error) {
    res.status(400).json({ Message: "Error Occured" });
  }
};

const getAllStudentsForSbp = async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await Retailer.find({ subBusinessPartner: id });
    let arr = [];
    for (let i = 0; i < sub.length; i++) {
      const ret = await Student.find({ referralCode: sub[i].referralCode });
      for (let j = 0; j < ret.length; j++) {
        arr.push(ret[j]);
      }
    }
    res.status(200).json(arr);
  } catch (error) {
    res.status(400).json({ Message: "Error Occured" });
  }
};

const studentsByFilter = asyncHandler(async (req, res) => {
  const { data } = req.body;

  let foundstudent;
  {
    foundstudent = await Student.find()
      .where({ email: data })
      .sort({ createdAt: -1 });
    if (foundstudent.length == 0) {
      foundstudent = await Student.find()
        .where({ username: data })
        .sort({ createdAt: -1 });
      if (foundstudent.length == 0) {
        foundstudent = await Student.find()
          .where({ referralCode: data })
          .sort({ createdAt: -1 });
        if (foundstudent.length == 0) {
          foundstudent = await Student.find()
            .where({ number: parseInt(data) })
            .sort({ createdAt: -1 });
          if (foundstudent.length == 0) {
            foundstudent = await Student.find()
              .where({ _id: data })
              .sort({ createdAt: -1 });
          }
        }
      }
    }
  }

  res.status(200).json(foundstudent);
});

module.exports = {
  adminRegisterSuper,
  adminRegisterTeacher,
  adminRegister,
  adminLogin,
  adminToggle,
  adminGetAll,
  adminUpdate,
  resetPassword,
  forgotPassword,
  resetPasswordStudent,
  forgotPasswordStudent,
  encryprttoken,
  adminRegisterbynumber,
  studentLogin,
  teacherLogin,
  studentRegister,
  adminGetAllStudents,
  adminGetAllTeachers,
  sendotp,
  profileUpdate,
  Updatingcourse,
  adminGetcourse,
  parentLogin,
  parentRegister,
  studentsByCourseFilter,
  studentsBySearchFilter,
  teacherToggle,
  removeTeacher,
  studentToggle,
  removeStudent,
  allCoursesAdmin,
  approveStudent,
  createApproveStudent,
  getAllApproveStudentList,
  isActive,
  createBusinessPartner,
  createSubBusinessPartner,
  createRetailer,
  getBusinessPartner,
  deleteBusinessPartner,
  getSubBusinessPartner,
  deleteSubBusinessPartner,
  getRetailer,
  deleteRetailer,
  getStudentList,
  allocateCourse,
  getAllStudentsForBp,
  getAllStudentsForSbp,
  studentsByFilter,
};
// allCoursesAdmin is the controller created for Admin Panel
