import React, { useEffect, useState } from "react";
import { useContextReservations } from "../context/Context.jsx";
import { useParams } from "react-router-dom";
import { FormAdminTools } from "../FormAdminTools.jsx";

export const CreateTools = () => {
  const {loadSingleDataRequest} = useContextReservations();
  const params = useParams();
  

  const [data, setData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
  });

  useEffect(() => {
    const loadData = async () => {
      if (params.id) {
        const response = await loadSingleDataRequest(params.id, "adminTools");
        setData({
          nombre: response[0].nombre,
          descripcion: response[0].descripcion,
          cantidad: response[0].cantidad,
        });
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <div className="title-action-component">
        <h1>{params.id ? "Editar Equipo" : "Crear Equipo"}</h1>
      </div>
        <FormAdminTools data={data} id={params.id}/>
    </div>
  );
};
