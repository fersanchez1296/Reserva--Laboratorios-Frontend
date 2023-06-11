import * as yup from "yup";

const namesRegex = /^[\p{L}\s]+$/u;

export const adminPracticeSchema = yup.object().shape({
    nombre : yup
    .string()
    .min(10,"Debes ingresar al menos 10 caractéres como nombre")
    .matches(namesRegex, {message : "Verifica que el nombre no contenga carcatéres especiales ni números"})
    .required("Este campo es requerido"),
    descripcion : yup
    .string()
    .required("Este campo es requerido")
})