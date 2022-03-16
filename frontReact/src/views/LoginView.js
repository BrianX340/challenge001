import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

export default function Contenido(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loged, setLoged] = useState(0);

    const onSubmit = data => {
        const { email, password } = data;
        return axios({
            method: 'post',
            url: `http://localhost:3001/login`,
            crossdomain: true,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                const { status } = res.data;
                status === 'ok' ? setLoged(1) : setLoged(2)
            })
            .catch( (error) =>{
                console.log(error);
            })
    }

    if (loged===1){
        return <Redirect to='/'/>
    }

    return (
    <>
            <section className="container-form">
                <div className="container">
                    <div className="user singinBox">
                        <div className="formBx">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2>Inicio de Sesión</h2>

                                <input placeholder='Email' type="email" {...register("email", { required: true, maxLength: 30 })} />
                                {errors.email ? <small class="text-danger">Debe ingresar un correo</small> : ''}

                                <input id="input-password" placeholder='Password' type="password" {...register("password", { required: true, maxLength: 30 })} />
                                {errors.password ? <small class="text-danger">Debe ingresar una contraseña</small> : ''}

                                <input type="submit" value="Iniciar sesion"/>
                                <p className="signup">¿No tienes cuenta? <a href="/register">
                                    Obtén una cuenta.</a>
                                </p>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}