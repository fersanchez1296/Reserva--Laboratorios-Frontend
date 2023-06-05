import React, {Component, useEffect} from 'react'
import { Filter } from '../Filter'
import { Table } from '../Table';
import { useOutletContext,useNavigate } from 'react-router-dom';
import { useContextReservations } from '../context/Context';
export const View = () => {
  const navigate = useNavigate()
  const {title,whichData,whichApiRequest} = useOutletContext();
  /**
  * useContextReservation es un hook personalizado creado en el componente "Context".
  * "data" es la información que viene desde el contexto.
  *"loadDataRequest" es la función encargada de realizar la petición al backend y traer la información
  */
  const {headers,data,loadDataRequest} = useContextReservations()
  /**
  *El "useEffect()" se encarga de ejecutar la función "loadDataRequest" bien se monta
  *el componente. 
  */
  useEffect (() => {
    loadDataRequest(whichData,whichApiRequest);
  },[title])  
  /**
  * La función "renderTable" es la que condiciona si la tabla se renderiza, la tabla se
  *despliega siempre y cuando la petición al backend retorne información,caso contrario
  *se mostrara un mensaje avisando que no hay información para desplegar
  * @returns 
  */
  function renderTable(){
    if (data.length === 0){return <h1>No hay información aún</h1>} else{return <Table data={data} headers={headers} whichData={whichData}/>}
  }

  const redirect = (where) => {
    switch (where) {
      case 1:
          navigate('/Create/Teacher');
        break;
        case 4:
          navigate("/Create/Tools");
        break;
      default:
        break;
    }
  }
  return (
    <div>
      {/*Mostramos el titulo de la sección en la que estamos*/}
      <div className='header header-component'>
          <h1 className='component-title'>{title}</h1>
      </div>
      {/*Este componente es el encargado de mostrar las acciones para la organización
      y el filtrado de la información de la tabla*/}
      <Filter/>
      {/*Invocamos a la función encargada de renderizar la tabla*/}
      {renderTable()}
      {/*Mostramos un botón para agregar un nuevo usuario, al presionarlo nos redirije
        a un formulario en el cual ingresamos los datos solicitados*/}
      <div className="btn-add">
              <button className='btn-floating btn-large waves-effect waves-light blue'
              onClick={() => redirect(whichData)}>
                <span className="material-icons">
                  add
                </span>
              </button>
            
      </div>
    </div>
  )
}
