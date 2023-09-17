
const uploadFile = async (req, res) => {
    if (req.file) {
      res.json({ success: true, message: "File uploaded!", file: req.file });
    } else {
      res.status(400).json({ success: false, message: "File upload failed." });
    }
  };
  


  const getSpecificFile = async (gfs, gridfsBucket, req, res) => {
    try {
        // Remove the console.log()'s if you want the console to be clean
        console.log("");
        console.log(req.params.fileName);
        console.log("");
        const file = await gfs.files.findOne({filename: req.params.fileName});
        console.log("File found from database:", file);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Check if the file is of a type that the browser can display
        switch (file.contentType) {
            case 'image/jpeg':
            case 'image/png':
                res.set('Content-Type', file.contentType);
                break;
            default:
                res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
                break;
        }

        // Use gridfsBucket to stream the file
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Internal error occurred' });
    }
};


module.exports = { uploadFile, getSpecificFile}