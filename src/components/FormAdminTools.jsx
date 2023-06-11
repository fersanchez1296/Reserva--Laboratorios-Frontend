import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useContextReservations } from "./context/Context.jsx";
import { Form, Formik, ErrorMessage } from "formik";
import { CustomInput } from "./CustomInput.jsx";
import { adminToolsSchema } from '../schemas/adminToolsSchema.js';
import { Buttons } from './Buttons.jsx';
export const FormAdminTools = ({data,id}) => {
    const { createDataRequest, updateSingleDataRequest } =
    useContextReservations();
    const navigate = useNavigate();
  return (
    <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={adminToolsSchema}
        onSubmit={async (values) => {
          if (id) {
            await updateSingleDataRequest(id, values, "adminTools");
            navigate("/Main/");
          } else {
            await createDataRequest(4, values, "adminTools");
            navigate("/Main/");
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {/* -------------------------------------------------------------------------- */
              /*                        input para escribir el nombre                       */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 l6">
                <CustomInput
                  id="nombre"
                  type="text"
                  className="validate"
                  name="nombre"
                  onChange={handleChange}
                  value={values.nombre}
                  data_label_name="Nombre"
                  data_icon="handyman"
                  data_tag="nombre"
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                       input para escribir la cantidad                      */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 l6">
                <CustomInput
                  id="cantidad"
                  type="number"
                  className="validate"
                  name="cantidad"
                  onChange={handleChange}
                  value={values.cantidad}
                  data_label_name="Cantidad"
                  data_icon="123"
                  data_tag="cantidad"
                />
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                        textarea para la descripción                        */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 text-area">
                <i className="material-icons prefix ">description</i>
                <textarea
                  id="descripcion"
                  className="validate textarea"
                  name="descripcion"
                  onChange={handleChange}
                  
                  value={values.descripcion}
                ></textarea>
                <label htmlFor="description">Descripción</label>
                <ErrorMessage name="password" component="div" />
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                Botón para agregar o editar un nuevo usuario                */
              /* -------------------------------------------------------------------------- */}
              <Buttons isSubmitting={isSubmitting}/>
            </div>
          </Form>
        )}
      </Formik>
  )
}
