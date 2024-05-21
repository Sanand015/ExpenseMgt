//import
const express = require("express");
const app = express();
const cookiePaser = require("cookie-parser");
const {checkForAuthenticationCookie}=require("./middleware/authentication")
const cors = require('cors');
const {authenticatePwd,testingToken,insertToDB,netAmount,getReport,createUser}=require("./model/model")

const corsOptions ={
    origin:'http://localhost:3000', 
	exposedHeaders: 'token',
    credentials:true,            //access-control-allow-credentials:true
	httpOnly: false,
	secure:false,
	sameSite:"none",
	preflightContinue:true
    // optionSuccessStatus:200
}

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));


//connecting port
const PORT = 8080;
app.listen(PORT,
	console.log(`Server started on port ${PORT}`)
);



app.put("/create-user",createUser) 
app.post("/login",authenticatePwd) 
app.post("/add-expense",testingToken)
app.post("/add-trans",insertToDB)  
app.get("/get-amount",netAmount) 
app.get("/get-report",getReport)


module.exports=app
