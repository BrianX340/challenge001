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
        this.toogleHidePopUp = this.toogleHidePopUp.bind(this);
        this.onChangeConcept = this.onChangeConcept.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.chargeOperation = this.chargeOperation.bind(this);


        this.state = {
            showChargePopup: false,
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            concept: "",
            amount: "",
            date: "",
            type: ""
          };
    }

    togglePopup = () => {
        this.setState({
            showChargePopup: !this.state.showChargePopup
        });
    };

    toogleShowPopUp(){
        this.setState({showChargePopup:true})
    }

    toogleHidePopUp(){
        this.setState({showChargePopup:false})
    }

    onChangeConcept(e) {
        e.preventDefault()
        this.setState({
            concept: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    chargeOperation(e) {
        e.preventDefault();
        UserCrudService.createOperation(this.state.concept, this.state.amount, this.state.date, this.state.type)
            .then((created) => {
                if (!created) {
                    return
                }
                this.props.history.push("/");
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
                    <button onClick={this.togglePopup}>Cargar Movimiento...</button>
                </section>
    
                <section className='transacciones-moves'>
                    <table>
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
                                <td><button>Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section id='popupCharge' className={this.state.showChargePopup ? 'chargeActive popup-in' : 'chargeInactive popup-out' }>
                    <span className='closePopupButton' onClick={this.togglePopup} href="">CERRAR</span>
                    <div className='inputsContainerPopup'>

                    <div>
                        <label htmlFor="">Concepto</label>
                        <input
                            onChange={this.onChangeConcept}
                            type="text"
                            />
                    </div>
                    <div>
                        <label htmlFor="">Monto</label>
                        <input
                            onChange={this.onChangeAmount}
                            type="text"
                            />
                    </div>
                    <div>
                        <label htmlFor="">Fecha</label>
                        <input
                            onChange={this.onChangeDate}
                            type="text"
                            />
                    </div>
                    <div>
                        <label htmlFor="">Tipo</label>
                        <input
                            onChange={this.onChangeType}
                            type="text"
                            />
                    </div>

                    </div>
                    <button onClick={this.chargeOperation} >cargar</button>
                </section>
            </>
            : null}
            
        </>
        )
    }
}