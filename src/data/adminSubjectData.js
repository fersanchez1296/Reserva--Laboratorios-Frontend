export const inputs = (values) => [
  {
    id: "crn",
    type: "number",
    name: "crn",
    value: values.crn,
    data_label_name: "CRN",
    data_icon: "123",
    data_tag: "crn",
    size : "input-field col s12 m6 l12"
  },
  {
    id: "clave",
    type: "text",
    name: "clave",
    value: values.clave,
    data_label_name: "Clave",
    data_icon: "handyman",
    data_tag: "clave",
    size : "input-field col s12 m6 l12"
  },
  {
    id: "nombre",
    type: "text",
    name: "nombre",
    value: values.nombre,
    data_label_name: "Nombre",
    data_icon: "badge",
    data_tag: "nombre",
    size : "input-field col s12 m6 l12"
  },
];
