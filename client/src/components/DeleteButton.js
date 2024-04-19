import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function EditButton({handleClick}) {
  return (
    <div className="bad-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faTrash}/>
    </div>
  )
}
