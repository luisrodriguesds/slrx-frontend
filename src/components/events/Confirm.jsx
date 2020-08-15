import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/**
 * type: success | error | warning | info
 */
const Confirm = async ({ title, type = 'success', text }) => {
  const MySwal = withReactContent(Swal)
  const result = await MySwal.fire({
    title: <p>{title}</p>,
    text,
    icon: type,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim!',
    cancelButtonText: 'Não!'
  })
  
  if (result.value) {
    return true
  }
  return false
}

export default Confirm;