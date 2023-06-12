export const elementos = (values) => [
  {
    id: "codigo",
    name: "codigo",
    value: values.codigo,
    data_label_name: "Código",
    data_icon: "vpn_key",
    data_tag: "codigo",
    size: "input-field col s12",
  },
  {
    id: "nombre",
    name: "nombre",
    value: values.nombre,
    data_label_name: "Nombre",
    data_icon: "badge",
    data_tag: "nombre",
    size: "input-field col s12",
  },
  {
    id: "apellido_1",
    name: "apellido_1",
    value: values.apellido_1,
    data_label_name: "Primer apellido",
    data_icon: "badge",
    data_tag: "apellido_1",
    size: "input-field col s6",
  },
  {
    id: "apellido_2",
    name: "apellido_2",
    value: values.apellido_2,
    data_label_name: "Segundo apellido",
    data_icon: "badge",
    data_tag: "apellido_2",
    size: "input-field col s6",
  },
  {
    id: "telefono",
    name: "telefono",
    value: values.telefono,
    data_label_name: "Teléfono",
    data_icon: "phone",
    data_tag: "telefono",
    size: "input-field col s12 m6 l6",
  },
  {
    id: "email",
    name: "email",
    value: values.email,
    data_label_name: "Email",
    data_icon: "alternate_email",
    data_tag: "email",
    size: "input-field col s12 m6 l6",
  },
];

export const radios = () => [
  {
    id : "Admin",
    type: "radio",
    name: "rol_id",
    value: "1",
    data_icon: "admin_panel_settings",
    data_label_name: "Admin",
  },
  {
    id : "Profesor",
    type: "radio",
    name: "rol_id",
    value: "2",
    data_icon: "school",
    data_label_name: "Profesor",
  },
  {
    id : "Alumno",
    type: "radio",
    name: "rol_id",
    value: "3",
    data_icon: "class",
    data_label_name: "Estudiante",
  },
];
