const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const filesController = require("../controllers/filesController.ts");
const path = require("path");
const { gfs, gridfsBucket, upload } = require('../middleware/gridFsSetup.ts');

const ROLES_LIST = require("../config/roles_list.ts");
const verifyRoles = require("../middleware/verifyRoles.ts");

/* This route allows a user to upload a file to the database
 *  To test:
 *  On Thunder Client, make a new:   POST http://localhost:8080/files/
 *  Then select Body -> Form -> Click the "File" checkbox -> enter a field name of "file" -> choose any file and upload it -> hit SEND
 *  If successful, you should get a 200 OK status along with some metadata of that file. The file should now also be visible in MongoDB under uploads.chunks/uploads.files
 *  Side note: uploads.chucks is the raw pieces of data while uploads.file is the metadata.
 */
//router.route("/").post(verifyRoles(ROLES_LIST.admin, ROLES_LIST.user), upload.single("file"), filesController.uploadFile);    
router.route("/:stepNumber").post(upload.single("file"), filesController.uploadFile);  //Upload without authorization for testing purposes

router.route("/NewPDFUploads/step/:stepNumber").get(filesController.getPDFsByStepNumber);
router.route("/NewPDFUploads/username/:username").get(filesController.getPDFsByUsername);
router.route("/NewPDFUploads/:fileName").delete(filesController.deleteNewPDFUpload);


router
  .route("/:fileName")
  .delete((req, res) =>
    filesController.deleteSpecificFile(gfs(), gridfsBucket(), req, res)
  )
  .get((req, res) =>
    filesController.getSpecificFile(gfs(), gridfsBucket(), req, res)
  );

/* The above route allows a user to download a file saved on the database using the filename
 * To test, you first need to know the filename of a file on the database.
 * Then you can test by opening a browser (I tested on Edge), and testing the API endpoint by entering the following into the search bar:
 * http://localhost:8080/files/<FILENAME_HERE>   Example: http://localhost:8080/files/10376ee2e50d96d60d8a336bf1074a51.pdf
 * If its working, your browser will automatically download the file
 */

//This route is used to get the seenByAdmin value
router.route('/pdfModel/:fileId').get(filesController.fetchSeenByAdminStatus);
//This route is used to edit the seenByAdmin value
router.route('/pdfModel/:fileId/:status').put(filesController.updateSeenByAdminStatus);
//Gets fileId from file name
router.route("/getFileId/:fileName").get((req, res) => filesController.getFileIdByName(gfs(), req, res));



function errorHandler(err, req, res, next) {
  if (err) {
    res.status(500).json({ success: false, message: err.message });
  } else {
    next();
  }
}

router.use(errorHandler);

module.exports = router;
