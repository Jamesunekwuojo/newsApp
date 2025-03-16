import {v2 as cloudinary} from 'cloudinary'
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadToCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, { folder: 'news_images' });
    return result.secure_url;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};
