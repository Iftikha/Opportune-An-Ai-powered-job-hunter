// // utils/imageUpload.js
// const multer =  require("multer");
// // import path from "path";

// // Multer memory storage (no temp file on disk)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // ImageKit instance


// // Function to upload buffer to ImageKit
// const uploadToImageKit = async (fileBuffer, fileName) => {
//   const uploadedImage = await imagekit.upload({
//     file: fileBuffer, // File buffer from multer
//     fileName: fileName || `image-${Date.now()}`, // Image name
//     folder: "/uploads", // Optional folder in ImageKit
//   });
//   return uploadedImage;
// };

// module.exports = {uploadToImageKit, upload};