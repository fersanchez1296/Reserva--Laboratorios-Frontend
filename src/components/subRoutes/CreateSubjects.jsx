import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useContextReservations } from "../context/Context.jsx";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export const CreateSubjects = () => {
  const {
    createDataRequest,
    loadSingleDataRequest,
    updateSingleDataRequest,
    getGrupos,
    getCarreras,
  } = useContextReservations();
  const params = useParams();
  const navigate = useNavigate();
  const [carrera_n, setCarrera] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const clave_carrera = useRef("");
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
        const response = await loadSingleDataRequest(
          params.crn,
          "subject"
        );
        setData({
          crn: response[0].crn,
          clave: response[0].clave,
          nombre: response[0].nombre,
        });
        loadCarrera()
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

  const searchGrupos = async () => {
    const response = await getGrupos(clave_carrera.current.value);
    const grupos = response.map((grupos) => Object.values(grupos));
    setGrupos(grupos);
  };

  //TODO: Crear validaciones para los campos del formulario.
  return (
    <div>
      <div className="title-action-component">
        <h1>{params.crn ? "Editar Materia" : "Crear Materia"}</h1>
      </div>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          if (params.crn) {
            await updateSingleDataRequest(params.crn, values, "subject");
            navigate("/Main/");
          } else {
            await createDataRequest(values, "subject");
            navigate("/Main/");
          }
          setData({
            crn: "",
            clave: "",
            nombre: "",
            grupo: clave_carrera.current.value,
          });
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {/*input para escribir el crn*/}
              <div className="input-field col s12 m6 l12">
                <i className="material-icons prefix">handyman</i>
                <input
                  id="crn"
                  type="text"
                  className="validate"
                  name="crn"
                  onChange={handleChange}
                  value={values.crn}
                  required
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
                <label htmlFor="crn">CRN</label>
                <ErrorMessage name="password" component="div" />
              </div>
              {/*input para escribir la clave*/}
              <div className="input-field col s12 m6 l12">
                <i className="material-icons prefix">handyman</i>
                <input
                  id="clave"
                  type="text"
                  className="validate"
                  name="clave"
                  onChange={handleChange}
                  value={values.clave}
                  required
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
                <label htmlFor="clave">Clave</label>
                <ErrorMessage name="password" component="div" />
              </div>

              {/*input para escribir el nombre*/}
              <div className="input-field col s12 ml6">
                <i className="material-icons prefix">123</i>
                <input
                  id="nombre"
                  type="text"
                  className="validate"
                  name="nombre"
                  onChange={handleChange}
                  value={values.nombre}
                  required
                />
                <label htmlFor="nombre">Nombre</label>
                <ErrorMessage name="password" component="div" />
              </div>

              {/*input para buscar la carrera*/}
              <div className="input-field col s12">
                <select
                  className="select"
                  onChange={() => searchGrupos()}
                  ref={clave_carrera}
                >
                  <option value="0">Elije la Carrera</option>
                  {carrera_n.map((carrera) => {
                    return (
                      <option
                        key={Object.values(carrera)[0]}
                        value={Object.values(carrera)[0]}
                      >
                        {`${Object.values(carrera)[1]} (${
                          Object.values(carrera)[0]
                        })`}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/*Select*/}
              <div className="input-field col s12">
                <select
                  className="select"
                  onChange={handleChange}
                  name="grupo"
                  ref={id_grupo}
                >
                  <option value="0">Elije el grupo</option>
                  {grupos.map((grupo) => {
                    return (
                      <option
                        value={Object.values(grupo)[0]}
                        key={Object.values(grupo)[0]}
                      >
                        {Object.values(grupo)[1]}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/*Redirecciona al componente "AdminTeacher"*/}
              <NavLink to="/Main/">
                <div className="input-field col s6">
                  <button className="btn-small red">Cancelar</button>
                </div>
              </NavLink>
              {/*Botón para agregar o editar un nuevo usuario*/}
              <div className="input-field col s6 add-btn">
                <button
                  type="submit"
                  className="btn-small"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Agregando..." : "Agregar"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
