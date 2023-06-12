import React, { useState,useEffect } from "react";
import { Filter } from "../Filter";
import { Table } from "../Table";
import { useNavigate,useParams } from "react-router-dom";
import { useContextReservations } from "../context/Context";
import { LoadingScreen } from "../LoadingScreen";
export const View = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setTitile = () => {
    switch (params.element) {
      case "adminTeacher":
       return "Administrar Docente"
      case "adminSubjects":
        return "Administrar Materias"
      case "adminTools":
        return "Administrar Equipo"
      case "adminPractices":
        return "Administrar Practicas"
      case "adminLabs":
        return "Administrar Laboratorios"
      default:
        break;
    }
  }

  /**
   * useContextReservation es un hook personalizado creado en el componente "Context".
   * "data" es la información que viene desde el contexto.
   *"loadDataRequest" es la función encargada de realizar la petición al backend y traer la información
   */
  const { headers, data, loadDataRequest } = useContextReservations();
  /**
   *El "useEffect()" se encarga de ejecutar la función "loadDataRequest" bien se monta
   *el componente.
   */
  useEffect(() => {
    const fetch = async() => {
       await loadDataRequest(params.element);
       setLoading(true)
    }
    fetch();

    return () => {
     setLoading(false)
    }
  },[params]);
  /**
   * La función "renderTable" es la que condiciona si la tabla se renderiza, la tabla se
   *despliega siempre y cuando la petición al backend retorne información,caso contrario
   *se mostrara un mensaje avisando que no hay información para desplegar
   * @returns
   */
  function renderTable() {
    if (data.length === 0) {
      return <h1>No hay información aún</h1>;
    } else {
      return (
        <Table
          data={data}
          headers={headers}
        />
      );
    }
  }

  const redirect = () => {
    switch (params.element) {
      case "adminTeacher":
        navigate("/Create/Teacher");
        break;
      case "adminSubjects":
        navigate("/Create/Subject");
        break;
      case "adminTools":
        navigate("/Create/Tools");
        break;
      case "adminPractices":
        navigate("/Create/Practice");
        break;
      case "adminLabs":
        navigate("/Create/Lab");
        break;
      default:
        break;
    }
  };
  return (
    <div className="view">
      {/*Mostramos el titulo de la sección en la que estamos*/}
      <div className="header header-component">
        <h1 className="component-title">{setTitile()}</h1>
      </div>
      {/*Este componente es el encargado de mostrar las acciones para la organización
      y el filtrado de la información de la tabla*/}
      <Filter />
      {/*Invocamos a la función encargada de renderizar la tabla*/}
      {loading ? renderTable() :  <LoadingScreen/>}
      {/*Mostramos un botón para agregar un nuevo usuario, al presionarlo nos redirije
        a un formulario en el cual ingresamos los datos solicitados*/}
      <div className="btn-add">
        <button
          className="btn-floating btn-large waves-effect waves-light blue"
          onClick={() => redirect()}
        >
          <span className="material-icons">add</span>
        </button>
      </div>
    </div>
  );
};
