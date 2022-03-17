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
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form onSubmit={this.handleRegister} className="box">
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
								<label for="" className="label">Verificar Password</label>
								<div className="control has-icons-left">
									<input onChange={this.onChangeRePassword} type="password" placeholder="*******" className="input" required/>
									<span className="icon is-small is-left">
									<i className="fa fa-lock"></i>
									</span>
								</div>
                            </div>
                            <div className="field">
								<a href="/login"  className="button is-success">
									Iniciar Sesion
								</a>
								<button type='submit' className="button is-success">
									Registrarme
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