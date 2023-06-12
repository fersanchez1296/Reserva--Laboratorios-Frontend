import React from "react";
import { useContextReservations } from "../context/Context.jsx";
import { Form, Formik } from "formik";
import { CustomInput } from "../CustomInput.jsx";
import { useNavigate } from "react-router-dom";
import { adminPracticeSchema } from "../../schemas/adminPracticeSchema.js";
import { Buttons } from "../Buttons.jsx";
import { inputs } from "../../data/adminPracticeData.js";
{
  /* -------------------------------------------------------------------------- */
  /*                 funcion encargada de renderizar los inputs                 */
  /* -------------------------------------------------------------------------- */
}
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
export const FormAdminPractice = ({ data, id }) => {
  const { createDataRequest, updateSingleDataRequest } =
    useContextReservations();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={adminPracticeSchema}
        onSubmit={async (values) => {
          console.log(values);
          if (id) {
            await updateSingleDataRequest(id, values, "adminPractices");
            navigate("/Main/");
          } else {
            await createDataRequest(values, "adminPractices");
            navigate("/Main/");
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            {/* -------------------------------------------------------------------------- */
            /*                                                          Inputs              */
            /* -------------------------------------------------------------------------- */}
            <div className="row">
              {renderInputs(values, handleChange)}
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
                  value={values.descripcion}
                ></textarea>
                <label htmlFor="descripcion">Descripción</label>
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                Botón para agregar o editar una práctica               */
              /* -------------------------------------------------------------------------- */}
              <Buttons isSubmitting={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
