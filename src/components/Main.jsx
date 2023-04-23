import React, { useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export const Main = () => {
    /**
     * Referencia del bbtón menu almacenada en la variable "btnMenu".
     */
    const btnMenu = useRef();
    /**
     * Referencia del overlay(menú) almacenado en la variable "menuOverlay".
     */
    const menuOverlay = useRef()
    /**
     * Función encargada de desplegar el menú de selección.
     * Se agrega o se quita la clase "is-active" del elemento 
     * para mostrar u ocultar el menú. La clase "hide" es utilizada
     * para intercambiar entre los iconos de menu(hamburguer) y cerrar(close).
     */
    const showMenu = () => {
        btnMenu.current.firstElementChild.classList.toggle("hide");
        btnMenu.current.lastElementChild.classList.toggle("hide");
        menuOverlay.current.classList.toggle("is-active");
    };
//TODO: Crear un componente para renderizar cada icono del menú.
  return (
    <div>
        {/*Botón que despliega el menú con el método onCLick, se pasa la referencia
        *del componente a la función "showMenu() a traves de la variable
        *"btnMenu". */}
        <nav className="nav btn-large" ref={btnMenu} onClick={showMenu}>
                <span className="material-icons" >
                    menu
                </span>
                <span className="material-icons hide">
                    close
                </span>
        </nav>
        {/*Contenedor del Menu*/}
        <section className="menu-overlay is-active" ref={menuOverlay}>
        {/*Icono del menú - Administrar Docente*/}
         <div className="hoverable">
            <NavLink to={"AdminTeacher"} onClick={showMenu}>
                <div className="menu-icon">
                    <span className="material-icons">
                        school
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Docente</p>
                </div>
            </NavLink>
        </div>
        {/*Icono del menú - Administrar Usuario*/}
        <div className="hoverable">
            <NavLink to={"AdminUser"} onClick={showMenu}>
                <div className="menu-icon">
                    <span className="material-icons">
                        person
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Usuario</p>
                </div>
            </NavLink>
        </div>
        {/*Icono del menú - Administrar Materia*/}
        <div className="hoverable">
            <a href="./adminSubject.html">
                <div className="menu-icon">
                    <span className="material-icons">
                        class
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Materia</p>
                </div>
            </a>
        </div>
        {/*Icono del menú - Administrar Material*/}
        <div className=" hoverable">
            <a href="./adminMaterial.html">
                <div className="menu-icon">
                    <span className="material-icons">
                        home_repair_service
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Material</p>
                </div>
            </a>
        </div>
        {/*Icono del menú - Administrar Práctica*/}
        <div className=" hoverable">
            <a href="./adminPractice.html">
                <div className="menu-icon">
                    <span className="material-icons">
                        square_foot
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Práctica</p>
                </div>
            </a>
        </div>
        {/*Icono del menú - Administrar Laboratorio*/}
        <div className=" hoverable">
            <a href="./adminLab.html">
                <div className="menu-icon">
                    <span className="material-icons">
                        science
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Lab</p>
                </div>
            </a>
        </div>
        {/*Icono del menú - Administrar Reserva*/}
        <div className=" hoverable">
            <a href="./adminReservation.html">
                <div className="menu-icon">
                    <span className="material-icons">
                        pending_actions
                    </span>
                </div>
                <div className="menu-title">
                    <p>Administrar Reserva</p>
                </div>
            </a>
        </div>
        {/*Icono del menú - Cerrar Sesión*/}
        <div className=" hoverable">
            <NavLink to={"/"}>
                <div className="menu-icon">
                <span className="material-icons">
                    logout
                </span>
            </div>
            <div className="menu-title">
                <p>Cerrar Sesión</p>
            </div>
        </NavLink>
        </div>
    </section>
        {/*Componente en el cual se despliega toda información y las vistas por encima del botón*/}
        <div className='outlet'>
            <Outlet/>
        </div>
        

    </div>
  )
}
