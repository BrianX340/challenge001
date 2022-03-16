import React, { useState } from 'react'
import  { Redirect } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Contenido() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registered, setRegistered] = useState(0);


    const onSubmit = data => {
        const { email, password, repassword } = data;
        if(password !== repassword){
            return
        }
        return axios({
            method: 'post',
            url: `http://localhost:3001/register`,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                const { status } = res.data;
                status === 'ok' ? setRegistered(1) : setRegistered(2)
            })
            .catch( (error) =>{
                console.log(error);
            })
    }

    if (registered===1){
        return <Redirect to='/login'/>
    }

    return (
        <>
            <section className="container-form">
                <div className="container">
                    <div className="user singinBox">
                        <div className="formBx">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2>Registrarse</h2>

                                <input placeholder='Email' type="email" {...register("email", { required: true, maxLength: 30 })} />
                                {errors.email ? <small class="text-danger">Debe ingresar un correo</small> : ''}

                                <input id="input-password" placeholder='Password' type="password" {...register("password", { required: true, maxLength: 30 })} />
                                {errors.password ? <small class="text-danger">Contraseña</small> : ''}

                                <input id="input-password" placeholder='Repita Password' type="password" {...register("repassword", { required: true, maxLength: 30 })} />
                                {errors.password ? <small class="text-danger">Repita contraseña</small> : ''}

                                <input type="submit" value="Registrarme" />
                                <p className="signup">¿Tienes cuenta? <a href="/login">
                                    Iniciar sesion aqui.</a>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}