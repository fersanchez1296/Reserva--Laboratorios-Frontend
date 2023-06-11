import * as yup from "yup";
const regexNombre =  /^[\p{L}\s]+$/u;
const regexClave =  /^[\p{L}0-9-]+$/u;
export const adminSubjectsSchema = yup.object().shape({
    crn : yup
    .number()
    .min(1, "Debes ingresar al menos un número")
    .max(100000, "No puedes ingresar un número mayor de 10000")
    .integer("Debes ingresar solamente números sin punto decimal")
    .positive("Debes ingresar solo números positivos")
    .required("Este campo es requerido"),
    clave : yup
    .string()
    .matches(regexClave, {message : "Verifica que la clave no contenga espacios ni caracteres especiales"})
    .required("Este campo es requerido"),
    nombre : yup
    .string()
    .matches(regexNombre, {message : "Verifica que el nombre no contenga caractéres especiales ni números"})
    .required("Este campo es requerido"),
})