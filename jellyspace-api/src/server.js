const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute');
const otpRoute = require('./routes/otpRoute');
const projectRoute = require('./routes/projectRoute');
const emailRoute = require('./routes/emailRoute');
const bidRoute = require('./routes/bidRoute');
const { Auth } = require("two-step-auth");
const cors=require("cors");
const app = express();
const port = process.env.PORT;

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
const MongoURL = process.env.MONGO_URL,
    options = { useMongoClient: true };

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", userRoute);
app.use("/api", otpRoute);
app.use("/api", projectRoute);
app.use("/api", emailRoute);
app.use("/api", bidRoute);

mongoose.connect("mongodb://127.0.0.1:27017/jelly-space", {
    useNewUrlParser: true
}).then(() => {
    console.log(`Successfully connected`);
}).catch((err) => {
    console.log(`Connection failed`);
    console.log(`err ` + err);
})

app.listen(8080, () => {
    console.log(`Server is active on ${8080}`);
});
exports.default = { app };













































































































































































































































































































































































































// (async function () {
//   try {
//     await mongoose.connect(MongoURL, { useNewUrlParser: true }, () => {
//       console.log('Connected to MongoDB ');
//     });
//   } catch (error) {
//     handleError(error);
//   }
// })();
// (async function() {
//     try {
//       const conn = await mongoose.connect(uri,options);
//       const testDb = conn.db.db('jelly-space');  // For example,  get "test" as a sibling
//       let result = await testDb.collection('test').find().toArray();
//       log(result);
//     } catch(e) {
//       console.error(e);
//     } finally {
//       mongoose.disconnect();
//     }
//   })();


// const express = require("express");
// const app = express();
// require("./db/conn");
// const Register = require("./models/registers");
// const port = process.env.PORT || 3000;
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// app.get("/", (req, res) => {
//     res.render("index");
// });
// app.get("/register", (req, res) => {
//     res.render("register");
// });
// app.get("/login", (req, res) => {
//     res.render("login");
// });
// // let's create a new user in our database 
// app.post("/register", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.confirmpassword;
//         if(password === cpassword){
//             const registerEmployee = new Register({
//                 firstname : req.body.firstname,
//                 lastname  : req.body.lastname,
//                 email     : req.body.email,
//                 gender    : req.body.gender,
//                 phone     : req.body.phone,
//                 age       : req.body.age,
//                 password  : password,
//                 confirmpassword: cpassword
//             })
//             const registered = await registerEmployee.save();
//             res.status(201).render("index");
//         }else{
//             res.send("passwords are not matching")
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });
// app.listen(port, () => {
//     console.log(`server is running at port no ${port}`);
// })
// const testData = {
//   status: 200,
//   mail: 'nageswararao@gmail.com',
//   OTP: 139145,
//   success: true
// }
// let dbo = db.db('jelly-space');
// dbo.collection('OTP').insertOne(testData,function (err, res){
//   if(err) throw err
//   console.log('1 document inserted');
// })