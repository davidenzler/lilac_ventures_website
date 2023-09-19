const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const filesController = require('../controllers/filesController.ts');
const path = require('path');
mongoose.Promise = global.Promise;
//PDF Upload stuff
const crypto = require('crypto');
const multer = require('multer');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');

// Initialize GridFS. Used for PDF uploading/downloading
let gfs;
let gridfsBucket;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');

  // Create GridFS bucket
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});
// Create storage engine. When saving a PDF, it renames it to prevent filename issues
const mongoURI = process.env.DB_URI;
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({ storage });


/* This route allows a user to upload a file to the database
*  To test: 
*  On Thunder Client, make a new:   POST http://localhost:8080/files/  
*  Then select Body -> Form -> Click the "File" checkbox -> enter a field name of "file" -> choose any file and upload it -> hit SEND
*  If successful, you should get a 200 OK status along with some metadata of that file. The file should now also be visible in MongoDB under uploads.chunks/uploads.files
*  Side note: uploads.chucks is the raw pieces of data while uploads.file is the metadata.
*/
router.route('/')
    .post(upload.single('file'), filesController.uploadFile);    

    //                      Debug Option: Sets a timeout interval if the database hangs. Place this code inside one of the consts in filesController.ts
    // // Add a timeout:
    // setTimeout(() => {
    //     res.status(500).send('Request timed out.');
    // }, 5000);  // 5 seconds

/* This route allows a user to download a file saved on the database using the filename
* To test, you first need to know the filename of a file on the database.
* Then you can test by opening a browser (I tested on Edge), and testing the API endpoint by entering the following into the search bar:   
* http://localhost:8080/files/<FILENAME_HERE>   Example: http://localhost:8080/files/10376ee2e50d96d60d8a336bf1074a51.pdf
* If its working, your browser will automatically download the file
*/
router.route('/:fileName')
    .get((req, res) => filesController.getSpecificFile(gfs, gridfsBucket, req, res));


function errorHandler(err, req, res, next) {
    if (err) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      next();
    }
}

router.use(errorHandler);
  

module.exports = router;