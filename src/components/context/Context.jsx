import React, { useContext, useState } from "react";
import { createContext } from "react";
import {
  getData,
  deleteData,
  createData,
  getSingleData,
  updateData,
  searchCarrera,
  getAllCarreras,
  getAdmin
} from "../../api/getData.js";
/*adminUserContext es el encargado de permitir la comunicación*/
export const contextReservations = createContext();
export const useContextReservations = () => {
  /**
   * "useContext()" es un hook personalizado que nos permite comunicar
   * todos los componentes relacionados con la administración de usuarios.
   */
  const context = useContext(contextReservations);
  if (!context) {
    throw new Error("Context debe estar dentro de adminUserContextProvider");
  }
  return context;
};
/*ContextReservationsProvider es el componenten que agrupa*/
export const ContextReservationsProvider = ({ children }) => {
  /**
   * La variable data almacena un array de objetos, los cuales son proporcionados
   *mediante una petición al backend, la variable esta inicializada en un arreglo vacio.
   *Con el método "setData",asignamos la informacion cuando el backend propociona
   *el resultado la petición solicitada en la función "loadaDataRequest()". "data" es
   *enviado a la tabla que carga esta información, a traves de "contextReservationsProvider".
   */
  const [data, setData] = useState([]);
  /**
   * La variable data almacena un array de objetos, los cuales son proporcionados
   *mediante una petición al backend, la variable esta inicializada en un arreglo vacio.
   *Con el método "setData",asignamos la informacion cuando el backend propociona
   *el resultado la petición solicitada en la función "loadaDataRequest()". "data" es
   *enviado a la tabla que carga esta información, a traves de "contextReservationsProvider".
   */
  const [headers, setHeaders] = useState([]);
  /**
   * Se realiza la petición al backend
   * a traves de la funcion "getTeachers" en
   * el API (getData.js). La petición se realiza mediante una función asincrona, el
   *resultado se almacena en la variable "response".Si la petición tiene éxito, mediante el método
   *"setInfo" asignamos el contenido de la variable "response.data" a "info".
   *Si la petición es insatisfactoria, mostramos un mensaje de error.
   */
  const loadDataRequest = async (whoApiRequest) => {
    try {
      const response = await getData(whoApiRequest);
      setData(response);
      setHeaders(Object.keys(response[0]));
    } catch (error) {
      alert(error);
    }
  };
  /**
   * Se realiza la petición al backend
   * a traves de la funcion "addTeachers" en
   * el API (getData.js). La petición se realiza mediante una función asincrona, el
   *resultado se almacena en la variable "response". Si la respuesta retornada
   *por el backend es lago distinto a un código de error, se muestra un toast
   *informando que el usuario se eliminó satisfactoriamente. Posteriormente
   *se realiza un filtrado de la varibale data, para que al momento de eliminar
   *un usuario se vea reflejado al momento sin necesidad de refrescar la página.
   *Si en la respuesta proporcionada por el backend hay un error, mostramos
   *el error en un toast color rojo
   * @param {*} codigo
   * El paramentro código es el código enviado por el componente de la tabla y es
   * el cual coincide con el codigo de usuario que se quiere eliminar.
   */
  const deleteDataRequest = async (id, whichApiRequest) => {
    try {
      const response = await deleteData(id, whichApiRequest);
      if (response[1] !== 200) {
        M.toast({ html: response[0], classes: "rounded red" });
      } else {
        M.toast({ html: response[0], classes: "rounded green" });
        setData(data.filter((datas) => datas.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Se agrega un nuevo usuario a la base de datos a traves de la función
   * "addTeacher()" en el API (addTeacher.js). La respuesta retornada por el backend
   * es almacenada en la variable "response". Si la respuesta no es satisfactoria
   * y hay algun error, se muestra un toast en color rojo con mensaje de error.
   * En caso contrario, se muestra un toast informando que la petición fue satisfactoria.
   * @param {*} values
   * El parametro "values" es toda la información ingresada en el componente "Create"
   * y que está relacionada con el nuevo usuario.
   */
  const createDataRequest = async (values, whichApiRequest) => {
    try {
      const response = await createData(values, whichApiRequest);
      console.log(response)
      if (response[1] !== 200) {
        M.toast({ html: response[0], classes: "rounded red" });
      } else {
        M.toast({
          html: response[0],
          classes: "rounded green",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Se realiza una peticion al backend a traves de la funcion "getTeacher"
   * en la API (getData.js). A esta función se le pasa el parametro "codigo"
   * el cual es el codigo del usuario del cual se va a obtener la información
   * del usuario que se quiere editar. La propuesta proporcionada por el backend
   * es almacenada en la variable "response" y posteriormente se retorna con la
   * información del usuario solicitado.
   * @param {*} codigo
   * El parametro "codigo" es el codigo del usuario proporcionado por el componente
   * invocador, en este caso el componente "Create".
   * @returns
   * El valor de retorno es la informacion almacenada
   * en la variable response que corresponda con el codigo de usuario proporcionado.
   */
  const loadSingleDataRequest = async (item, whichApiRequest) => {
    try {
      const response = await getSingleData(item, whichApiRequest);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Se realiza una peticion al backend con la función "updateTeacher" a traves de
   * la API (getData.js) y se le pasan dos parametros.
   * La respuesta devuelta por el backend es almacenada en la variable "response".
   * Si la respuesta es satisfactoria se muestra un toast informando que la
   * modificación se ha realizado con éxito. Si la respuesta contiene algun error
   * se muestra un toast en color rojo informando del error.
   * @param {*} codigo
   * El parametro "codigo" es el correspondiente al codigo del usuario del cual
   * se quiere obtener la información para ser editada
   * @param {*} newData
   * El parametro "newData" es la nueva información del usuario que fue editada
   * en el componente "Create".
   */
  const updateSingleDataRequest = async (codigo, newData, whichApiRequest) => {
    try {
      const response = await updateData(codigo, newData, whichApiRequest);
      if (response[1] !== 200) {
        M.toast({ html: response[0], classes: "rounded red" });
      } else {
        M.toast({ html: response[0], classes: "rounded green" });
        setData(data.filter((datas) => datas.codigo !== codigo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGrupos = async (carrera) => {
    try {
      const response = await searchCarrera(carrera);
      console.log(response);
      if (response[1] !== 200) {
        M.toast({ html: response[0], classes: "rounded red" });
      } else {
        M.toast({ html: response[0], classes: "rounded green" });
        return response[2];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCarreras = async () => {
    try {
      const response = await getAllCarreras();
      return response[2];
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminRequest = async (admin_code) => {
    try {
      const response = await getAdmin(admin_code);
      if (response[1] !== 200) {
        M.toast({ html: response[0], classes: "rounded red" });
      } else {
        M.toast({ html: response[0], classes: "rounded green" });
        return response[2];
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <contextReservations.Provider
      value={{
        headers,
        data,
        loadDataRequest,
        deleteDataRequest,
        createDataRequest,
        loadSingleDataRequest,
        updateSingleDataRequest,
        getGrupos,
        getCarreras,
        getAdminRequest,
      }}
    >
      {children}
    </contextReservations.Provider>
  );
};
