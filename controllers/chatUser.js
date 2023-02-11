const mongoose = require("mongoose");
const Bluebird = require("bluebird");
const asyncHandler = require("express-async-handler");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Courses = require("../models/Course");
const Subject = require("../models/Subject");

// Get all teachers for any specific student
const getTeachers = asyncHandler(async (req, res) => {
  let teacherList = [];
  let subjectsList = [];

  const studentId = req.params.id;
  const student = await Student.findOne({ _id: studentId }).populate(
    "courses",
    "_id"
  );
  const courses = student.courses;

  for (let i = 0; i < courses.length; i++) {
    const course = await Courses.findOne({ _id: courses[i]._id });
    for (let j = 0; j < course.subject.length; j++) {
      subjectsList.push(course.subject[j]);
    }
  }

  const subList = Array.from(new Set(subjectsList.map(JSON.stringify))).map(
    JSON.parse
  );

  for (let i = 0; i < subList.length; i++) {
	const subject = await Subject.findOne({_id:subList[i]}).populate("teachers")
	for(let j = 0; j < subject.teachers.length; j++) {
		teacherList.push(subject.teachers[j])
	}
  }

  const data = Array.from(new Set(teacherList.map(JSON.stringify))).map(
    JSON.parse
  );
  res.json(data);
});

//get subjects
const getSubjects = async (req, res) => {
  const teacherId = req.params.id;
  const subjects = await Subject.find({
    teachers: {
      $in: [mongoose.Types.ObjectId(teacherId)],
    },
  });

  let subjectsId = [];

  subjects.map((item) => {
    subjectsId.push(item._id);
  });

  res.json(subjectsId);
};

// Get all Courses
const getCourses = async (req, res) => {
  const { subjects } = req.body;

  let coursesList = [];
  for (let i = 0; i < subjects.length; i++) {
    const courses = await Courses.find({
      subject: {
        $in: [mongoose.Types.ObjectId(subjects[i])],
      },
    });

    for (let j = 0; j < courses.length; j++) {
      coursesList.push(courses[j]._id);
    }
  }

  const data = Array.from(new Set(coursesList.map(JSON.stringify))).map(
    JSON.parse
  );

  res.json({ courses: data });
};

// Get all Courses
const getStudents = async (req, res) => {
  const { courses } = req.body;
  let studentList = [];
  for (let i = 0; i < courses.length; i++) {
    const students = await Student.find({
      courses: {
        $in: [mongoose.Types.ObjectId(courses[i])],
      },
    });

    for (let j = 0; j < students.length; j++) {
      studentList.push(students[j]);
    }
  }

  const data = Array.from(new Set(studentList.map(JSON.stringify))).map(
    JSON.parse
  );

  res.json({ students: data });
};

module.exports = { getTeachers, getSubjects, getCourses, getStudents };