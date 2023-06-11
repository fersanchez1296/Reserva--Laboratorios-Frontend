import React, { useEffect, useRef, useState } from "react";
import { useContextReservations } from "../context/Context.jsx";
import { useParams } from "react-router-dom";
import { FormAdminSubjects } from "../FormAdminSubjects.jsx";

export const CreateSubjects = () => {
  const { loadSingleDataRequest, getGrupos, getCarreras } =
    useContextReservations();
  const params = useParams();
  const [carrera_n, setCarrera] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const id_grupo = useRef("");
  const [data, setData] = useState({
    crn: "",
    clave: "",
    nombre: "",
    grupo: "",
  });

  useEffect(() => {
    const loadData = async () => {
      if (params.crn) {
        const response = await loadSingleDataRequest(params.crn, "subject");
        setData({
          crn: response[0].crn,
          clave: response[0].clave,
          nombre: response[0].nombre,
        });
        loadCarrera();
      }
    };
    loadData();

    const loadCarrera = async () => {
      const response = await getCarreras();
      const carreras = response.map((carrera) => Object.values(carrera));
      setCarrera(carreras);
    };
    loadCarrera();
  }, []);

  const searchGrupos = async (clave_carrera) => {
    const response = await getGrupos(clave_carrera.current.value);
    const grupos = response.map((grupos) => Object.values(grupos));
    setGrupos(grupos);
  };

  return (
    <div>
      <div className="title-action-component">
        <h1>{params.crn ? "Editar Materia" : "Crear Materia"}</h1>
      </div>
      <FormAdminSubjects
        data={data}
        crn={params.crn}
        searchGrupos={searchGrupos}
        carrera_n={carrera_n}
        grupos={grupos}
        id_grupo={id_grupo}
      />
    </div>
  );
};
