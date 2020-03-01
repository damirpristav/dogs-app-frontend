import isEmpty from 'is-empty';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default (fields, submit = false) => {
  let errors = {};  
  for(let field in fields) {
    if(submit) {
      fields[field].touched = true;
    }

    if(fields[field].required && isEmpty(fields[field].value) && fields[field].touched) {
      errors[field] = `${field} is required`;
    }

    if(fields[field].email && !validateEmail(fields[field].value) && fields[field].touched) {
      errors[field] = `invalid email address`;
    }

    if(fields[field].matchPass && fields[field].value !== fields[fields[field].matchPass].value && fields[field].touched) {
      errors[field] = 'passwords must match';
    }

    if(fields[field].minLength && fields[field].value !== '' && fields[field].value.length < fields[field].minLength && fields[field].touched) {
      errors[field] = `${field} must have at least ${fields[field].minLength} characters`;
    }

    if(fields[field].fileTypes && !fields[field].fileTypes.includes(fields[field].value.type)) {
      errors[field] = 'invalid file type';
    }

    if(fields[field].fileSize && (fields[field].fileSize * 1024) < fields[field].value.size) {
      errors[field] = `file is too large, it cannot be larger than ${fields[field].fileSize}KB`;
    }
  }

  return errors;
}