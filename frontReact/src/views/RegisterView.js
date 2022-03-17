import React, { Component } from 'react'
import AuthService from "../services/AuthService";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRePassword = this.onChangeRePassword.bind(this);
    
        this.state = {
          email: "",
          password: "",
          repassword: "",
          successful: false,
        };
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }    

      onChangeRePassword(e) {
        this.setState({
          repassword: e.target.value
        });
      }  

      handleRegister(e) {
        e.preventDefault();

        AuthService.register(this.state.email, this.state.password)
        .then(sucess=>{
            if(!sucess){
                return false
            }
            this.props.history.push("/login");
            window.location.reload();
        })
      }

      render() {
        return (
            <>
            <section className="container-form">
                <div className="container">
                    <div className="user singinBox">
                        <div className="formBx">
                            <form onSubmit={this.handleRegister}>
                                <h2>Registrarse</h2>

                                <input
                                    onChange={this.onChangeEmail}
                                    placeholder='Email'
                                    type="email"
                                />

                                <input
                                    onChange={this.onChangePassword}
                                    placeholder='Password'
                                    type="password"
                                />

                                <input
                                    onChange={this.onChangeRePassword}
                                    placeholder='Repita Password'
                                    type="password"
                                />

                                <input type="submit" value="Registrarme" />
                                <p className="signup">¿Tienes cuenta? <a href="/login">
                                    Iniciar sesion aqui.</a>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
        )}
    
    }