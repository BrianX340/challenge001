import React, { Component } from 'react'

class Navbar extends Component {

    render() {
        return (
            <>
                <header class="container is-fluid">
                    <nav class="navbar" role="navigation" aria-label="main navigation">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="#">
                                <img src="https://bulma.io/images/placeholders/720x240.png" width="112" height="28"/>
                            </a>

                            <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>
                        <div class="navbar-menu" id="navMenu">
                            <div class="navbar-start">

                            </div>

                            <div class="navbar-end">
                                <a href='/' class="navbar-item">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-home"></i>
                                        </span>
                                        <span>Inicio</span>
                                    </span>
                                </a>

                                <a href='/movimientos' class="navbar-item">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-exchange-alt"></i>
                                        </span>
                                        <span>Movimientos</span>
                                    </span>
                                </a>

                                <div class="navbar-item">
                                    <div class="buttons">

                                        <a href='/logout' class="button is-light">
                                            Cerrar sesion
                                            <span class="icon">
                                                <i class="fas fa-arrow-right-from-bracket"></i>

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