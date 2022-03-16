import React, { useState } from 'react'

import { Navbar } from '../components/Navbar'
import PopUpChargeMovement from '../components/PopUpChargeMovement'


export default function Contenido() {
    const [showChargePopup, setShowChargePopup] = useState(0)

    return (
        <>
            <Navbar />

            <PopUpChargeMovement togglePopup={setShowChargePopup} showPopup={showChargePopup} />

            <section className='chargeButtonContainer'>
                <button onClick={() => setShowChargePopup(!showChargePopup)}>Cargar Movimiento...</button>
            </section>

            <section className='transacciones-moves'>
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>venta auto</td>
                            <td>250</td>
                            <td>22/05/1992</td>
                            <td>Ingreso</td>
                            <td><button>Editar</button></td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </>
    )
}