import React from 'react'
import { useContextReservations } from "./context/Context.jsx";
import { Form, Formik} from "formik";
import { CustomInput } from "./CustomInput.jsx";
import { NavLink,useNavigate} from "react-router-dom";
import { adminPracticeSchema } from '../schemas/adminPracticeSchema.js';
import { Buttons } from './Buttons.jsx';
export const FormAdminPractice = ({data,id}) => {
    const {
        createDataRequest,
        updateSingleDataRequest,
      } = useContextReservations();
      const navigate = useNavigate();
  return (
    <div>
        <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={adminPracticeSchema}
        onSubmit={async (values) => {
          console.log(values)
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
            <div className="row">
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
             <Buttons isSubmitting={isSubmitting}/>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
