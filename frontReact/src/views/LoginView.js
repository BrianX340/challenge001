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
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form onSubmit={this.handleLogin} className="box">
                            <div className="field">
                            <label for="" className="label">Email</label>
                            <div className="control has-icons-left">
                                <input onChange={this.onChangeEmail} type="email" placeholder="asd@example.com" className="input" required/>
                                <span className="icon is-small is-left">
                                <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                            </div>
                            <div className="field">
                            <label for="" className="label">Password</label>
                            <div className="control has-icons-left">
                                <input onChange={this.onChangePassword} type="password" placeholder="*******" className="input" required/>
                                <span className="icon is-small is-left">
                                <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            </div>
                            <div className="field">
                            <button type='submit' className="button is-success">
                                Iniciar Sesion
                            </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </>
        )}
}