export const inputs = (values) => [
  {
    id: "edificio",
    type: "text",
    name: "edificio",
    value: values.edificio,
    data_label_name: "Edificio",
    data_icon: "123",
    data_tag: "edificio",
    size : "input-field col s12 m6"
  },
  {
    id: "capacidad",
    type: "number",
    name: "capacidad",
    value: values.capacidad,
    data_label_name: "Capacidad",
    data_icon: "handyman",
    data_tag: "capacidad",
    size : "input-field col s12 m6"
  },
  {
    id: "nombre",
    type: "text",
    name: "nombre",
    value: values.nombre,
    data_label_name: "Nombre",
    data_icon: "123",
    data_tag: "nombre",
    size : "input-field col s12 m6"
  },
];
