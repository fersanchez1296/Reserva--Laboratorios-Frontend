import React from "react";
import { useField } from "formik";
import { CustomLabel } from "./CustomLabel";

export const CustomInput = ({
  data_tag,
  data_label_name,
  data_icon,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <i
        {...field}
        className={
          meta.touched && meta.error
            ? "material-icons prefix red-text"
            : "material-icons prefix green-text"
        }
      >
        {data_icon}
      </i>
      <CustomLabel htmlFor={data_tag} name={data_label_name} />
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : "input-correct"}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
