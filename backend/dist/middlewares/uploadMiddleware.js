import multer from "multer";
export const uploadMiddleware = (error) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../files/');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    const upload = multer({ storage: storage });
    if (!error) {
        upload.single('file');
    }
};
//# sourceMappingURL=uploadMiddleware.js.map