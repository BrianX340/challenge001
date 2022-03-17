import React, { Component } from "react";
import AuthService from "../services/AuthService";
import UserCrudService from "../services/UserCrudService";
import { Redirect } from "react-router-dom";

import Navbar from '../components/Navbar'
import PopUpChargeMovement from '../components/PopUpChargeMovement'


export default class MovimientosView extends Component {

    constructor(props) {
        super(props);
        this.togglePopup = this.togglePopup.bind(this);
        this.onChangeConcept = this.onChangeConcept.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.chargeOperation = this.chargeOperation.bind(this);


        this.state = {
            showChargePopup: false,
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            concept: "",
            amount: "",
            type: "deposit"
          };
    }

    togglePopup(e) {
        e.preventDefault()
        this.setState({
            showChargePopup: !this.state.showChargePopup
        });
    };

    onChangeConcept(e) {
        e.preventDefault()
        this.setState({
            concept: e.target.value
        });
    }

    onChangeAmount(e) {
        e.preventDefault()
        this.setState({
            amount: e.target.value
        });
    }

    onChangeType(e) {
        e.preventDefault()
        this.setState({
            type: e.target.value
        });
    }

    chargeOperation(e) {
        e.preventDefault();
        UserCrudService.createOperation(this.state.concept, this.state.amount, this.state.type)
            .then((created) => {
                if (!created) {
                    return
                }
                window.location.reload();
            });
    }
  
    componentDidMount() {
      const currentUser = AuthService.getCurrentUser();
  
      if (!currentUser) this.setState({ redirect: "/login" });
      this.setState({ currentUser: currentUser, userReady: true })
    }

    render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
    
        const { currentUser } = this.state;
    
        return (
            <>
                <Navbar />
            {(this.state.userReady) ?
                <>    
                <section className='chargeButtonContainer'>
                    <button className="button is-success" onClick={this.togglePopup}>Cargar Movimiento...</button>
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
                                            <tr>
                                                <td>venta auto</td>
                                                <td>250</td>
                                                <td>22/05/1992</td>
                                                <td>Ingreso</td>
                                                <td>Modificar</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            
                            </div>
                        </div>
                    </div>

                </main>

                <form className={this.state.showChargePopup ? 'chargeActive popup-in' : 'chargeInactive popup-out' }>
                    <div></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title has-text-centered">Cargar movimiento</p>
                            <span onClick={this.togglePopup} className="delete" aria-label="close"></span>
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
                                                onChange={this.onChangeConcept}
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
                                                onChange={this.onChangeAmount}
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
                                            <select value={this.state.type} onChange={this.onChangeType}>
											    <option value="deposit">INGRESO</option>
                                                <option value="retirement">RETIRO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>


                        <footer className="modal-card-foot">
                            <span className="button" onClick={this.chargeOperation}>Cargar operacion</span>
                            <span className="button" onClick={this.togglePopup}>Volver</span>
                        </footer>
                    </div>
                </form>

            </>
            : null}
            
        </>
        )
    }
}