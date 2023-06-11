import React from "react";
import { CustomInput } from "./CustomInput.jsx";
import { CustomRadio } from "./CustomRadio.jsx";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useContextReservations } from "./context/Context.jsx";
import { adminTeacherSchema } from "../schemas/adminTeacherSchema.js";
import { Buttons } from "./Buttons.jsx";
import { elementos } from "../data/adminTeacherData.js";

const renderInputs = (values,handleChange) => {
  const el = elementos(values)
  return el.map((elemento, index) => (
    <div className={elemento.size} key={index}>
      <CustomInput
        key={index}
        type="text"
        onChange={handleChange}
        onInput={(e) =>
          (e.target.value = e.target.value.toUpperCase())
        }
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
            <CustomRadio
              type="radio"
              name="rol_id"
              value="1"
              data_icon="admin_panel_settings"
              data_label_name="Admin"
            />
            <CustomRadio
              type="radio"
              name="rol_id"
              value="2"
              data_icon="school"
              data_label_name="Profesor"
            />
            <CustomRadio
              type="radio"
              name="rol_id"
              value="3"
              data_icon="class"
              data_label_name="Estudiante"
            />
          </div>
          <div className="row">
            {renderInputs(values,handleChange)}
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
