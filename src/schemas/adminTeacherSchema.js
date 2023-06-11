import * as yup from "yup";

const regexNombre =  /^[\p{L}\s]+$/u;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const adminTeacherSchema = yup.object().shape({
  codigo: yup
    .number()
    .min(1, "El código debe tener al menos 1 dígito")
    .positive("Debes ingresar solo números positivos")
    .integer("Debes ingresar solo números sin punto decimal")
    .required("Este campo es necesario"),
  nombre: yup
    .string()
    .min(2, "El nombre debe tener al mneos dos caractéres")
    .matches(regexNombre, {
      message:
        "Por favor revisa que tu nombre no contenga números o caractéres especiales",
    })
    .required("Este campo es necesario"),
  apellido_1: yup
    .string()
    .min(2, "El apellido debe tener al mneos dos caractéres")
    .matches(regexNombre, {
      message:
        "Por favor revisa que tu apellido no contenga números o caractéres especiales",
    })
    .required("Este campo es necesario"),
  apellido_2: yup
    .string()
    .min(2, "El apellido debe tener al mneos dos caractéres")
    .matches(regexNombre, {
      message:
        "Por favor revisa que tu apellido no contenga números o caractéres especiales",
    })
    .required("Este campo es necesario"),
  telefono: yup
    .number()
    .min(10, "El número telefónico debe contener 10 dígitos")
    .max(10, "El número telefónico debe contener 10 dígitos")
    .positive("Debes ingresar solo números positivos")
    .integer("Debes ingresar solo números sin punto decimal")
    .required("Este campo es necesario"),
  email: yup
    .string()
    .matches(email, { message: "Por favor ingresa un email válido" })
    .required("Este campo es requerido"),
});
