//import React, { useState } from 'react'

import React from 'react'


export function Navbar() {

    return (
        <>

            <section className='navbar'>
                <ul>
                    <li>
                        <a href='/'>
                            <i className="fas fa-home"></i>
                            <span>Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href='/movimientos'>
                            <i className="fas fa-user"></i>
                            <span>Movimientos</span>
                        </a>
                    </li>
                    <li>
                        <a href='/logout'>
                            <i className="fas fa-user"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </section>

        </>
    )
}

