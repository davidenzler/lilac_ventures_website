const events = require('events');
const eventEmitter = new events.EventEmitter();

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

let gfs;
let gridfsBucket;

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');

    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });

    // Emit an event signaling the initialization is done
    eventEmitter.emit('gridFsInitialized');
});

const mongoURI = process.env.DB_URI;
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});
const upload = multer({ storage });

module.exports = {
    gfs: () => gfs,
    gridfsBucket: () => gridfsBucket,
    upload,
    eventEmitter
};
