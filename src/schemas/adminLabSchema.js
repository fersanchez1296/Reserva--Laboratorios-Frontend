import * as yup from "yup";

const namesRegex = /^[\p{L}\s]+$/u;

export const adminLabSchema = yup.object().shape({
    edificio : yup
    .string()
    .min(2,"El nombre debe contener al menos dos caractéres")
    .matches(namesRegex, {message : "Verifica el nombre del edificio"})
    .required("Este campo es requerido"),
    capacidad : yup 
    .number()
    .min(1, "Debes ingresar al menos un número")
    .max(3,"No puedes ingresar más de 4 números")
    .integer("Debes ingresar solo números sin punto decimal")
    .positive("Debes ingresar solo números positivos")
    .required("Este campo es necesario"),
    nombre : yup
    .string()
    .min(5, "El nombre debe contener al menos 5 caractéres")
    .matches(namesRegex, {message : "Verifica que el nombre no contenga números ni caractéres especiales"})
    .required("Este campo es requerido"),
    admin : yup
    .number()
    .min(1, "El código debe contener al menos un número")
    .max(999999999)
    .required("Este campo es requerido"),
    admin_info : yup
    .string()
    .required("Este campo es requerido")
});