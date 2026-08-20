const multer = require("multer");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads";

    if (req.baseUrl.includes("petReports")) {
      dest = "uploads/petReports";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const fileName = `pet-${Date.now()}.${extension}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter,
});

module.exports = upload;