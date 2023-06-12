import React from 'react'
import { useContextReservations } from "../context/Context.jsx";
import { Form, Formik} from "formik";
import { useNavigate, useParams} from "react-router-dom";
import { CustomInput } from "../CustomInput.jsx";
import { adminLabSchema } from '../../schemas/adminLabSchema.js';
import { Buttons } from '../Buttons.jsx';
import { inputs } from '../../data/adminLabData.js';

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

export const FormAdminLab = ({data,id,adminI,searchAdmin}) => {
  const params = useParams()
  {console.log(params)}
    const { createDataRequest,updateSingleDataRequest } =
    useContextReservations();
    const navigate = useNavigate();

  return (
    <Formik
    initialValues={data}
    enableReinitialize={true}
    validationSchema={adminLabSchema}
    onSubmit={async (values) => {
      if (id) {
        await updateSingleDataRequest(id, values, "adminLabs");
        navigate("/Main/");
      } else {
        await createDataRequest(values, "adminLabs");
        navigate("/Main/");
      }
    }}
  >
    {({ handleChange, handleSubmit, isSubmitting, values }) => (
      <Form onSubmit={handleSubmit}>
        {/* -------------------------------------------------------------------------- */
        /*                          renderizado de los inputs                         */
        /* -------------------------------------------------------------------------- */}
        <div className="row">
          {renderInputs(values,handleChange)}
          {/* -------------------------------------------------------------------------- */
          /*                       input para escribir el edificio                      */
          /* -------------------------------------------------------------------------- */}
          <div className="input-field with-btn col s12 m6">
            <CustomInput
              id="admin"
              type="number"
              name="admin"
              onChange={handleChange}
              value={values.admin}
              data_label_name="Administrador"
              data_icon="123"
              data_tag="admin"
            />
            <button
              className="btn-large"
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
          <div className="input-field col s12 text-area">
          <textarea
              id="admin_info"
              className="textarea"
              name="admin_info"
              onChange={handleChange}
              required
              value={adminI}
              disabled={true}
            />
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                Botón para agregar o editar un nuevo usuario                */
          /* -------------------------------------------------------------------------- */}
          <Buttons isSubmitting={isSubmitting} params = {params.element}/>
        </div>
      </Form>
    )}
  </Formik>
  )
}
