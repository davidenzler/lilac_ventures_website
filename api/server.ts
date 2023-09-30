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

// routes
app.use("/users", require("./routes/users.ts"));
app.use("/register", require("./routes/register.ts"));
app.use("/auth", require("./routes/auth.ts"));
app.use("/refresh", require("./routes/refresh.ts"));
app.use("/logout", require("./routes/logout.ts"));

app.get("/get_inbox/:id", function (req, res){
    const inboxes = [
        {
            uid: 1,
            inbox: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                {
                    id: 2,
                    sender: {
                        firstName: "Allen",
                        lastName: "Douglas"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }
            ]
        },
        {
            uid: 2,
            inbox: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Ramos"
                    },
                    receiver: {
                        firstName: "Laurel",
                        lastName: "Jane"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                {
                    id: 2,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Laurel",
                        lastName: "Jane"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }
            ]
        },
        
    ];

    var result = inboxes.find(inbox => inbox.uid == req.params.id)
    res.json(result);
})

app.get("/get_sentMessages/:id", function (req, res){
    const allSentMessages = [
        {
            uid: 1,
            sentMessages: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }
            ]
        },
        {
            uid: 2,
            sentMessages: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }
            ]
        },
        
    ];

    var result = allSentMessages.find(sentMessages => sentMessages.uid == req.params.id)
    res.json(result);
})

app.get("/get_archivedMessages/:id", function (req, res){
    const allArchivedMessages = [
        {
            uid: 1,
            archivedMessages: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }
            ]
        },
        {
            uid: 2,
            archivedMessages: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
            ]
        },
        
    ];

    var result = allArchivedMessages.find(archivedMessages => archivedMessages.uid == req.params.id)
    res.json(result);
})

app.get("/get_deletedMessages/:id", function (req, res){
    const allDeletedMessages = [
        {
            uid: 1,
            deletedMessages: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }
            ]
        },
        {
            uid: 2,
            deletedMessages: [
                {
                    id: 1,
                    sender: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    receiver: {
                        firstName: "Linda",
                        lastName: "Jones"
                    },
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
            ]
        },
        
    ];

    var result = allDeletedMessages.find(deletedMessages => deletedMessages.uid == req.params.id)
    res.json(result);
})

const users = [
  {
    uid: 1,
    firstName: "first1",
    lastName: "last1",
    progress: 4,
  },
  {
    uid: 2,
    firstName: "first2",
    lastName: "last2",
    progress: 4,
  },
  {
    uid: 3,
    firstName: "first3",
    lastName: "last3",
    progress: 2,
  },
];

const accounts = [
  {
    uid: 1,
    firstName: "first1",
    lastName: "last1",
    address: {
      street: "123 Magic Road",
      city: "Magicville",
      state: "MA",
      zip: "12345",
    },
    phone: "123456789",
    email: "test@test.com",
    preferredContact: "email",
    password: "test1234",
  },
  {
    uid: 2,
    firstName: "first2",
    lastName: "last2",
    address: {
      street: "123 Magic Road",
      city: "Magicville",
      state: "MA",
      zip: "12345",
    },
    phone: "123456789",
    email: "test@test.com",
    preferredContact: "email",
    password: "test1234",
  },
  {
    uid: 3,
    firstName: "first3",
    lastName: "last3",
    address: {
      street: "123 Magic Road",
      city: "Magicville",
      state: "MA",
      zip: "12345",
    },
    phone: "123456789",
    email: "test@test.com",
    preferredContact: "email",
    password: "test1234",
  },
];

app.get("/list_users", function (req, res) {
  console.log(req);
  res.json([
    {
      uid: 1,
      fName: "first1",
      lName: "last1",
      age: 50,
      typeOfWork: "Potato Farmer",
      progress: 1,
      spouse: {
        fName: "first1Spouse",
        lName: "last1Spouse",
        age: 51,
        typeOfWork: "Beat Farmer",
      },
      address: {
        street: "123 Magic Road",
        city: "Magicville",
        state: "MA",
        zip: "12345",
      },
      phone: "123-456-789",
      email: "test@test.com",
      completedProgram: false,
      preferredContact: "email",
      income: {
        netMonthlyPay: 1000.0,
        irregularIncome: false,
        useMonthlyBudget: false,
      },
      savings: {
        hasEmergencyFund: false,
        emergencyFundAmount: 0,
        isCurrentlyInvestRetirement: false,
        retirementBalance: 0,
        retirementMonthlyContr: 0,
        isContributingNonRetirement: false,
        nonRetirementSavingsBal: 0,
        nonRetirementSavingsContr: 0,
      },
      housing: {
        housingType: "rent",
        isCurrentOnPay: true,
        totalMonthlyPayment: 500.99,
      },
      consumerDebt: {
        hasVehicleLoans: true,
        isCurrentVehiclePayments: true,
        totalMonthlyPayments: 200.0,
        balancesDue: {
          creditCards: 1000.0,
          studentLoans: 100000.0,
          taxes: 0,
          other: {
            type: "test",
            amount: 1.0,
          },
        },
      },
      programFocus: {
        primaryFocus: "Budgeting",
        topConcerns:
          "test tes test test test test test test tes tes tes test test estest estestestet setset setsetsette",
      },
      appointment: {
        date: new Date().toLocaleDateString,
        time: new Date().toLocaleTimeString,
      },
    },
  ]);
});

app.get("/getUser/:id", function (req, res) {
  var result = users.find((user) => user.uid == req.params.id);
  res.json(result);
});

app.get("/account_information/:id", function (req, res) {
  var result = accounts.find((account) => account.uid == req.params.id);
  res.json(result);
});

app.use(verifyJWT);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on http://%s:%s", host, port);
  });
});
app.use("/appointments", require("./routes/appointments.ts"));

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
