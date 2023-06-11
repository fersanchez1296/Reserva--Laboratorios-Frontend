import * as yup from "yup";

const regexNombre =  /^[\p{L}\s]+$/u;
export const adminToolsSchema = yup.object().shape({
    nombre : yup
    .string()
    .min(10, "El nombre debe tener al menos 10 caractéres")
    .matches(regexNombre, {message :"Por favor revisa que tu nombre no contenga números o caractéres especiales"})
    .required("Este campo es requerido"),
    cantidad :  yup
    .number()
    .min(0, "Debes ingresar al menos un número")
    .max(999, "No puedes ingresar más de 999 elementos")
    .integer("Debes ingresar solamente números sin punto decimal")
    .positive("Debes ingresar solo números positivos")
    .required("Este campo es requerido"),
    descripcion : yup
    .string()
    .required("Este campo es requerido")
})