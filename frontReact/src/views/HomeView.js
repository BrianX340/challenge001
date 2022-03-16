import React from 'react'

import { Navbar } from '../components/Navbar'
import '../assets/css/all.css'

export default function Contenido() {

    return (
        <>
            <Navbar />
            <div>

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
        </>
    )
}