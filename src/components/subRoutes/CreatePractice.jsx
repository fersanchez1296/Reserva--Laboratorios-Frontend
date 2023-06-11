import React, { useEffect,useState } from "react";
import { FormAdminPractice } from "../FormAdminPractice.jsx";
import { useContextReservations } from "../context/Context.jsx";
import { NavLink, useParams} from "react-router-dom";

export const CreatePractice = () => {
  const {
    loadSingleDataRequest,
  } = useContextReservations();
  const params = useParams();
  const [data, setData] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    const loadData = async () => {
      if (params.id) {
        const response = await loadSingleDataRequest(
          params.id,
          "adminPractices"
        );
        setData({
          nombre: response[0].nombre,
          descripcion: response[0].descripcion,
        });
      }
    };
    loadData();
  }, []);

  //TODO: Crear validaciones para los campos del formulario.
  return (
    <div>
      <div className="title-action-component">
        <h1>{params.id ? "Editar Práctica" : "Crear Práctica"}</h1>
      </div>
        <FormAdminPractice data={data} id={params.id}/>
    </div>
  );
};
