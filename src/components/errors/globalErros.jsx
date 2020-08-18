import React from 'react';
import { ValidationError } from 'yup';

import Alert from '../events/Alert';

const Errors = ({ error, formRef }) => {
  if (error instanceof ValidationError) {
    const validationErrors = {};
    error.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    })
    formRef && formRef.current.setErrors(validationErrors)
    Alert({
      title: <p>Ops ...</p>,
      type: 'error',
      text: 'Verifique se todos os campos obrigatórios foram preenchidos' 
    })
    window.scroll(0,0)
  }else if(error.response !== undefined){
    Alert({
      title: <p>Ops ...</p>,
      type: 'error',
      text: error.response.data.message  ? error.response.data.message  : 'Verifique se todos os campos estão preenchidos' 
    })
  }else{
    Alert({
      title: <p>Ops ...</p>,
      type: 'error',
      text: 'Aconteceu um erro em nossos servidores, por favor tente novamente mais tarde ou entre em contato com o suporte.' 
    })
  }  
}

export default Errors;