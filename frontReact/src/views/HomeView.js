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
        currentUser: { username: "" }
      };
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
                <div>
                    {JSON.stringify(currentUser)}
                <section className='balance'>
                    <h1>Balance</h1>
                    <div>
                        <div>
                            <h2>Ingresos</h2>
                            <span>$232.50</span>
                        </div>
                        <div>
                            <h2>Retiros</h2>
                            <span>$232.50</span>
                        </div>
                    </div>
                </section>

                <section className='transacciones-home'>
                    <table>
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>venta auto</td>
                                <td>250</td>
                                <td>22/05/1992</td>
                                <td>Ingreso</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </div>
            : null}
            
        </>
        )
    }
}