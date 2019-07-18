const express = require('express');
const multer  = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({
    storage: storage
});

router.post('/save-image', upload.single('file'), (req,res,next) => {
    res.status(201).json('image uploaded');
});

module.exports = router;
