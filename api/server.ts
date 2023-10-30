require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dbConnect = require("./config/dbConnect.ts");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT.ts");
const credentials = require("./middleware/credentials.ts");
const methodOverride = require('method-override');
const { eventEmitter } = require('./middleware/gridFsSetup.ts');

// Connect to the database
dbConnect();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}));

// To use JWT verification for your routes, uncomment the line below.
// app.use(verifyJWT);
app.use(methodOverride('_method'));

// Routes
app.use("/users", require("./routes/users.ts"));
app.use("/register", require("./routes/register.ts"));
app.use("/auth", require("./routes/auth.ts"));
app.use("/refresh", require("./routes/refresh.ts"));
app.use("/logout", require("./routes/logout.ts"));
app.use("/clientInfoUpdate", require("./routes/clientInfoUpdate.ts"));
app.use("/messages", require("./routes/messages.ts"))
app.use("/customerProgress", require("./routes/customerProgress.ts"));
app.use("/files", require("./routes/files.ts"));
app.use("/pdfStepMapping", require("./routes/pdfStepMapping.ts"));
app.use("/admins", require("./routes/admins.ts"));

// Start the server once the GridFS setup is complete
eventEmitter.on('gridFsInitialized', () => {
    const server = app.listen(8080, () => {
        console.log("Connected to MongoDB");
        const host = server.address().address;
        const port = server.address().port;
        console.log("Example app listening on http://%s:%s", host, port);
    });
});
app.use("/appointments", require("./routes/appointments.ts"));

module.exports = app;
