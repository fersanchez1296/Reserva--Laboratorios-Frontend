import React, {useEffect, useState} from 'react'
import { Form, Formik,ErrorMessage,Field } from 'formik'
import { useContextReservations } from '../context/Context.jsx'
import { NavLink,useParams,useNavigate } from 'react-router-dom'

export const Create = () => {
    const {createDataRequest,loadSingleDataRequest,updateSingleDataRequest} = useContextReservations()
    const params = useParams()
    const navigate = useNavigate()


    const [data,setData] = useState({
        rol_id : "",
        codigo : "",
        nombre : "",
        apellido_1 : "",
        apellido_2 : "",
        telefono : "",
        email : "",
    });

    useEffect(()=> {
        const loadData = async () => {
            if (params.codigo){
                const response = await loadSingleDataRequest(params.codigo);
                setData({
                    rol_id : "",
                    codigo : response[0].codigo,
                    nombre : response[0].nombre,
                    apellido_1 : response[0].apellido_1,
                    apellido_2 : response[0].apellido_2,
                    telefono : response[0].telefono,
                    email : response[0].email
                });
            }   
        };
        loadData();
    },[])

//TODO: Crear validaciones para los campos del formulario.
  return (
    <div>
        <div className='title-action-component'>
            <h1>{params.codigo ? "Editar Usuario" : "Crear Usuario"}</h1>
        </div>
        <Formik 
        initialValues={data}
        enableReinitialize={true}
        onSubmit={async(values,actions) => {
            if(params.codigo){
                await updateSingleDataRequest(params.codigo,values);
                navigate("/Main/AdminTeacher");
            }
            else{
                await createDataRequest(values);
                navigate("/Main/AdminTeacher");
            }
            setData({
                rol_id : "",
                codigo : "",
                nombre : "",
                apellido_1 : "",
                apellido_2 : "",
                telefono : "",
                email : "",
            })
        }}>
            {({handleChange,handleSubmit,isSubmitting,values}) => (
                <Form onSubmit={handleSubmit}>
                    {/*Radio button para seleccionar el tipo de usuario*/}
                <div role="group" aria-labelledby="type-user-group" className='radios-container'>
                        <label className='radios'> 
                            <span className='material-icons'>admin_panel_settings</span>
                            <Field type="radio" name="rol_id" value="1" required/>
                            <span><p>Admin</p></span>
                        </label>
                        <label className='radios'>
                            <span className='material-icons'>school</span>
                            <Field type="radio" name="rol_id" value="2" required/>
                            <span><p>Profesor</p></span>
                        </label>
                        <label className='radios'>
                            <span className='material-icons'>class</span>
                            <Field type="radio" name="rol_id" value="3" required/>
                            <span><p>Estudiante</p></span>
                        </label>
                </div>
                <div className="row">
                    {/*input para escribir el codigo*/}
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="codigo" type="text" className="validate" name="codigo"
                        onChange={handleChange} value={values.codigo} required/>
                        <label htmlFor='codigo'>Código</label>
                        <ErrorMessage name="codigo" component="div" />        
                    </div>     
                    {/*input para escribir el nombre*/}
                    <div className="input-field col s12">
                        <i className="material-icons prefix">badge</i>
                        <input id="nombre" type="text" className="validate" name="nombre" 
                        onChange={handleChange} value={values.nombre} required
                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}/>
                        <label htmlFor='nombre'>Nombre</label>
                        <ErrorMessage name="password" component="div" />    
                    </div>
                    {/*input para escribir el primer apellido*/}
                    <div className="input-field col s6">
                        <i className="material-icons prefix">badge</i>
                        <input id="apellido_1" type="text" className="validate" name="apellido_1" 
                        onChange={handleChange} value={values.apellido_1} required
                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}/>
                        <label htmlFor='apellido_1'>Apellido 1</label>
                        <ErrorMessage name="password" component="div" />    
                    </div>
                    {/*input para escribir el segundo apellido*/}
                    <div className="input-field col s6">
                        <i className="material-icons prefix">badge</i>
                        <input id="apellido_2" type="text" className="validate" name="apellido_2" 
                        onChange={handleChange} value={values.apellido_2} required
                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}/>
                        <label htmlFor='apellido_2'>Apellido 2</label>
                        <ErrorMessage name="password" component="div" />    
                    </div>
                    {/*input para escribir el telefono*/}
                    <div className="input-field col s12">
                        <i className="material-icons prefix">phone</i>
                        <input id="telefono" type="text" className="validate" name="telefono" 
                        onChange={handleChange} value={values.telefono} required maxLength={10}
                        minLength={10}/>
                        <label htmlFor='telefono'>Teléfono</label>
                        <ErrorMessage name="password" component="div" />    
                    </div>
                    {/*input para escribir el email*/}
                    <div className="input-field col s12">
                        <i className="material-icons prefix">alternate_email</i>
                        <input id="email" type="email" className="validate" name="email" 
                        onChange={handleChange} value={values.email} required/>
                        <label htmlFor='email'>E-mail</label>
                        <ErrorMessage name="password" component="div" />    
                    </div> 
                    {/*Redirecciona al componente "AdminTeacher"*/} 
                    <NavLink to="/Main/AdminTeacher">
                        <div className="input-field col s6">
                            <button className='btn-small red'>
                                Cancelar
                            </button>
                        </div>  
                    </NavLink> 
                    {/*Botón para agregar o editar un nuevo usuario*/}
                    <div className="input-field col s6 add-btn">
                        <button type="submit" className='btn-small' disabled={isSubmitting}>
                            {isSubmitting ? "Agregando..." : "Agregar"}
                        </button>
                    </div>   
             
            </div>
            </Form>
  )}
        </Formik>
    </div>
  )
}
