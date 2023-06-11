import React from 'react'
import { useContextReservations } from "./context/Context.jsx";
import { Form, Formik} from "formik";
import { NavLink,useNavigate} from "react-router-dom";
import { CustomInput } from "./CustomInput.jsx";
import { adminLabSchema } from '../schemas/adminLabSchema.js';
import { Buttons } from './Buttons.jsx';
export const FormAdminLab = ({data,id,adminI,searchAdmin}) => {
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
        <div className="row">
          {/* -------------------------------------------------------------------------- */
          /*                       input para escribir el edificio                      */
          /* -------------------------------------------------------------------------- */}
          <div className="input-field col s12 m6 l12">
            <CustomInput
              id="edificio"
              type="text"
              className="validate"
              name="edificio"
              onChange={handleChange}
              value={values.edificio}
              data_label_name="Edificio"
              data_icon="handyman"
              data_tag="edificio"
              onInput={(e) =>
                (e.target.value = e.target.value.toUpperCase())
              }
            />
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                      input para escribir la capacidad                      */
          /* -------------------------------------------------------------------------- */}

          <div className="input-field col s12 m6 l12">
            <CustomInput
              id="capacidad"
              type="text"
              className="validate"
              name="capacidad"
              onChange={handleChange}
              value={values.capacidad}
              data_label_name="Capacidad"
              data_icon="handyman"
              data_tag="capacidad"
              onInput={(e) =>
                (e.target.value = e.target.value.toUpperCase())
              }
            />
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                        input para escribir el nombre                       */
          /* -------------------------------------------------------------------------- */}
          <div className="input-field col s12 ml6">
            <CustomInput
              id="nombre"
              type="text"
              className="validate"
              name="nombre"
              onChange={handleChange}
              value={values.nombre}
              data_label_name="Nombre"
              data_icon="123"
              data_tag="nombre"
            />
          </div>
          {/* -------------------------------------------------------------------------- */
          /*         input para buscar al usuario administrador del laboratorio         */
          /* -------------------------------------------------------------------------- */}
          <div className="input-field col s12 ml6">
            <CustomInput
              id="admin"
              type="text"
              className="validate"
              name="admin"
              onChange={handleChange}
              value={values.admin}
              data_label_name="Administrador"
              data_icon="123"
              data_tag="admin"
            />
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
          <div className="input-field col s12 text-area">
          <textarea
              id="admin_info"
              className="validate textarea"
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
          <Buttons isSubmitting={isSubmitting}/>
        </div>
      </Form>
    )}
  </Formik>
  )
}
