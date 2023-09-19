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
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

// routes
app.use("/users", require("./routes/users.ts"));
app.use("/register", require("./routes/register.ts"));
app.use("/auth", require("./routes/auth.ts"));
app.use("/refresh", require("./routes/refresh.ts"));
app.use("/logout", require("./routes/logout.ts"));
app.use("/clientInfoUpdate", require("./routes/clientInfoUpdate.ts"));
app.use("/messages", require("./routes/messages.ts"))
app.use("/customerProgress", require("./routes/customerProgress.ts"));
app.use("/files", require("./routes/files.ts"));

app.use(verifyJWT);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on http://%s:%s", host, port);
  });
});

module.exports = app;

/** USER SCHEMA SIMPLE
 * [
           {
                uid: int,
                fName: string,
                lName: string,
                age: short (limit 0-110),
                typeOfWork: string,
                progress: short (limit 1-7),
                spouse : {
                    fName: string,
                    lName: string,
                    age: short (limit 0-110),
                    typeOfWork: string
                },
                address : {
                    street: string,
                    city: string,
                    state: string,
                    zip: string
                },
                phone: string,
                email: string,
                completedProgram: boolean,
                preferredContact: string,
                income: {
                    netMonthlyPay: decimanl,
                    irregularIncome: boolean,
                    useMonthlyBudget: boolean
                },
                savings: {
                    hasEmergencyFund: boolean,
                    emergencyFundAmount: decimal,
                    isCurrentlyInvestRetirement: boolean,
                    retirementBalance: decimal,
                    retirementMonthlyContr: decimal,
                    isContributingNonRetirement: boolean,
                    nonRetirementSavingsBal: decimal,
                    nonRetirementSavingsContr: decmal
                },
                housing: {
                    housingType: ENUM(RENT, OWN),
                    isCurrentOnPay: boolean,
                    totalMonthlyPayment: decimal
                },
                consumerDebt: {
                    hasVehicleLoans: boolean,
                    isCurrentVehiclePayments: boolean,
                    totalMonthlyPayments: decimal,
                    balancesDue: {
                        creditCards: decimal,
                        studentLoans: decimal,
                        taxes: decimal,
                        other: {
                            type: string,
                            amount: decimal
                        }
                    }
                },
                programFocus : {
                    primaryFocus: string,
                    topConcerns: string
                },
                appopintment: {
                    date: date,
                    time: time
                }

           }
        ]
 */
