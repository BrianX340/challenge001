import React, { Component } from "react";
import AuthService from "../services/AuthService";
import { Redirect } from "react-router-dom";

import Navbar from '../components/Navbar'

export default class HomeView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        redirect: null,
        userReady: false,
        currentUser: { username: "" },
        totalDeposit: 0,
        totalRetired: 0
      };
    }
  
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) this.setState({ redirect: "/login" });
        this.setState({ currentUser: currentUser, userReady: true })

        var totalDeposit = 0;
        var totalRetired = 0;
        currentUser['movements'].forEach(operation => {
            if(operation.type==='deposit'){
                totalDeposit += operation.amount
            } else if ( operation.type === 'retirement') {
                totalRetired += operation.amount;
            }
        })
        this.setState({ totalDeposit, totalRetired })
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
                                            {this.state.totalDeposit}
                                        </td>
                                        <td>
                                            {this.state.totalRetired}
                                        </td>
                                        <td>{this.state.totalDeposit - this.state.totalRetired}</td>
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
                                            currentUser['movements'].map(operation=>{
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
}