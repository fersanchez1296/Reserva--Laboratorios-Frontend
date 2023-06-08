import React, {useEffect, useState} from 'react';
import { Form, Formik,ErrorMessage,Field } from 'formik';
import { useContextReservations } from '../context/Context.jsx';
import { NavLink,useParams,useNavigate } from 'react-router-dom';

export const CreateTools = () => {
    const {createDataRequest,loadSingleDataRequest,updateSingleDataRequest} = useContextReservations();
    const params = useParams()
    const navigate = useNavigate()


    const [data,setData] = useState({
        id : "",
        nombre : "",
        descripcion : "",
        cantidad : "",
    });

    useEffect(()=> {
        const loadData = async () => {
            if (params.id){
                const response = await loadSingleDataRequest(params.id,"adminTools");
                console.log(response)
                setData({
                    nombre : response[0].nombre,
                    descripcion : response[0].descripcion,
                    cantidad : response[0].cantidad,
                });
            }   
        };
        loadData();
    },[])

//TODO: Crear validaciones para los campos del formulario.
  return (
    <div>
        <div className='title-action-component'>
            <h1>{params.id ? "Editar Equipo" : "Crear Equipo"}</h1>
        </div>
        <Formik 
        initialValues={data}
        enableReinitialize={true}
        onSubmit={async(values,actions) => {
            if(params.id){
                await updateSingleDataRequest(params.id,values,"adminTools");
                navigate("/Main/");
            }
            else{
                await createDataRequest(4,values,"adminTools");
                navigate("/Main/");
            }
            setData({
              id : "",
              nombre : "",
              descripción : "",
              cantidad : "",
            })
        }}>
            {({handleChange,handleSubmit,isSubmitting,values}) => (
                <Form onSubmit={handleSubmit}>
                <div className="row"> 
                    {/*input para escribir el nombre*/}
                    <div className="input-field col s12 l6">
                        <i className="material-icons prefix">handyman</i>
                        <input id="nombre" type="text" className="validate" name="nombre" 
                        onChange={handleChange} value={values.nombre} required
                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}/>
                        <label htmlFor='nombre'>Nombre</label>
                        <ErrorMessage name="password" component="div" />    
                    </div>
                    {/*input para escribir la cantidad*/}
                    <div className="input-field col s12 l6">
                        <i className="material-icons prefix">123</i>
                        <input id="cantidad" type="number" className="validate" name="cantidad" 
                        onChange={handleChange} value={values.cantidad} required/>
                        <label htmlFor='cantidad'>Cantidad</label>
                        <ErrorMessage name="password" component="div" />    
                    </div>
                    {/*textarea para la descripción*/}
                    <div className="input-field col s12">
                        <i className="material-icons prefix">descriction</i>
                        <textarea id="descripcion" className="validate textarea" name="descriction"
                            onChange={handleChange}  required cols={10} rows={30} value={values.descripcion}>
                        </textarea>
                        <label htmlFor='description'>Descripción</label>
                        <ErrorMessage name="password" component="div" />    
                    </div> 
                    {/*Redirecciona al componente "AdminTeacher"*/} 
                    <NavLink to="/Main/">
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