const cloudinary = require('cloudinary')

const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME, // env variable name changed
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

exports.uploads = (file,folder)=>{

    return new Promise(resolve => {
            console.log(file);
            cloudinary.uploader.upload(file,(result)=>{
                resolve({
                    url:result.url,
                    id:result.public_id
                    },{
                    resource_type:"auto",
                    folder:'./uploads/website/'                        
                    })
            })
        })
}