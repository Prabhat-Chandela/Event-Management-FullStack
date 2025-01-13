import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
        // uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "event-management"
        })
        console.log("File Uploaded On Cloudinary", response.url);
        return response.url;

    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file.
        console.log("Failed to upload to cloudinary", error);
        return null;
    }
}