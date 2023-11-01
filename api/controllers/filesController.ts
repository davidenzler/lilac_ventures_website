const mongoose = require("mongoose");
const Pdf = require('../model/Pdf.ts'); // Import the Pdf model
const NewPDFUploads = require('../model/NewPDFUploads.ts');

const uploadFile = async (req, res) => {
    if (req.file) {
        // Create a new PDF record with the unique fileId from GridFS
        const newPdf = new Pdf({
            fileId: req.file.id, // the unique id from GridFS
            name: req.file.filename
        });

        await newPdf.save();

        // Extract the username from the filename
        let username = "";
        const filenameWithoutExtension = req.file.filename.split('.')[0]; // Remove file extension
        const filenameParts = filenameWithoutExtension.split(' - ');

        if (filenameParts.length > 1) {
            username = filenameParts[1].trim();
        } else {
            // If the filename is not in the expected format, set the owner to the filename without extension
            username = filenameWithoutExtension;
        }


        // Create an entry in the NewPDFUploads table
        const newUpload = new NewPDFUploads({
            pdf_id: req.file.id,
            pdf_name: req.file.filename,
            owner: username,
            step_number: req.params.stepNumber 
        });

        await newUpload.save();

        res.json({ success: true, message: "File uploaded!", file: req.file });
    } else {
        res.status(400).json({ success: false, message: "File upload failed." });
    }
};

const getSpecificFile = async (gfs, gridfsBucket, req, res) => {
    try {
        let mostRecentFile;
        const filesByName = await gfs.files.find({filename: req.params.fileName}).sort({uploadDate: -1}).toArray();

        if (filesByName.length) {
            mostRecentFile = filesByName[0];
            console.log(`${filesByName.length} file(s) found with the name ${req.params.fileName}.${filesByName.length ? "\nRetrieving newest file." : ""}\n`);
        } else {
            // Attempt to retrieve by _id if fileName matches ObjectId format
            if (req.params.fileName.match(/^[0-9a-fA-F]{24}$/)) {
                const filesById = await gfs.files.find({_id: new mongoose.Types.ObjectId(req.params.fileName)}).sort({uploadDate: -1}).toArray();
                if (filesById.length) {
                    mostRecentFile = filesById[0];
                }
            }
        }

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

const getPDFsByStepNumber = async (req, res) => {
    try {
        const records = await NewPDFUploads.find({ step_number: Number(req.params.stepNumber) });
        return res.json(records);
    } catch (err) {
        return res.status(500).json({ error: 'Internal error occurred' });
    }
};

const getPDFsByUsername = async (req, res) => {
    try {
        const records = await NewPDFUploads.find({ owner: req.params.username });
        return res.json(records);
    } catch (err) {
        return res.status(500).json({ error: 'Internal error occurred' });
    }
};

const deleteNewPDFUpload = async (req, res) => {
    try {
        const { fileName } = req.params;
        
        // Attempt to delete the entry from the NewPDFUploads collection
        const deletedRecord = await NewPDFUploads.findOneAndDelete({ pdf_name: fileName });

        if (!deletedRecord) {
            return res.status(404).json({ error: 'No entry found for the given filename in NewPDFUploads' });
        }
        
        res.status(200).json({
            message: 'Entry deleted successfully from NewPDFUploads',
            deletedRecord
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal error occurred' });
    }
};


module.exports = { uploadFile, getSpecificFile, deleteSpecificFile, 
    fetchSeenByAdminStatus, updateSeenByAdminStatus, getFileIdByName, 
    uploadPdfForMapping, getPDFsByStepNumber, getPDFsByUsername,
    deleteNewPDFUpload}