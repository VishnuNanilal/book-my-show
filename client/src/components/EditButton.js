import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

export default function EditButton({handleClick}) {
  return (
    <div className="good-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faPencil}/>
    </div>
  )
}
