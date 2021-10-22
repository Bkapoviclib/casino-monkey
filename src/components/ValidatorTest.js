import defaultValidators from "../data/default_validators.json";
import * as Yup from "yup";
import i18next from "i18next";

export const flattenObject = (obj) => {
  const flattened = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
};
const default_validators = defaultValidators;

export const workedData = (arrayData) => {
  let res = {};
  res = arrayData.map((element) => {
    let value = element?.validators?.map((validator) => ({
      [validator.key]: Object.values(validator?.parameters)[0],
    }));
    value = { ...value };
    value = flattenObject(value);
    return {
      [element.code]: value,
    };
  });
  return res;
};

export const generatePasswordValidator = (element) => {
  let name = Object.keys(element)[0];
  let validator = {
    passwordStrength:
      element[name]?.passwordStrength ||
      default_validators.password.passwordStrength,
    passwordMustMatch:
      element[name]?.passwordMustMatch ||
      default_validators.password.passwordMustMatch,
  };
  let result = {
    [Object.keys(element)[0]]: Yup.string()
      .required(i18next.t(`errors.${name}.required`))
      .matches(
        validator.passwordStrength,
        i18next.t(`errors.password.passwordStrength`)
      )
      .oneOf(
        [Yup.ref("password"), null],
        i18next.t(`errors.password.passwordMatch`)
      ),
  };
  return result;
};
export const generateEmailValidator = (element) => {
  let name = Object.keys(element)[0];
  let validator = {
    email:
      element[name]?.emailValidator || default_validators.emailValidator.email,
  };
  let result = {
    [Object.keys(element)[0]]: Yup.string()
      .required(i18next.t(`errors.${name}.required`))
      .matches(validator.email, i18next.t("errors.email.email")),
  };

  return result;
};

export const generateStringValidator = (element) => {
  let name = Object.keys(element)[0];
  let validator = {
    min: element[name]?.minLength || default_validators.string.length.min,
    max: element[name]?.maxLength || default_validators.string.length.max,
    lettersOnly:
      element[name]?.lettersOnlyValidator ||
      default_validators.string.lettersOnly,
  };
  let result = {
    [Object.keys(element)[0]]: Yup.string()
      .required(i18next.t(`errors.${name}.required`))
      .min(`${validator.min}`, i18next.t(`errors.${name}.minLength`))
      .max(`${validator.max}`, i18next.t(`errors.${name}.maxLength`))
      .matches(validator.lettersOnly, i18next.t("errors.fname.letters_only")),
  };
  return result;
};

export const checkValidatorType = (element) => {
  if (Object.keys(element).filter((key) => key.startsWith("email")).length) {
    return generateEmailValidator(element);
  } else if (
    Object.keys(element).filter((key) => key.startsWith("password")).length
  ) {
    return generatePasswordValidator(element);
  } else {
    return generateStringValidator(element);
  }
};

export const generateYupSchema = (data) => {
  let res = {};
  let arr = data.map((element) => {
    return checkValidatorType(element);
  });
  arr.forEach((element) => (res = { ...res, ...element }));
  return res;
};
