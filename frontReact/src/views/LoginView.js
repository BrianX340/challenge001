import React, { Component } from 'react'
import AuthService from "../services/AuthService";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
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

    handleLogin(e) {
        e.preventDefault();
        AuthService.login(this.state.email, this.state.password)
            .then((loged) => {
                if (!loged) {
                    return
                }
                this.props.history.push("/");
                window.location.reload();
            });

    }

    render() {
        return (
            <>
            <section className="container-form">
                <div className="container">
                    <div className="user singinBox">
                        <div className="formBx">
                            <form onSubmit={this.handleLogin}>
                                <h2>Inicio de Sesión</h2>

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

                                <input type="submit" value="Iniciar sesion" />
                                <p className="signup">¿No tienes cuenta? <a href="/register">
                                    Obtén una cuenta.</a>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
        )}
}