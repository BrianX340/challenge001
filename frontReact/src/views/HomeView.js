import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService";
import { Redirect } from "react-router-dom";

import Navbar from '../components/Navbar'

export default function HomeView() {
    const [redirect, setRedirect] = useState(0);
    const [operations, setOperations] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalRetired, setTotalRetired] = useState(0);

    const processData = () => {
        var currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            setRedirect(true)
            return
        }

        if (typeof currentUser === 'string') {
            currentUser = JSON.parse(currentUser)
        }
        processOperationData(currentUser);
        setOperations(currentUser.movements)
    };

    const processOperationData = (currentUser) => {
        var totalDeposit = 0;
        var totalRetired = 0;
        currentUser['movements'].forEach(operation => {
            if (operation.type === 'deposit') {
                totalDeposit += operation.amount
            } else if (operation.type === 'retirement') {
                totalRetired += operation.amount;
            }
        })
        setTotalDeposit(totalDeposit)
        setTotalRetired(totalRetired)
    }

    useEffect(() => {
        processData()
    }, []);

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <Navbar />
            <main className="section">
                <div className="column is-half has-background-white m-auto" id="tableTransactions">
                    <div id="tabs-with-content">
                        <div className="tabs is-centered my-4">
                            <ul>
                                <li className="is-size-5 mb-3">Balance</li>
                            </ul>
                        </div>
                        <table className="table is-striped is-narrow is-hoverable auto-margin">
                            <thead>
                                <tr>
                                    <th className='has-text-centered'>INGRESOS</th>
                                    <th className='has-text-centered'>RETIROS</th>
                                    <th className='has-text-centered'>DISPONIBLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='has-text-centered'>
                                        {totalDeposit}
                                    </td>
                                    <td className='has-text-centered'>
                                        {totalRetired}
                                    </td>
                                    <td className='has-text-centered'>
                                        {totalDeposit - totalRetired}
                                    </td>
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
                                            operations
                                            ?
                                            operations.reverse().slice(0, 10).map(operation => {
                                                return <tr>
                                                    <td>{operation.concept}</td>
                                                    <td>{operation.amount}</td>
                                                    <td>{operation.date}</td>
                                                    <td>{operation.type === 'deposit' ? 'INGRESO' : 'RETIRO'}</td>
                                                </tr>
                                            })
                                            :
                                            ''
                                        }
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}