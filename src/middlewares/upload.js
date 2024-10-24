import path from "path";
import multer from "multer";

// TO CONFIGURE STORAGE OPTIONS FOR MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("File destination:", "uploads/"); //DEBUGGING LINE
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log("File name:", `${file.fieldname}-${Date.now()}${ext}`); // DEBUGGING LINE
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// TO INITIALIZE MULTER WITH THE DEFINED STORAGE CONFIGURATION
export const upload = multer({ storage });
