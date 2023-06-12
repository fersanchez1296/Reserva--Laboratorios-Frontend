import React from 'react'
import { useNavigate } from "react-router-dom";
export const Buttons = ({isSubmitting}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="input-field col s12 btns">
    <button className="btn-large red" onClick={handleGoBack} type='button'>Cancelar</button>
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
