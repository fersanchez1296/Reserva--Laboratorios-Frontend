import axios from 'axios';
/**
 * "response" => Almacena la respuesta devuelta por el backend por medio de una 
 * petición asincrona.
 * 
 * @returns 
 * El valor de retorno es la respuesta del backend almacenada en la variable "response" en 
 * en el objeto data.
 */
export const getData = async(whoApiRequest) =>{
    const response = await axios.get(`https://reserva-laboratorios-production.up.railway.app/${whoApiRequest}`);
    console.log(response);
    return(response.data);
}
/**
 * "response" => Almacena la respuesta devuelta por el backend por medio de una 
 * petición asincrona.
 * @param {*} codigo 
 * El parametro código es el codigo de usuario del cual se quiere obtener la
 * información, este parametro es enviado desde la barra de direcciones a través del 
 * componente "Create" en su variación para editar.EL codigo se envia al backend 
 * y este mismo retorna la información que concuerde con el codigo de usuario.
 * @returns 
 * El valor de retorno es la respuesta del backend almacenada en la variable "response" en 
 * en el objeto data.
 */
 export const getSingleData = async(codigo) =>{
    const response = await axios.get(`https://reserva-laboratorios-production.up.railway.app/adminTeacher/${codigo}`);
    return(response.data);
}
/**
 * "response" => Almacena la respuesta devuelta por el backend por medio de una 
 * petición asincrona. Si la respuesta es satisfactoria devuelve el 'status' 200,
 * en caso de haber algún error, se manda el mensaje de error y el código de error.
 * @param {*} codigo
 * El parametro código es el codigo de usuario que se quiere
 * eliminar, este parametro es enviado desde la tabla en la cual se despliega
 * la información y es enviado al backend para eliminar la información que 
 * concuerde con el codigo de usuario.
 * @returns 
 * El valor de retorno es la respuesta del backend almacenada en la variable "response" en 
 * en el objeto data.
 */
export const deleteData = async(codigo) => {
    const response = await axios.delete(`https://reserva-laboratorios-production.up.railway.app/adminTeacher/${codigo}`);
    if(response.data !== ""){
        return ([response.data[0],response.data[1]]);
    }else{
        return (["Usuario eliminado con exito",200]);
    }
}
/**
 * "response" => Almacena la respuesta devuelta por el backend por medio de una 
 * petición asincrona. Si la respuesta es satisfactoria devuelve el 'status' 200,
 * en caso de haber algún error, se manda el mensaje de error y el código de error.
 * @param {*} data 
 * El parametro "data" es la información del usuario que se quiere
 * agregar a la base de datos, este parametro es enviado desde el componente "Create" en el cual se 
 * agrega la información.
 * @returns 
 * El valor de retorno es la respuesta del backend almacenada en la variable "response" en 
 * en el objeto data.
 */
export const createData = async(data) =>{
    const response = await axios.post(`https://reserva-laboratorios-production.up.railway.app/adminTeacher`,data);
    if(response.data !== ""){
        return [response.data.message,response.data.errno]
    }else{
        return (["Usuario agregado con exito",200]);
    }
}
/**
 * "response" => Almacena la respuesta devuelta por el backend por medio de una 
 * petición asincrona. Si la respuesta es satisfactoria devuelve el 'status' 200,
 * en caso de haber algún error, se manda el mensaje de error y el código de error.
 * @param {*} codigo 
 * El parametro "código" es el codigo de usuario del cual se quiere
 * editar la información, este parametro es enviado desde los parametros
 * del componente en la barra de direcciones del componente "create".
 * @param {*} newData 
 * El parametro "data" es la nueva información del usuario del cual se quiere
 * editar la información, este parametro es enviado desde el componente "Create"
 * a través de los campos del mismo formulario.
 * @returns 
 */
export const updateData = async(codigo,newData) =>{
    const response = await axios.put(`https://reserva-laboratorios-production.up.railway.app/adminTeacher/${codigo}`,newData);
    console.log(response);
    if(response.data !== ""){
        return ([response.data[0],response.data[1]]);
    }else{
        return (["Usuario modificado con exito",200]);
    }
}
