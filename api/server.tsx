require('dotenv').config();
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');

connectDB();

app.use(cors({
    origin: '*'
}));


app.get('/', function(req, res) {
    res.send('Hello World');
});


app.get("/list_users", function (req, res) {
    console.log(req);
    res.json(
        [
           {
                uid: 1,
                fName: "first1",
                lName: "last1",
                age: 50,
                typeOfWork: "Potato Farmer",
                progress: 1,
                spouse : {
                    fName: "first1Spouse",
                    lName: "last1Spouse",
                    age: 51,
                    typeOfWork: "Beat Farmer"
                },
                address : {
                    street: "123 Magic Road",
                    city: "Magicville",
                    state: "MA",
                    zip: "12345"
                },
                phone: "123-456-789",
                email: "test@test.com",
                completedProgram: false,
                preferredContact: "email",
                income: {
                    netMonthlyPay: 1000.00,
                    irregularIncome: false,
                    useMonthlyBudget: false
                },
                savings: {
                    hasEmergencyFund: false,
                    emergencyFundAmount: 0,
                    isCurrentlyInvestRetirement: false,
                    retirementBalance: 0,
                    retirementMonthlyContr: 0,
                    isContributingNonRetirement: false,
                    nonRetirementSavingsBal: 0,
                    nonRetirementSavingsContr: 0 
                },
                housing: {
                    housingType: "rent",
                    isCurrentOnPay: true,
                    totalMonthlyPayment: 500.99 
                },
                consumerDebt: {
                    hasVehicleLoans: true,
                    isCurrentVehiclePayments: true,
                    totalMonthlyPayments: 200.00,
                    balancesDue: {
                        creditCards: 1000.00,
                        studentLoans: 100000.00,
                        taxes: 0,
                        other: {
                            type: "test",
                            amount: 1.00
                        }
                    }
                },
                programFocus : {
                    primaryFocus: "Budgeting",
                    topConcerns: "test tes test test test test test test tes tes tes test test estest estestestet setset setsetsette"
                },
                appointment: {
                    date: new Date().toLocaleDateString,
                    time: new Date().toLocaleTimeString
                }

           },
        ]
    );
});

app.get('/getUser/:id', function (req, res) {
    const users = [
        {
            uid: 1,
            firstName: "first1",
            lastName: "last1",
            progress: 4
        },
        {
            uid: 2,
            firstName: "first2",
            lastName: "last2",
            progress: 4
        },
        {
            uid: 3,
            firstName: "first3",
            lastName: "last3",
            progress: 2
        }
    ];

    var result = users.find(user => user.uid == req.params.id)
    res.json(result);
});

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and Password required'});
    // const foundUser = search MongoDb
    // if(!foundUser) return res.sendStatus(401);
    // evaluate password
    // const match = await bcypt.compare(pwd, foundUser.password)
    /**
     * if (match)
     *      res.json({'success'})
     * else 
     *      res.sendStatus(401);
     */
}


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    var server = app.listen(8080, function () {
        var host = server.address().address;
        var port = server.address().port;
    
        console.log("Example app listening on http://%s:%s", host, port);
    });
});


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