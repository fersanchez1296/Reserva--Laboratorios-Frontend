import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useContextReservations } from "../context/Context.jsx";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export const CreateLab = () => {
  const { createDataRequest, loadSingleDataRequest, updateSingleDataRequest,getAdminRequest } =
    useContextReservations();
  const params = useParams();
  const navigate = useNavigate();
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
    };
    loadData();
    
  }, []);

  

  //TODO: Crear validaciones para los campos del formulario.
  return (
    <div>
      <div className="title-action-component">
        <h1>{params.id ? "Editar Laboratorio" : "Crear Laboratorio"}</h1>
      </div>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateSingleDataRequest(params.id, values, "adminLabs");
            navigate("/Main/");
          } else {
            await createDataRequest(values, "adminLabs");
            navigate("/Main/");
          }
          setData({
            nombre: "",
            edificio: "",
            nombre: "",
            admin: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {/* -------------------------------------------------------------------------- */
              /*                       input para escribir el edificio                      */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 m6 l12">
                <i className="material-icons prefix">handyman</i>
                <input
                  id="edificio"
                  type="text"
                  className="validate"
                  name="edificio"
                  onChange={handleChange}
                  value={values.edificio}
                  required
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
                <label htmlFor="edificio">Edificio</label>
                <ErrorMessage name="password" component="div" />
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                      input para escribir la capacidad                      */
              /* -------------------------------------------------------------------------- */}

              <div className="input-field col s12 m6 l12">
                <i className="material-icons prefix">handyman</i>
                <input
                  id="capacidad"
                  type="text"
                  className="validate"
                  name="capacidad"
                  onChange={handleChange}
                  value={values.capacidad}
                  required
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
                <label htmlFor="capacidad">Capacidad</label>
                <ErrorMessage name="password" component="div" />
              </div>

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
              /*         input para buscar al usuario administrador del laboratorio         */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 ml6">
                <i className="material-icons prefix">123</i>
                <input
                  id="admin"
                  type="text"
                  className="validate"
                  name="admin"
                  onChange={handleChange}
                  value={values.admin}
                  required
                />
                <label htmlFor="admin">Administador de laboratorio</label>
                <ErrorMessage name="password" component="div" />
                <button
                  className="btn-small"
                  disabled={isSubmitting}
                  type="button"
                  onClick={() => searchAdmin(values.admin)}
                >
                  {isSubmitting ? "Buscando..." : "Buscar"}
                </button>
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                        información del administrador                       */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12">
                <i className="material-icons prefix">description</i>
                <textarea
                  id="admin_info"
                  className="validate textarea"
                  name="admin_info"
                  onChange={handleChange}
                  required
                  value={adminI}
                  disabled={true}
                ></textarea>
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
