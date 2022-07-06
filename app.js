require('dotenv').config();

const express = require('express')
const app = express();

var http = require('http'),
    crypto = require('crypto'),
    qs = require('querystring');
const chalk = require('chalk')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const compression = require('compression')
const path = require('path')
const multer = require("multer");
const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

const upload = multer({ dest: "upload/" });
const { uploadFile, getFileStream } = require('./utils/uploads/coursematerials3')
const cloudinary = require("cloudinary");
const ccavReqHandler = require('./controllers/ccavRequestHandler.js');
const ccavResHandler = require('./controllers/ccavResponseHandler.js');
// const RazorPay = require('razorpay')
const connectDB = require('./config/db')
const { notFoundHandler, errorHandler } = require('./middleware/error')
const uploadRoute = require('./routes/upload')
const imageRoutes = require('./routes/image')
const adminRoutes = require('./routes/admin')
const teacherRoutes = require('./routes/teacher')
const courseRoutes = require('./routes/course')
const complaintRoutes = require('./routes/complaint')
const studentRoutes = require('./routes/student')
const standardRoutes = require('./routes/standard')
const chapterRoutes = require('./routes/chapter');
const subjectRoutes = require('./routes/subject')
const questionRoutes = require('./routes/question')
const lectureRoutes = require('./routes/lecture')
const examtypeRoutes = require('./routes/examtype')
const testRoutes = require('./routes/test')
const youtubeRoutes = require('./routes/youtube')
const zoomRoutes = require('./routes/zoom')
const bannerRoutes = require('./routes/banner');
const footerRoutes = require('./routes/footer');
const batchesRoutes = require('./routes/batches');
const pricingRoutes = require('./routes/coursespart2');
const cardsRoutes = require('./routes/cards');
const flickerphotoRoute = require('./routes/flickerphoto');
const orderRoutes = require('./routes/order');
const topicRoutes = require("./routes/topic");
const subtopicRoutes = require("./routes/subtopic");
const courseMaterialRoutes = require("./routes/courseMaterial");
const answerRoute = require('./routes/answers')
const analyitcalRoute = require('./routes/analytics')
const emailRoute =  require('./routes/email')
const awsRoute =  require('./routes/aws')
const paymentRoutes =  require('./routes/payment')
const courseDetails =  require('./routes/coursedetails');
const wordParser = require('./routes/wordParser')

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

app.get('/', (_, res) => res.send('<h1>EasyHaiOnline Server Running...</h1>'))
// Routes
// we are use cloudinary storage direct and this route create localstorage so comment at some time 
// app.use('/api/upload', uploadRoute)


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
// app.use('/api/payment', paymentRoutes)
app.use('/api', bannerRoutes);
app.use('/api', footerRoutes);
app.use('/api', batchesRoutes);
app.use('/api', pricingRoutes);
app.use('/api', cardsRoutes);
app.use('/api', flickerphotoRoute);
app.use('/api/order', orderRoutes);
app.use("/api/imageupload", uploadRoute);
app.use("/api/wordParser", wordParser);

app.get('/images/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res);
})
app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file
  console.log(file);
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result);
  const description = req.body.description;
  res.send({ pdfPath: `/images/${result.Key}` });
});

// Error Handler middleware
app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// let razorPayInstance = new RazorPay({
//     key_id: process.env.KEY_ID || 'YOUR_KEY_ID',
//     key_secret: process.env.KEY_SECRET || 'YOUR_KEY_SECRET',
// })

// starting the server
app.listen(PORT, () => console.log(chalk.blue(`Server running on port ${PORT}`)))
