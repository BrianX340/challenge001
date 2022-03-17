import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService";
import UserCrudService from "../services/UserCrudService";
import { Redirect } from "react-router-dom";

import Navbar from '../components/Navbar'
import PopUpChargeMovement from '../components/PopUpChargeMovement'

export default function MovimientosView(){
    const [redirect, setRedirect] = useState(0);
    const [userReady, setUserReady] = useState(0);
    const [currentUser, setCurrentUser] = useState(0);
    const [showChargePopup, setShowChargePopup] = useState(0);
    const [concept, setConcept] = useState(0);
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('deposit');

    const processData = () => {
        var currentUser = AuthService.getCurrentUser();
        if(!currentUser){
            setRedirect(true)
        }
        setCurrentUser(currentUser)
        setUserReady(true)
      };
    
    useEffect(() => {
        if(userReady){
            return
        }else{
            processData()
        }
      },[]);

    const onChangeConcept = (e) => {
        setConcept(e.target.value)
    }

    const onChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    const onChangeType = (e) => {
        setType(e.target.value)
    }

    const chargeOperation = (e) => {;
        UserCrudService.createOperation(concept, amount, type)
            .then((created) => {
                if (!created) {
                    return
                }
                window.location.reload();
            });
    }

    if (redirect) {
        return <Redirect to="/login" />
    }
  
    return (
        <>
            <Navbar />
        {(userReady) ?
            <>    
            <section className='chargeButtonContainer'>
                <button className="button is-success" onClick={()=> setShowChargePopup(!showChargePopup)}>Cargar Movimiento...</button>
            </section>

            <main className="section">

                <div className="container is-fluid box" id="tableTransactions">

                    <div id="tabs-with-content">

                        <div className="tabs is-centered my-4">
                            <ul>
                                <li className="is-size-5 mb-3">Movimientos</li>
                            </ul>
                        </div>

                        <div>

                            <section className="tab-content table-container has-text-centered">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>Concepto</th>
                                            <th>Monto</th>
                                            <th>Fecha</th>
                                            <th>Tipo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        JSON.parse(currentUser)['movements'].reverse().map(operation=>{
                                            return <tr>
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

            <form className={showChargePopup ? 'chargeActive popup-in' : 'chargeInactive popup-out' }>
                <div></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title has-text-centered">Cargar movimiento</p>
                        <span onClick={()=> setShowChargePopup(!showChargePopup)} className="delete" aria-label="close"></span>
                    </header>

                    <section className="modal-card-body" id="sellDetailTemplateContainer">

                        <div className="field is-horizontal">
                            <div className="field-label is-small">
                                <label className="label">Concepto:</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input is-small"
                                            onChange={onChangeConcept}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-small">
                                <label className="label">Monto:</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input is-small"
                                            onChange={onChangeAmount}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-small">
                                <label className="label">Tipo:</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <select value={type} onChange={onChangeType}>
                                            <option value="deposit">INGRESO</option>
                                            <option value="retirement">RETIRO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>


                    <footer className="modal-card-foot">
                        <span className="button" onClick={chargeOperation}>Cargar operacion</span>
                        <span className="button" onClick={()=> setShowChargePopup(!showChargePopup)}>Volver</span>
                    </footer>
                </div>
            </form>

        </>
        : null}
        
    </>
    )
}