import path from "path";
import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
const router = express.Router();

// File type validation
function fileFilter(req, file, cb) {
 const filetypes = /jpe?g|png|webp/;
 const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

 const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 const mimetype = mimetypes.test(file.mimetype);

 if (extname && mimetype) {
    cb(null, true);
 } else {
    cb(new Error("Images only!"), false);
 }
}

// Multer configuration with file type validation
const upload = multer({
 storage: multer.memoryStorage(),
 fileFilter: fileFilter,
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
     // Convert buffer to base64-encoded string
     const base64String = req.file.buffer.toString('base64');
 
     // Generate a filename for Cloudinary
     const filename = `${req.file.fieldname}-${Date.now()}`;
 
     // Upload the file to Cloudinary with the custom filename
     const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64String}`, {
       folder: "proshop", // Specify the folder in Cloudinary
       public_id: filename, // Use the custom filename
       resource_type: "image", // Specify the resource type
     });
 
     // Send back the Cloudinary ID
     res.status(200).send({
       message: 'Image uploaded successfully',
       image: result.public_id, // This is the Cloudinary ID
     });
  } catch (err) {
     console.error(err);
     res.status(400);
     throw new Error('Image upload failed');
  }
 });
 

export default router;
