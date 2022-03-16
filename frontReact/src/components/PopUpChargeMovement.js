import React, { Component } from 'react'

export default class PopUpChargeMovement extends Component {

    togglePopup = () => {
        if (typeof this.props.togglePopup === 'function') {
            this.props.togglePopup();
        }
    }

    render(){
        return  <>
                <section id='popupCharge' className={this.props.showPopup ? 'chargeActive popup-in' : 'chargeInactive popup-out' }>
                    <span className='closePopupButton' onClick={this.togglePopup} href="">CERRAR</span>
                    <div className='inputsContainerPopup'>

                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>

                    </div>
                    <button>cargar</button>
                </section>
            </>
    }
    
      
}
