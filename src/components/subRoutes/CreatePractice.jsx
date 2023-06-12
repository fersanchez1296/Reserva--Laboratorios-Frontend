import React, { useEffect,useState } from "react";
import { FormAdminPractice } from "../form/FormAdminPractice.jsx";
import { useContextReservations } from "../context/Context.jsx";
import { useParams} from "react-router-dom";
import { LoadingScreen } from "../LoadingScreen";

export const CreatePractice = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
    };
    loadData();
  }, []);

  //TODO: Crear validaciones para los campos del formulario.
  return (
    <>
      <div className="title-action-component">
        <h1>{params.id ? "Editar Práctica" : "Crear Práctica"}</h1>
      </div>
      {loading ?  <FormAdminPractice data={data} id={params.id}/> : <LoadingScreen/>}

        
    </>
  );
};
