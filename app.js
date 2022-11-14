require('dotenv').config();
const express = require('express')
const app = express();

// var http = require('http'),
//     crypto = require('crypto'),
//     qs = require('querystring');
const connectDB = require('./config/db');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const upload = multer({ dest: "upload/" });
const { uploadFile, getFileStream } = require('./utils/uploads/coursematerials3');
const cloudinary = require("cloudinary");
const ccavReqHandler = require('./controllers/ccavRequestHandler.js');
const ccavResHandler = require('./controllers/ccavResponseHandler.js');
const { notFoundHandler, errorHandler } = require('./middleware/error');
const uploadRoute = require('./routes/upload');
const imageRoutes = require('./routes/image');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const courseRoutes = require('./routes/course');
const complaintRoutes = require('./routes/complaint');
const studentRoutes = require('./routes/student');
const standardRoutes = require('./routes/standard');
const chapterRoutes = require('./routes/chapter');
const subjectRoutes = require('./routes/subject');
const questionRoutes = require('./routes/question');
const lectureRoutes = require('./routes/lecture');
const examtypeRoutes = require('./routes/examtype');
const testRoutes = require('./routes/test');
const youtubeRoutes = require('./routes/youtube');
const zoomRoutes = require('./routes/zoom');
const batchesRoutes = require('./routes/batches');
const pricingRoutes = require('./routes/coursespart2');
const orderRoutes = require('./routes/order');
const topicRoutes = require("./routes/topic");
const subtopicRoutes = require("./routes/subtopic");
const courseMaterialRoutes = require("./routes/courseMaterial");
const answerRoute = require('./routes/answers');
const analyitcalRoute = require('./routes/analytics');
const emailRoute =  require('./routes/email');
const awsRoute =  require('./routes/aws');
const courseDetails =  require('./routes/coursedetails');
const wordParser = require('./routes/wordParser')
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");
const pdfMaker = require('./routes/pdfMaker');
const doubtExpert = require('./routes/doubtExpert');
const invoiceRoutes = require('./routes/invoice');
const chatUser = require('./routes/chatUser');
const logRoutes = require('./routes/logger');
const attendanceLogRoutes = require('./routes/attendancelogger');

// connecting to database
connectDB()

app.post('/ccavRequestHandler', function (request, response){
	ccavReqHandler.postReq(request, response);
});

app.post('/ccavResponseHandler', function (request, response){
        ccavResHandler.postRes(request, response);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECERET
})

// adding morgan as middleware to log http requests in the console
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Middleware
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(compression({ level: 9 }))
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (_, res) => res.send('<p>Easyhaionline server is running: 11th Nov</p>'));
// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/image', imageRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/complaint', complaintRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/standard', standardRoutes)
app.use('/api/subject', subjectRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/lecture', lectureRoutes)
app.use('/api/examtype', examtypeRoutes)
app.use('/api/chapter', chapterRoutes)
app.use('/api/topic', topicRoutes)
app.use('/api/email', emailRoute)
app.use('/api/subtopic', subtopicRoutes)
app.use('/api/awsroute', awsRoute)
app.use("/api/coursematerial", courseMaterialRoutes);
app.use('/api/test', testRoutes)
app.use('/api/youtube', youtubeRoutes)
app.use('/api/coursedetails', courseDetails)
app.use('/api/zoom', zoomRoutes)
app.use('/api/answer', answerRoute)
app.use('/api/analytics', analyitcalRoute)
app.use('/api/doubtExpert', doubtExpert)
app.use('/api', batchesRoutes);
app.use('/api', pricingRoutes);
app.use('/api/order', orderRoutes);
app.use("/api/imageupload", uploadRoute);
app.use("/api/wordParser", wordParser);
app.use("/api/pdf", pdfMaker);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use('/api/chatuser', chatUser)
app.use("/api/log",logRoutes);
app.use("/api/attendancelog",attendanceLogRoutes);

app.get('/images/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res);
})

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  const description = req.body.description;
  res.send({ pdfPath: `/images/${result.Key}` });
});

// Error Handler middleware
app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

// starting the server
const server=app.listen(PORT, () => console.log(chalk.blue(`Server running on port ${PORT}`)))
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();//nodejs global object
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);//set the userid and socket id of current user
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      //socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});