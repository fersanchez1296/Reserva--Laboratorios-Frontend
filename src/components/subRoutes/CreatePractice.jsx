import React, { useEffect,useState } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useContextReservations } from "../context/Context.jsx";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export const CreatePractice = () => {
  const {
    createDataRequest,
    loadSingleDataRequest,
    updateSingleDataRequest,
  } = useContextReservations();
  const params = useParams();
  const navigate = useNavigate();

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
        console.log(response)
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
      <Formik
        initialValues={data}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          if (params.id) {
            await updateSingleDataRequest(params.id, values, "adminPractices");
            navigate("/Main/");
          } else {
            await createDataRequest(values, "adminPractices");
            navigate("/Main/");
          }
          setData({
            nombre: "",
            descripcion: "",
            
          });
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {/* -------------------------------------------------------------------------- */
              /*                        input para escribir el nombre                       */
              /* -------------------------------------------------------------------------- */}
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
              {/* -------------------------------------------------------------------------- */
              /*                        información de la práctica                           */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12">
                <i className="material-icons prefix">description</i>
                <textarea
                  id="descripcion"
                  className="validate textarea"
                  name="descripcion"
                  onChange={handleChange}
                  required
                  value={values.descripcion}
                ></textarea>
                <label htmlFor="descripcion">Descripción</label>
                <ErrorMessage name="password" component="div" />
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                  Redirecciona al componente "AdminTeacher"                 */
              /* -------------------------------------------------------------------------- */}
              <NavLink to="/Main/">
                <div className="input-field col s6">
                  <button className="btn-small red">Cancelar</button>
                </div>
              </NavLink>
              {/* -------------------------------------------------------------------------- */
              /*                Botón para agregar o editar un nuevo usuario                */
              /* -------------------------------------------------------------------------- */}
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
