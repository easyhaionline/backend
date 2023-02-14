
const notification = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            .container {
                margin: 0;
                padding: 0;
                width: 40%;
                height: 30rem;
                margin: 0 auto;
                position: relative;
            }
    
            .logo {
                padding: 15px 20px;
                background-color: #3f6877;
            }
    
            .body {
                padding: 0px 20px 100px 20px;
                margin-bottom: 100px;
                /* height: 70%; */
            }
    
            .body button {
                padding: 8px 15px;
                border: none;
                background-color: #195677;
                color: #FFF;
                cursor: pointer;
            }
    
            .social-media {
                text-align: center;
            }
    
            .social-media-icons {
                display: inline-flex;
                gap: 5px;
            }
    
            .footer {
                width: 100%;
                position: absolute;
                background-color: #83a4af;
                color: #FFF;
                text-align: center;
                padding: 8px 0px;
                vertical-align: bottom;
            }
    
            @media only screen and (max-width: 620px) {
                .container {
                    width: 90%;
                }
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://easyhaionlinewebsite.s3.amazonaws.com/logo-education.dbc537d2da5fe65bf73e.png" alt=""
                    width="40%">
            </div>
            <div class="body">
                <p style="font-weight:600;">Dear Teacher,</p>
                <p>Arsalan have raised a doubt, Please click on the link to see.</p>
                <p></p>
                <p></p>
                <button
                    onclick="window.location.href='https://www.student.easyhaionline.com/mydoubts/63eb493ff1986f0e33169826'">Doubt</button>
            </div>
    
            <div class="social-media">
                <div class="social-media-icons">
                    <div class="social">
                        <a href="https://www.facebook.com/Easyhaionline-103642968859578">
                            <img src="https://easyhaionlinewebsite.s3.amazonaws.com/FACEBOOK.png" alt="Facebook"
                                title="Facebook" width="32" target="_blank">
                        </a>
                    </div>
                    <div class="social">
                        <a href="https://www.instagram.com/easyhai_online/">
                            <img src="https://easyhaionlinewebsite.s3.amazonaws.com/INSTAGRAM.png" alt="instagram"
                                title="instagram" width="32" target="_blank">
                        </a>
                    </div>
                    <div class="social">
                        <a href="https://www.linkedin.com/company/easy-hai-online/">
                            <img src="https://easyhaionlinewebsite.s3.amazonaws.com/LINKeDIN.png" alt="linkedin"
                                title="linkedin" width="32" target="_blank">
                        </a>
                    </div>
                    <div class="social">
                        <a href="https://www.youtube.com/channel/UC-Ptt1UUPpXbw9n2SFV8PRQ">
                            <img src="https://easyhaionlinewebsite.s3.amazonaws.com/YOUTUBE.png" alt="youtube"
                                title="youtube" width="32" target="_blank">
                        </a>
                    </div>
                    <div class="social">
                        <a href="https://twitter.com/easyhaionline">
                            <img src="https://easyhaionlinewebsite.s3.amazonaws.com/TWITTER.png" alt="twitter"
                                title="twitter" width="32" target="_blank">
                        </a>
                    </div>
                </div>
            </div>
    
            <div class="footer">
                Easyhaionline
            </div>
        </div>
    </body>
    
    </html>`
}


module.exports = {notification}