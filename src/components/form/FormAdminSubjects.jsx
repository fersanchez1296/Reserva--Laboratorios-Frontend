import React, { useRef } from "react";
import { useContextReservations } from "../context/Context.jsx";
import { CustomInput } from "../CustomInput.jsx";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Buttons } from "../Buttons.jsx";
import { adminSubjectsSchema } from "../../schemas/adminSubjectsSchemas.js";
import { inputs } from '../../data/adminSubjectData.js';

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
export const FormAdminSubjects = ({
  data,
  crn,
  carrera_n,
  grupos,
  id_grupo,
  searchGrupos,
}) => {
  const { createDataRequest, updateSingleDataRequest } =
    useContextReservations();
  const navigate = useNavigate();
  const clave_carrera = useRef("");
  return (
    <Formik
      initialValues={data}
      enableReinitialize={true}
      validationSchema={adminSubjectsSchema}
      onSubmit={async (values) => {
        console.log(values);
        if (crn) {
          await updateSingleDataRequest(crn, values, "subject");
          navigate("/Main/");
        } else {
          await createDataRequest(values, "subject");
          navigate("/Main/");
        }
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit}>
          <div className="row">
            {renderInputs(values,handleChange)}
            {/* -------------------------------------------------------------------------- */
            /*                        select para buscar la carrera                        */
            /* -------------------------------------------------------------------------- */}
            <div className="input-field col s12">
              <select
                className="select"
                onChange={() => searchGrupos(clave_carrera)}
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

            {/* -------------------------------------------------------------------------- */
            /*                      Select para seleccionar el grupo                      */
            /* -------------------------------------------------------------------------- */}
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
            {/* -------------------------------------------------------------------------- */
            /*                Botones               */
            /* -------------------------------------------------------------------------- */}
            <Buttons isSubmitting={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  );
};
