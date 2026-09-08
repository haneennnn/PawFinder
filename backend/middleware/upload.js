const multer = require("multer");
const fs = require("fs");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;

    if (req.baseUrl.includes("foundPetReports")) {
      dest = "uploads/foundPetReports";
    } else if (req.baseUrl.includes("petReports")) {
      dest = "uploads/petReports";
    } else {
      dest = "uploads";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, `pet-${Date.now()}${extension}`);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG, PNG, and WebP images are allowed"),
      false
    );
  }
};


const upload = multer({
  storage: diskStorage,
  fileFilter
});


module.exports = upload;