import React from 'react'
import { NavLink } from "react-router-dom";
export const Buttons = ({isSubmitting}) => {
  return (
    <div className="input-field col s12 btns">
    <NavLink to="/Main/">
      <button className="btn-large red">Cancelar</button>
    </NavLink>
    <button
      type="submit"
      className="btn-large"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Agregando..." : "Agregar"}
    </button>
  </div>
  )
}
