import React, { useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { icons } from "../data/menuData.js";
export const Main = () => {
  /**
   * Referencia del botón menu almacenada en la variable "btnMenu".
   */
  const btnMenu = useRef();
  /**
   * Referencia del overlay(menú) almacenado en la variable "menuOverlay".
   */
  const menuOverlay = useRef();
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
  const renderMenu = () => {
    const menuItem = icons();
    return (
      menuItem.map((element, index) => (
        <NavLink
          to={element.route}
          key={index}
          onClick={() => {
            showMenu();
          }}
        >
          <div className=" item">
            <div className="menu-icon">
              <span className="material-icons">{element.icon}</span>
            </div>
            <div className="menu-title">
              <p>{element.text}</p>
            </div>
          </div>
        </NavLink>
      ))
    )
  }
  return (
    <div className="display">
      {/*Botón que despliega el menú con el método onCLick, se pasa la referencia
       *del componente a la función "showMenu() a traves de la variable
       *"btnMenu". */}
      <nav className="nav btn-large" ref={btnMenu} onClick={showMenu}>
        <span className="material-icons">menu</span>
        <span className="material-icons hide">close</span>
      </nav>
      {/*Contenedor del Menu*/}
      <section className="menu-overlay is-active" ref={menuOverlay}>
        {/* -------------------------------------------------------------------------- */
        /*                    renderizado de los elementos del menú                   */
        /* -------------------------------------------------------------------------- */}
        {renderMenu()}
        {/*Icono del menú - Cerrar Sesión*/}
        <NavLink to={"/"}>
          <div className=" item">
            <div className="menu-icon">
              <span className="material-icons">logout</span>
            </div>
            <div className="menu-title">
              <p>Cerrar Sesión</p>
            </div>
          </div>
        </NavLink>
      </section>
      {/*Componente en el cual se despliega toda información y las vistas por encima del botón*/}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};
