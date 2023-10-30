const mongoose = require("mongoose");
const Pdf = require('../model/Pdf.ts'); // Import the Pdf model

  const uploadFile = async (req, res) => {
    if (req.file) {
        // Create a new PDF record with the unique fileId from GridFS
        const newPdf = new Pdf({
            fileId: req.file.id, // the unique id from GridFS
            name: req.file.filename
        });

        await newPdf.save();

        res.json({ success: true, message: "File uploaded!", file: req.file });
    } else {
        res.status(400).json({ success: false, message: "File upload failed." });
    }
  };

  const getSpecificFile = async (gfs, gridfsBucket, req, res) => {
    try {
        // Remove the console.log()'s if you want the console to be clean
        // console.log("");
        // console.log(req.params.fileName);
        // console.log("");
        const file = await gfs.files.find({filename: req.params.fileName}).sort({uploadDate: -1}).toArray();
        const mostRecentFile = file[0];

        if (file.length >= 1){
            console.log(`${file.length} file(s) found with the name ${req.params.fileName}.${file.length ? "\nRetrieving newest file." : ""}\n`);
        }
        
        //console.log("File found from database:", mostRecentFile);
        if (!mostRecentFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Check if the file is of a type that the browser can display
        switch (mostRecentFile.contentType) {
            case 'image/jpeg':
            case 'image/png':
                res.set('Content-Type', mostRecentFile.contentType);
                break;
            default:
                res.set('Content-Disposition', 'attachment; filename="' + mostRecentFile.filename + '"');
                break;
        }

        // Use gridfsBucket to stream the file
        const readStream = gridfsBucket.openDownloadStream(mostRecentFile._id);
        readStream.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Internal error occurred' });
    }
};

const deleteSpecificFile = async (gfs, gridfsBucket, req, res) => {
  try {
      const files = await gfs.files.find({filename: req.params.fileName}).sort({uploadDate: 1}).toArray();
      const oldestFile = files[0];
      console.log(`${files.length} file(s) found with the name ${req.params.fileName}.\nDeleting oldest file.\n`);


      if (!oldestFile) {
          console.log("File not found response being sent.");
          return res.status(404).json({ error: 'File not found' });
      }

      // Accessing the collections directly via mongoose connection
      const filesCollection = mongoose.connection.collection('uploads.files');
      const chunksCollection = mongoose.connection.collection('uploads.chunks');

      // Deleting the Pdf document from the Pdf collection
      await Pdf.deleteOne({ fileId: oldestFile._id });

      // Deleting the metadata from uploads.files
      await filesCollection.deleteOne({_id: oldestFile._id});

      // Deleting the chunks associated with the file from uploads.chunks
      await chunksCollection.deleteMany({files_id: oldestFile._id});

      res.status(200).json({ msg: 'File deleted successfully' });

  } catch (err) {
      console.error("Error in catch block:", err);
      res.status(500).json({ error: 'Internal error occurred' });
  }
};

const fetchSeenByAdminStatus = async (req, res) => {
    try {
        const pdf = await Pdf.findOne({ fileId: req.params.fileId });
        if (!pdf) {
            return res.status(404).json({ error: 'Pdf not found' });
        }
        res.json({ 
            fileName: pdf.name,
            seenByAdmin: pdf.seenByAdmin 
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal error occurred' });
    }
};

const updateSeenByAdminStatus = async (req, res) => {
    try {
        const { fileId, status } = req.params;
        
        // Check if status is 'true' or 'false'
        if (status !== 'true' && status !== 'false') {
            return res.status(400).json({ error: 'Invalid status provided. Please use true or false.' });
        }
        
        const updatedStatus = (status === 'true');
        
        const updatedPdf = await Pdf.findOneAndUpdate(
            { fileId: fileId },
            { seenByAdmin: updatedStatus },
            { new: true }
        );
        
        if (!updatedPdf) {
            return res.status(404).json({ error: 'Pdf not found' });
        }
        
        res.json({
            message: 'Updated successfully',
            fileName: updatedPdf.name,
            seenByAdmin: updatedPdf.seenByAdmin
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal error occurred' });
    }
};

const getFileIdByName = async (gfs, req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.fileName });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.json({ fileId: file._id.toString() }); 
    } catch (err) {
        console.error("Error in getFileIdByName:", err); // Log the error for debugging
        res.status(500).json({ error: 'Internal error occurred', detailedError: err.message });
    }
};

const uploadPdfForMapping = async (req) => {
    console.log("Request file: ", req.file);
    console.log("Request body: ", req.body);

    if (!req.file) {
        throw new Error("File upload failed.");
    }

    const newPdf = new Pdf({
        fileId: req.file.id,
        name: req.file.filename
    });

    await newPdf.save();
    return newPdf;
};



module.exports = { uploadFile, getSpecificFile, deleteSpecificFile, fetchSeenByAdminStatus, updateSeenByAdminStatus, getFileIdByName, uploadPdfForMapping}