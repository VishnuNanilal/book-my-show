import React from 'react'

function LabelAndInput({children, label, name, placeholder, type, state, required, defaultValue, min=0, max=100, className=""}) {

  const { formData, setFormData } = state
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div className={`label-and-input ${className}`}>
      <span>{label}</span>
      {
        type &&
        <input name={name} placeholder={placeholder} type={type} onChange={handleChange} value={formData[name]} required={required} defaultValue={defaultValue} min={min} max={max}/>
      }
      {
        children
      }
    </div>
  )
}

export default LabelAndInput