const multer = require('multer');
const path = require('path');

function createMulterUpload(folderName) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderName);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    };

    return multer({ storage, fileFilter });
}

module.exports = createMulterUpload;
