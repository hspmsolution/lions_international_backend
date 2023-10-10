import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 5000000    // 5mb size
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|PDF)$/)) {
    //   return cb(new Error('Please upload a valid image file'))
    // }
    cb(undefined, true)
  }
});


export default upload;
