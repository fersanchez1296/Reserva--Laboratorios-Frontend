import React, { useEffect, useState } from "react";
import { useContextReservations } from "../context/Context.jsx";
import { useParams } from "react-router-dom";
import { FormAdminTeacher } from "../form/FormAdminTeacher.jsx";
import { LoadingScreen } from "../LoadingScreen";

export const Create = () => {
  const [loading, setLoading] = useState(false);
  const { loadSingleDataRequest } = useContextReservations();
  const params = useParams();
  const [data, setData] = useState({
    rol_id: "",
    codigo: "",
    nombre: "",
    apellido_1: "",
    apellido_2: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    const loadData = async () => {
      if (params.codigo) {
        const response = await loadSingleDataRequest(
          params.codigo,
          "adminTeacher"
        );
        setData({
          rol_id: "",
          codigo: response[0].codigo,
          nombre: response[0].nombre,
          apellido_1: response[0].apellido_1,
          apellido_2: response[0].apellido_2,
          telefono: response[0].telefono,
          email: response[0].email,
        });
      }
      setLoading(true)
    };
    loadData();
  }, []);

  //TODO: Crear validaciones para los campos del formulario.
  return (
    <>
      <div className="title-action-component">
        <h1>{params.codigo ? "Editar Usuario" : "Crear Usuario"}</h1>
      </div>
      {loading ?  <FormAdminTeacher data={data} codigo={params.codigo}/> : <LoadingScreen/>}
    </>
  );
};
