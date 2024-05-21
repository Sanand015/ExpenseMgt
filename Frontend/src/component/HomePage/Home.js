import React, { useEffect, useState } from "react";
import Popup from "../PopUp/Popup";
import './Home.css'
import axios from "axios";
import { Navigate } from "react-router-dom";
import Nav from "../Navbar/Nav";
//import { Link } from "react-router-dom";
//import { render } from "@testing-library/react";

function getCookie() {
  let ca = document.cookie
  let ca2=ca.split('=')
  return ca2[1]
}
export default function Home()
{     
    const [seen,Setseen]=useState(false)
    const [expense,SetExpense]=useState(false)
    const [cookie,setCookie]=useState('')
    const [amount,setAmount]=useState('')
    const[isReport,setReport]=useState(false)
    const [arrayData,setArrayData]=useState([])

  function setToken()
  {
    axios.post('http://localhost:8080/add-expense', {'token':getCookie("token")})
    .then((res)=> {
      if(res.data.success===true){
        Setseen(true)
      }
      else{
        Setseen(false)
      }
    })
    .catch(function (error) {
      alert("error loading data")
    });

  }

function getReport(){
  axios.get('http://localhost:8080/get-report', {headers:{'token':getCookie()}})
  .then((res)=> {
      setReport(true)
      setArrayData(res.data)
  })
  .catch(function (error) {
      alert("Error loading report")
  });
}
  function getAmount()
  {
    axios.get('http://localhost:8080/get-amount', {headers:{'token':getCookie()}})
  .then((res)=> {
    setAmount(res.data)
  })
  .catch(function (error) {
  });
  }

    function setExpenseButton()
    {
        setToken();
        SetExpense(true)
    }

    function togglePopUp(){
      Setseen(!seen)
    }

    function setIncomeButton(){
      setToken();
      SetExpense(false)
    }

    useEffect(()=>{
      setCookie(getCookie())
      getAmount()
      
    })
    return(  
         <>
         <Nav></Nav>
          <h2>Net Amount <span>&#x20B9;</span> {amount}</h2>
<div class="div">
   
   
  </div>
  <hr style={{ width: '100%' }}></hr>
  <div class="div" >
  <button class="button" onClick={setExpenseButton}>Add Expense </button>
   <button class="button" onClick={setIncomeButton}>Add Income</button>
   <button class="button" onClick={getReport} >Report</button>
   {seen ? <Popup  toggle={togglePopUp} cookie={cookie} expense={expense}/>  : null }
   {isReport ? <Navigate replace to="/report-view"   state={arrayData}/>:null} 
</div>
    </>
        
    )
}