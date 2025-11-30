import multer from "multer";

// ...existing code...
const storage = multer.diskStorage({
  // Optional: set where and how files are saved
  // destination: (req, file, cb) => cb(null, "uploads/"),
  // filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ...existing code...
export default upload;
// Or named export:
// export { upload };