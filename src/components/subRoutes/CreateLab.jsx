import React, { useEffect,useState } from "react";
import { useContextReservations } from "../context/Context.jsx";
import { useParams} from "react-router-dom";
import { FormAdminLab } from "../form/FormAdminLab.jsx";
import { LoadingScreen } from "../LoadingScreen";

export const CreateLab = () => {
  const [loading, setLoading] = useState(false);
  const {loadSingleDataRequest,getAdminRequest } =useContextReservations();
  const params = useParams();
  const [adminI,setAdmin] = useState("");
  const [data, setData] = useState({
    nombre: "",
    edificio: "",
    capacidad: "",
    admin: "",
  });

  const searchAdmin = async (admin_code) => {
    const response = await getAdminRequest(admin_code);
    const admin = response.map((info) => Object.values(info).map(i => i + "\n"));
    
    setAdmin(admin);
  };

  useEffect(() => {
    const loadData = async () => {
      if (params.id) {
        const response = await loadSingleDataRequest(
          params.id,
          "adminLabs"
        );
        
        setData({
          nombre: response[0].nombre,
          edificio: response[0].edificio,
          capacidad: response[0].capacidad,
          admin: response[0].usuario_codigo,
        });
        searchAdmin(response[0].usuario_codigo)
      }
      setLoading(true)
    };
    loadData();
    
  }, []);

  

  //TODO: Crear validaciones para los campos del formulario.
  return (
    <>
      <div className="title-action-component">
        <h1>{params.id ? "Editar Laboratorio" : "Crear Laboratorio"}</h1>
      </div>
      {loading ?  <FormAdminLab data={data} id={params.id} adminI={adminI} searchAdmin={searchAdmin}/> : <LoadingScreen/>}
      
    </>
  );
};
