import React from 'react'

const FormGroup = ({ type, label, value, onChange, placeholder }) => {
  return (
    <div>
        <label htmlFor={label}>{label}</label>
        <input 
        id={label}
        type={type} 
        name={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required/>
    </div>
  )
}

export default FormGroup
