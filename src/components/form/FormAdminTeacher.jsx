import React from "react";
import { CustomInput } from "../CustomInput.jsx";
import { CustomRadio } from "../CustomRadio.jsx";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useContextReservations } from "../context/Context.jsx";
import { adminTeacherSchema } from "../../schemas/adminTeacherSchema.js";
import { Buttons } from "../Buttons.jsx";
import { elementos, radios } from "../../data/adminTeacherData.js";

{
  /* -------------------------------------------------------------------------- */
  /*              funcion encargada de renderizar los radio buttons             */
  /* -------------------------------------------------------------------------- */
}
const renderRadios = () => {
  const rd = radios();
  return rd.map((r, index) => <CustomRadio key={index} type="radio" {...r} />);
};
{
  /* -------------------------------------------------------------------------- */
  /*                 funcion encargada de renderizar los inputs                 */
  /* -------------------------------------------------------------------------- */
}
const renderInputs = (values, handleChange) => {
  const el = elementos(values);
  return el.map((elemento, index) => (
    <div className={elemento.size} key={index}>
      <CustomInput
        key={index}
        type="text"
        onChange={handleChange}
        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
        {...elemento}
      />
    </div>
  ));
};

export const FormAdminTeacher = ({ data, codigo }) => {
  const { createDataRequest, updateSingleDataRequest } =
    useContextReservations();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={adminTeacherSchema}
      onSubmit={async (values) => {
        if (codigo) {
          await updateSingleDataRequest(codigo, values, "adminTeacher");
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
            {renderRadios()}
          </div>
          {/* -------------------------------------------------------------------------- */
            /*                                                          Inputs              */
            /* -------------------------------------------------------------------------- */}
          <div className="row">
            {renderInputs(values, handleChange)}
            {/* -------------------------------------------------------------------------- */
            /*                Botón para agregar o editar un nuevo usuario                */
            /* -------------------------------------------------------------------------- */}
            <Buttons isSubmitting={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  );
};
