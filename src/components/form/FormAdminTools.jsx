import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useContextReservations } from "../context/Context.jsx";
import { Form, Formik, ErrorMessage } from "formik";
import { CustomInput } from "../CustomInput.jsx";
import { adminToolsSchema } from '../../schemas/adminToolsSchema.js';
import { Buttons } from '../Buttons.jsx';
import { inputs } from '../../data/adminToolData.js';

const renderInputs = (values, handleChange) => {
  const el = inputs(values);
  return el.map((elemento, index) => (
    <div className={elemento.size} key={index}>
      <CustomInput
        key={index}
        onChange={handleChange}
        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
        {...elemento}
      />
    </div>
  ));
};
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
            {renderInputs(values,handleChange)}
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
