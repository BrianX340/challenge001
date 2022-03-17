import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService";
import { Redirect } from "react-router-dom";

import Navbar from '../components/Navbar'

export default function HomeView(){
    const [redirect, setRedirect] = useState(0);
    const [userReady, setUserReady] = useState(0);
    const [currentUser, setCurrentUser] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalRetired, setTotalRetired] = useState(0);

    const processData = () => {
        var currentUser = AuthService.getCurrentUser();
        setCurrentUser(currentUser)
        setUserReady(true)

        var totalDeposit = 0;
        var totalRetired = 0;

        let data = currentUser

        if(typeof data === 'string'){
            data = JSON.parse(data)
        }
        
        data['movements'].forEach(operation => {
            if(operation.type==='deposit'){
                totalDeposit += operation.amount
            } else if ( operation.type === 'retirement') {
                totalRetired += operation.amount;
            }
        })

        setTotalDeposit(totalDeposit)
        setTotalRetired(totalRetired)
      };

    useEffect(() => {

        if(userReady){
            return
        }else{
            processData()
        }
      },[]);

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <Navbar />
        {(userReady) ?
            <main className="section">

            <div className="container is-fluid box" id="tableTransactions">

                <div id="tabs-with-content">

                    <div className="tabs is-centered my-4">
                        <ul>
                            <li className="is-size-5 mb-3"><a>Balance</a></li>
                        </ul>
                    </div>

                    <table className="table is-striped is-narrow is-hoverable auto-margin">
                            <thead>
                                <tr>
                                    <th>INGRESOS</th>
                                    <th>RETIROS</th>
                                    <th>DISPONIBLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {totalDeposit}
                                    </td>
                                    <td>
                                        {totalRetired}
                                    </td>
                                    <td>{totalDeposit - totalRetired}</td>
                                </tr>
                            </tbody>
                        </table>

                    <div>

                        <section className="tab-content table-container has-text-centered">
                            <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Concepto</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        JSON.parse(currentUser)['movements'].map(operation=>{
                                            return  <tr>
                                                        <td>{operation.concept}</td>
                                                        <td>{operation.amount}</td>
                                                        <td>{operation.createdAt}</td>
                                                        <td>{operation.type === 'deposit' ? 'INGRESO' : 'RETIRO'}</td>
                                                        <td>Modificar</td>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>
                    
                    </div>
                </div>
            </div>

        </main>
        : null}
        
    </>
    )
}