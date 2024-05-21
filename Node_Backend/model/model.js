//const {connect}=require("./connection")
const {createTokenForUser}=require("../middleware/tokengenerator")


const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
    host: "localhost",
    database: 'expensedb',
	password: 'root',
	port: "5432",
	
});

client
	.connect()
	.then(() => {
		
	})
	.catch((err) => {
		
	});


function authenticatePwd(req,res)
{
    client.query('select * from USERS Where NAME=$1',[req.body.name], (error, results) => {
        if (error) {
          throw error
        }
        else{
            if(results.rows.length==0){res.send("user not found")}
            else{            
            if(results.rows[0].password!=req.body.pwd){
              return res.status(401).json('')
                    //res.send("Invalid crede")
            }
            else{
                const token= createTokenForUser(results.rows)
                var data = {
                success: true,
                message: "Login success"
              };
              res.setHeader('token',token)
              return res.status(200).json(data)
            }
          }
                
        }
      })
}

function testingToken(req,res)
{  
    var data = {
        success: true,
      };
            if(req.user!=null){
                    res.status(200).send(data);
            }
            else{
                data.success=false;
                res.status(403).send(data)
            }
            
}

function insertToDB(req,res){
    var amount=req.body.amount
    if(req.body.transaction_type==='Expense'){
        req.body.amount=0-req.body.amount
    }
    client.query('INSERT INTO expense_details (user_id, expense_for,transaction_type,transaction_date,amount) VALUES ($1,$2,$3,$4,$5)', [req.user._id,req.body.expense_for,req.body.transaction_type,req.body.date,req.body.amount], (error, results) => {
        if (error) {
          res.status(500).send("Error in submitting")
        }
        res.status(201).send(`Transaction added`)
      })
    }


    //to fetch the total net amount 
function netAmount(req,res){
  if(req.user._id){
    client.query('SELECT user_id,SUM(amount) FROM expense_details  GROUP BY user_id HAVING user_id=$1',[req.user._id],(error,results)=>{
        if(error){
                res.send(0)
        }
        else{
          if(results.rows.length==0){
            
            res.send("No value")
          }
          else{
            res.status(200).send(results.rows[0].sum);
          }
        }
    })
  }
}

function createUser(req,res){
  client.query('select * from USERS Where NAME=$1',[req.body.name], (error, results) => {
    if (error) {
      throw error
    }
    else{

        if(results.rows.length>0){
          return res.status(403).send(`User already exist: ${req.body.name}`)
        }
        else{
          client.query('INSERT INTO USERS (name, password) VALUES ($1, $2)', [req.body.name, req.body.pwd], (error, results) => {
            if (error) {
              throw error
            }
            res.status(201).send(`User added with name : ${req.body.name}`)
          })
        }
            
    }
  })
}

function getReport(req,res){
  client.query('SELECT * FROM expense_details WHERE user_id = $1', [req.user._id], (error, results) => {
    if (error) {
      res.send("Error Generating report")
    }
    if(results.rows.length==0){
      const rows=[{
        expense_for:'NA',
        transaction_date:'NA',
        transaction_type:'NA',
        amount:0
      }]
      res.send(rows)
    }
    else{
      res.status(200).json(results.rows)
    }
   
  })
}

module.exports={
    authenticatePwd,testingToken,insertToDB,netAmount,getReport,createUser
}