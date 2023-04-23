import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContextReservations } from './context/Context.jsx';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
/**
 * @param {*} data
 * El parametro "data" es la información de los usuarios proporcionada
 * desde el componente invocador "AdminTeacher".
 * @returns 
 */
export const Table = ({headers,data}) => {
  /**
   * Hook personalizado relacionado con la adminitración de usuarios.
   * "deleteDataRequest" es la función declara en el componente "Context"
   * encargada de eliminar los usuarios con base en su código.
   */
  const {deleteDataRequest} = useContextReservations();
  /**
   * "open" almacena un valor booleano, encargado de determinar si 
   * se muestra o no un dialago para confirmar la eliminación de un usuario.
   * "setOpen" se encarga de reasignar el valor booleano de la variable "open".
   */
  const [open, setOpen] = useState(false);
  /**
   * "codigo" es el codigo del usuario del cual se quiere eliminar de la base de datos.
   * Mediante "setCodigo" asignamos el codigo del usuario que se quiere eliminar a la 
   * variable "codigo".
   */
  const [codigo,setCodigo] = useState(undefined);
  /**
   * "navigate" utiliza el hook "useNavigate" para redirijir a otra ruta del sitio.
   */
  const navigate = useNavigate();
  /**
   * Función encarga de abrir el dialago de confirmación antes de eliminar un usuario
   */
  const handleClickOpen = () => {
    setOpen(true);
  };
   /**
   * Función encarga de cerrar el dialago de confirmación para eliminar un usuario.
   */
  const handleClose = () => {
    setOpen(false);
  };
  return(
    <>
    {/*Tabla donde se despliega la información referente a los usuarios*/}
      <div className="table">
        <table className="responsive-table z-depth-2 highlight">
            <thead>
              {/*Titulo de cada columna de la tabla*/}
              <tr>
                {headers.map(header => {
                  return(
                    <th key={header}>{header.toUpperCase()}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {/*Renderizado de la tabla segun sea cada elemento contenido en la varible
              "data"*/}
              {data.map(row => {
                return(
                  <tr key={row.codigo}>
                    {Object.values(row).map((value,index) => {
                      return (
                      <td key={index}>{value}</td>
                      )
                    })}
                  <td>
                    {/*Botones para editar y eliminar */}
                    <div className="buttons">
                        {/*
                        *El botón editar redirecciona al componente "Create" en su variante para editar mediante
                        *su metodo "onClick".
                        *Se envia como parametro el codigo del usuario que se desea editar para con este
                        *dato realizar una petición al backend y obtener toda la información
                        *relacionada con este usuario. 
                        */}
                        <button className="btn-edit"
                        onClick={() => navigate(`/Edit/${row.codigo}`)}><span className="material-icons">edit</span>Editar</button>
                        {/*
                        *El botón eliminar mediante su metodo "onClick" manda a llamar el dialogo
                        *de confirmación y asigna el codigo del usuario que se quiere eliminar
                        *mediante el metodo "setCodigo()".
                        *Se envia como parametro el codigo del usuario que se desea editar para con este
                        *dato realizar una petición al backend y obtener toda la información
                        *relacionada con este usuario. 
                        */}                     
                        <button className="btn-delete"
                        onClick={() => {
                          {/*Llamada al dialogo*/}
                        handleClickOpen()
                        {/*Asignación del codigo del usuario que se quiere eliminar
                        *en la variable codigo*
                        */}
                        setCodigo(row.codigo)}}
                        ><span className="material-icons">delete</span>Eliminar</button>
                    </div>
                  </td>
                </tr>
                )
              })}
            </tbody>
            {/*Dialogo de confirmación*/}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {/*Titulo del dialogo*/}
                  {"¡Cuidado!"}
                </DialogTitle>
                <DialogContent>
                  {/*Contenido del dialogo*/}
                  <DialogContentText id="alert-dialog-description">
                    Estás a punto de eliminar información de la base de datos,
                    ¿Quieres continuar con está acción?
                  </DialogContentText>
                </DialogContent>
                {/*Botones del dialogo*/}
                <DialogActions>
                  {/*Cerrar dialogo*/}
                  <Button onClick={handleClose}>Cancelar</Button>
                  {/*Confirmar eliminación*/}
                  <Button onClick={() => {
                    {/*Petición al backend*/}
                    deleteDataRequest(codigo)
                    {/*Cerrar dialogo*/}
                    handleClose()}}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </table>
      </div>
    </>
  )
}
