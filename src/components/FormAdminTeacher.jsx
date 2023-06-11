import React from 'react'
import { CustomInput } from "./CustomInput.jsx";
import { CustomRadio } from "./CustomRadio.jsx";
import { Form, Formik} from "formik";
import {useNavigate } from "react-router-dom";
import { useContextReservations } from "./context/Context.jsx";
import { NavLink} from "react-router-dom";
import { adminTeacherSchema } from '../schemas/adminTeacherSchema.js';
import { Buttons } from './Buttons.jsx';
export const FormAdminTeacher = ({data,codigo}) => {
    const { createDataRequest, updateSingleDataRequest } = useContextReservations();
    const navigate = useNavigate();
  return (
    <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={adminTeacherSchema}
        onSubmit={async (values) => {
          if (codigo) {
            await updateSingleDataRequest(
              codigo,
              values,
              "adminTeacher"
            );
            navigate("/Main/");
          } else {
            await createDataRequest(1, values, "adminTeacher");
            navigate("/Main/");
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            {/* -------------------------------------------------------------------------- */
            /*              Radio button para seleccionar el tipo de usuario              */
            /* -------------------------------------------------------------------------- */}
            <div
              role="group"
              aria-labelledby="type-user-group"
              className="radios-container"
            >
              <CustomRadio
                type="radio"
                name="rol_id"
                value="1"
                required
                data_icon="admin_panel_settings"
                data_label_name="Admin"
              />
              <CustomRadio
                type="radio"
                name="rol_id"
                value="2"
                required
                data_icon="school"
                data_label_name="Profesor"
              />
              <CustomRadio
                type="radio"
                name="rol_id"
                value="3"
                required
                data_icon="class"
                data_label_name="Estudiante"
              />
            </div>
            <div className="row">
              {/* -------------------------------------------------------------------------- */
              /*                        input para escribir el codigo                       */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12">
                <CustomInput
                  id="codigo"
                  type="text"
                  name="codigo"
                  onChange={handleChange}
                  value={values.codigo}
                  required
                  data_label_name="Código"
                  data_icon="vpn_key"
                  data_tag="codigo"
                />
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                        input para escribir el nombre                       */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12">
                <CustomInput
                  id="nombre"
                  type="text"
                  className="validate"
                  name="nombre"
                  onChange={handleChange}
                  value={values.nombre}
                  required
                  data_label_name="Nombre"
                  data_icon="badge"
                  data_tag="nombre"
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
              </div>

              {/* -------------------------------------------------------------------------- */
              /*                   input para escribir el primer apellido                   */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s6">
                <CustomInput
                  id="apellido_1"
                  type="text"
                  className="validate"
                  name="apellido_1"
                  onChange={handleChange}
                  value={values.apellido_1}
                  required
                  data_label_name="Apellido 1"
                  data_icon="badge"
                  data_tag="apellido_1"
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
              </div>

              {/* -------------------------------------------------------------------------- */
              /*                   input para escribir el segundo apellido                  */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s6">
                <CustomInput
                  id="apellido_2"
                  type="text"
                  className="validate"
                  name="apellido_2"
                  onChange={handleChange}
                  value={values.apellido_2}
                  required
                  data_label_name="Apellido 2"
                  data_icon="badge"
                  data_tag="apellido_2"
                  onInput={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                />
              </div>

              {/* -------------------------------------------------------------------------- */
              /*                       input para escribir el telefono                      */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 m6 l6">
                <CustomInput
                  id="telefono"
                  type="text"
                  className="validate"
                  name="telefono"
                  onChange={handleChange}
                  value={values.telefono}
                  required
                  data_label_name="Teléfono"
                  data_icon="phone"
                  data_tag="telefono"
                  maxLength={10}
                  minLength={10}
                />
              </div>

              {/* -------------------------------------------------------------------------- */
              /*                        input para escribir el email                        */
              /* -------------------------------------------------------------------------- */}
              <div className="input-field col s12 m6 l6">
                <CustomInput
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  required
                  data_label_name="Email"
                  data_icon="alternate_email"
                  data_tag="email"
                />
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
