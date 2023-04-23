import React from 'react';
import 'material-icons/iconfont/material-icons.css';
import header_logo from '../assets/logos/header_logo.png';
import footer_logo from '../assets/logos/footer_logo.png';
import {Formik,Form,ErrorMessage} from 'formik';
import { NavLink } from 'react-router-dom';
export const Login = () => {
  return (
    <div>
        {/*Cabecera del componene "Login"*/}
        <div className="header">
            <div className="l-+ogo">
                <img src={header_logo} alt="Logo de la Universidad de Guadalajara" />
            </div>
            <div className="title">
                <h1>Lab-R CUValles</h1>
            </div>
        </div>
        {/*Login del componente */}
        <section className="main">
            {/*Descripción del componente*/}
            <article className='login-description'>
                <p className='flow-text'>
                Lab-R es un sistema desarrollado en el CUValles
                para generar reservaciones en los laboratorios
                y facilitar el acceso a docentes y alumnos para
                realizar las prácticas pertinentes a sus campos
                de estudio.
                </p>
            </article>
            {/*Login del cponente */}
            <article className="login-form z-depth-3">
                {/*Formulario del login*/}
                <Formik 
                    initialValues={{'codigo' : '', 'password' : ''}}>
                    {() => (
                        <Form>

                            {/*Campo "user" de login*/} 
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="code" type="text" className="validate" name="code"/>
                                <label htmlFor='code'>Código</label>
                                <ErrorMessage name="email" component="div" />
                                
                            </div> 
                            {/*Campo "password" de login*/}   
                            <div className="input-field col s6">
                                <i className="material-icons prefix">password</i>
                                <input id="password" type="password" className="validate" name="password" />
                                <label htmlFor='password'>Password</label>
                                <ErrorMessage name="password" component="div" />
                                
                            </div>
                            {/*Botón de inicio de sesión*/}
                            <div className="">
                             <NavLink to={"/Main"}><button className='waves-effect waves-light btn' type="submit">Ingresar<i className="material-icons right">cloud</i></button></NavLink> 
                            </div>                           
                            
                        </Form>
                        )}
                </Formik>
            </article>
        </section>

        {/*Footer del componente "Login"*/}
        <div className="footer">
            <img src={footer_logo} alt="Logo de la Universidad de Guadalajara" />
            <p>Universidad de Guadalajara © Derechos reservados ©1997 - 2023</p>
        </div>
    </div>
  )
}
