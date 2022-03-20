import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <>
                <header className="container is-fluid">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <span role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </span>
                        </div>
                        <div className="navbar-menu" id="navMenu">
                            <div className="navbar-start"></div>
                            <div className="navbar-end">
                                <a href='/' className="navbar-item">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i className="fas fa-home"></i>
                                        </span>
                                        <span>Inicio</span>
                                    </span>
                                </a>
                                <a href='/movimientos' className="navbar-item">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i className="fas fa-exchange-alt"></i>
                                        </span>
                                        <span>Movimientos</span>
                                    </span>
                                </a>
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <a href='/logout' className="button is-light">
                                            Cerrar sesion
                                            <span className="icon">
                                                <i className="fas fa-arrow-right-from-bracket"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </>
        )
    }
}

export default Navbar;