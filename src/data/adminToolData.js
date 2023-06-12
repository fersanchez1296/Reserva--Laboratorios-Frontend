export const inputs = (values) => [
  {
    id: "nombre",
    type: "text",
    name: "nombre",
    value: values.nombre,
    data_label_name: "Nombre",
    data_icon: "badge",
    data_tag: "nombre",
    size : "input-field col s12 l6",
  },

  {
    id: "cantidad",
    type: "number",
    name: "cantidad",
    value: values.cantidad,
    data_label_name: "Cantidad",
    data_icon: "123",
    data_tag: "cantidad",
    size : "input-field col s12 l6",
  },
];
