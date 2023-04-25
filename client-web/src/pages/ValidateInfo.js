export default function ValidateInfo(inputs) {
  let errors = {};

  // FIRST NAME
  if (!inputs.FIRST_NAME.trim()) {
    errors.FIRST_NAME = "error";
  } else {
    errors.FIRST_NAME = "success";
  }

  // LASTNAME
  if (!inputs.LAST_NAME.trim()) {
    errors.LAST_NAME = "error";
  } else {
    errors.LAST_NAME = "success";
  }

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

  //CONFIRM PASSWORD
  if (!inputs.PASSWORD2) {
    errors.PASSWORD2 = "error";
  } else if (inputs.PASSWORD2 !== inputs.PASSWORD) {
    errors.PASSWORD2 = "error";
  } else {
    errors.PASSWORD2 = "success";
  }

  return errors;
}
