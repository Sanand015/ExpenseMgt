import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "../Navbar/Nav";
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Report(){
    const location = useLocation();
  const data = location.state;
  
  const tableRows = data.map((element) => {
    return (
        <tr className="items">
            <td>{element.expense_for}</td>
            <td>{element.transaction_date}</td>
            <td style={{ color: element.transaction_type==="Expense" ? "red": "green"}}>{element.transaction_type}</td>
            <td style={{ color: element.amount<0 ? "red": "green"}} >{element.amount}</td>
        </tr>
    );
});

    
        return (
            <div className="container">
                <Nav></Nav>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Transaction Reason </th>
                            <th>Date</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </Table>
            </div>
        );
    
}