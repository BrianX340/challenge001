import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"

import './App.css'

import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import MovimientosView from './views/MovimientosView'

function App () {

    return (
      <>      
      <Router>
        <div className="App">
            <Route exact path="/" component={HomeView} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/register" component={RegisterView} />
            <Route exact path="/movimientos" component={MovimientosView} />
        </div>
      </Router>

      </>
    )
}

export default App
