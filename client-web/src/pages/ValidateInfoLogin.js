export default function ValidateInfoLogin(inputs) {
    let errors = {};

    //USERNAME
    if (!inputs.USERNAME) {
      errors.USERNAME = "error";
    } else if (!/^[A-Za-z]+/.test(inputs.USERNAME.trim())) {
      errors.USERNAME = "error";
    }else {
      errors.USERNAME = "success";
    }
  
    //PASSWORD
    if (!inputs.PASSWORD) {
      errors.PASSWORD = "error";
    } else if (inputs.PASSWORD.length < 6) {
      errors.PASSWORD = "error";
    } else {
      errors.PASSWORD = "success";
    }
    return errors;
  }
  