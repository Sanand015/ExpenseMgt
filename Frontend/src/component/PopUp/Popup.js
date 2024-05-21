import React, { useEffect } from "react"
import { useState } from "react"
import './PopupStyle.css'
import axios from "axios";

export default function Popup(props) {
    const [amount, setAmount] = useState('')
    const [details, setDetails] = useState('')
    const [date,setDate]=useState('')
    const [button,SetButton]=useState('')
    const [errorMessages, setErrorMessages] = useState({});
    const errors = {
        msg: "Invalid Details",
        
      };
   

    function handleRequest(e) {
        e.preventDefault()
        if(amount==='' || details==='' || details===''|| date==='' || isNaN(amount)){
            setErrorMessages({ name: "InvalidDetails", message: errors.msg });
            alert("invalid")
        }
        else{
            if(props.expense){
                axios.post('http://localhost:8080/add-trans', {
                    expense_for:details,
                    transaction_type:'Expense',
                    amount:amount,
                    date:date,
                    token:props.cookie
                })
                .then((res)=> {
                  })
                .catch(function (error) {
                        });
                
            }
            else{
                axios.post('http://localhost:8080/add-trans', {
                    expense_for:details,
                    transaction_type:'Income',
                    amount:amount,
                    date:date,
                    token:props.cookie
                })
                .then((res)=> {
                })
                .catch(function (error) {
                });
            }
            
        }
        props.toggle()
    }

    useEffect(()=>{
        if(props.expense){
                SetButton("Add Expense")
        }
        else{
            SetButton("Add Income")
        }
    },[])

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add Details</h2>
                {renderErrorMessage("InvalidDetails")}
                <form onSubmit={handleRequest}>
                    <label>
                        Expense Amount:
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)}  placeholder="&#x20B9;"/>
                    </label>
                    <label>
                       Transaction Details:
                        <input type="text" value={details} onChange={e => setDetails(e.target.value)} />
                    </label>

                    <label>
                        Date:
                        <input type="date" onChange={e=>setDate(e.target.value)} id="birthday" name="birthday"/>
                    </label>
                    <button   className="button1" type="submit">{button}</button>
                </form>
                <button className="button1" type="submit"  onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}