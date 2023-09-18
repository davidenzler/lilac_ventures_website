require("dotenv").config();
const path = require("path");
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dbConnect = require("./config/dbConnect.ts");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT.ts");
const credentials = require("./middleware/credentials.ts");

dbConnect();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(verifyJWT);

// routes
app.use("/users", require("./routes/users.ts"));
app.use("/register", require("./routes/register.ts"));
app.use("/auth", require("./routes/auth.ts"));
app.use("/refresh", require("./routes/refresh.ts"));
app.use("/logout", require("./routes/logout.ts"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on http://%s:%s", host, port);
  });
});

module.exports = app;