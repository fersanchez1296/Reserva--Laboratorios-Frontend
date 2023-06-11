import React from 'react'
import {useField} from 'formik';

export const CustomRadio = ({data_icon,data_label_name,...props}) => {
    const [field, meta] = useField(props)
    
  return (
    <div>
        <label className='radios'>
            <span className='material-icons'>
                {data_icon}
            </span>
            <input {...field} {...props}/>
            <span>
                <p>{data_label_name}</p>
            </span>
        </label>
    </div>
  )
}
