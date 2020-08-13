import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Alert = ({ title, type = 'success', text }) => {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: <p>{title}</p>,
    icon: type,
    text
  })
}

export default Alert;