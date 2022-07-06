const asyncHandler = require('express-async-handler')
const {google} = require('googleapis');
const Teacher = require('../models/Teacher')
const generateToken = require('../utils/generateToken')

// to schedule a  livestream *************************************************************************
const scheduleLive = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // finding the teacher
    const foundTeacher = await Teacher.findOne({
        email,
        isActive: true,
    })

    if (foundTeacher && (await foundTeacher.matchPassword(password))) {
        res.send({
            email: foundTeacher.email,
            username: foundTeacher.username,
            image: foundTeacher.image,
            subject: foundTeacher.subject.name,
            phone: foundTeacher.phone,
            token: generateToken(foundTeacher._id),
        })
    } else {
        res.status(401)
        throw new Error(
            'Either your credentials are wrong or your account is deactivated! Try again.'
        )
    }
})
// to google access token a  livestream *************************************************************************
const googleaccess = asyncHandler(async (req, res) => {
    // const { email, password } = req.body
   
    // finding the teacher
    // const oauth2Client = new google.auth.OAuth2(
    //     '596027896349-0mhqktvhfcpp7438jg01et6vuhtjrv22.apps.googleusercontent.com',
    //     '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',
    //     'http://localhost:8088/teacher/addLiveLecture'
    //     );
 
    const oauth2Client = new google.auth.OAuth2(
        '596027896349-ukttu6l8fc9s5soaekbef9n8vr11blq9.apps.googleusercontent.com',
        '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',
        'https://www.teacher.easyhaionline.com/teacher/addLiveLecture'
        );
 
            
        const scopes = [
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtubepartner-channel-audit'
        ];
        const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        response_type:'code',
        prompt:'consent',
        scope: scopes,
        flowName:'GeneralOAuthFlow'
        });
        res.send({url})

})
const generatetokenaccess = asyncHandler(async (req, res) => {
    // const { email, password } = req.body
const {code} =req.body;   
console.log(code)   
// finding the teacher
    // const oauth2Client = new google.auth.OAuth2(
    //     '596027896349-0mhqktvhfcpp7438jg01et6vuhtjrv22.apps.googleusercontent.com',
    //     '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',
    //     'http://localhost:8088/teacher/addLiveLecture'
    //     );
      
    const oauth2Client = new google.auth.OAuth2(
        '596027896349-ukttu6l8fc9s5soaekbef9n8vr11blq9.apps.googleusercontent.com',
        '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',
        'https://www.teacher.easyhaionline.com/teacher/addLiveLecture'
        );
      
    
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    // const { inputvalues } = req.body
res.send(tokens)




})
const googleaccess2 = asyncHandler(async (req, res) => {
    // const { email, password } = req.body
   
    // finding the teacher
    const oauth2Client = new google.auth.OAuth2(
        '596027896349-ukttu6l8fc9s5soaekbef9n8vr11blq9.apps.googleusercontent.com',
        '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',
        'http://localhost:8088/teacher/addLiveLecture'
        );
 
    // const oauth2Client = new google.auth.OAuth2(
    //     '596027896349-0mhqktvhfcpp7438jg01et6vuhtjrv22.apps.googleusercontent.com',
    //     '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',
    //     'https://teacher.easyhaionline.com/teacher/addLiveLecture'
    //     );
 
            
                  const scopes = [
                    'https://www.googleapis.com/auth/youtube.force-ssl',
                    'https://www.googleapis.com/auth/youtube.upload',
                    'https://www.googleapis.com/auth/youtube',
                    'https://www.googleapis.com/auth/youtubepartner-channel-audit'
                  ];
                  const url = oauth2Client.generateAuthUrl({
                    // 'online' (default) or 'offline' (gets refresh_token)
                    access_type: 'offline',
                  
                    // If you only need one scope you can pass it as a string
                    scope: scopes
                  });
            res.send({url})
            



})
const generatetokenaccess2 = asyncHandler(async (req, res) => {
    // const { email, password } = req.body
const {code} =req.body;   
console.log(code)   
// finding the teacher
    const oauth2Client = new google.auth.OAuth2(
        '596027896349-ukttu6l8fc9s5soaekbef9n8vr11blq9.apps.googleusercontent.com',
        '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',
        'http://localhost:8088/teacher/addLiveLecture'
        );
      
    // const oauth2Client = new google.auth.OAuth2(
    //     '596027896349-0mhqktvhfcpp7438jg01et6vuhtjrv22.apps.googleusercontent.com',
    //     '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',
    //     'https://teacher.easyhaionline.com/teacher/addLiveLecture'
    //     );
      
    
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    // const { inputvalues } = req.body
res.send(tokens)




})



module.exports = {
    scheduleLive,
    googleaccess,
    googleaccess2,
    generatetokenaccess,
    generatetokenaccess2

}
