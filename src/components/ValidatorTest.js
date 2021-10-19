import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import data from "../data/data.json";
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
const stepOne = [];
const stepTwo = [];
const stepSeparator = () => {
  for (let index = 0; index < data.length; index++) {
    if (index < 3) {
      stepOne.push(data[index]);
    } else {
      stepTwo.push(data[index]);
    }
  }
  console.log("step one: ", stepOne, "step two: ", stepTwo);
};
stepSeparator();
let stepOneData = stepOne;
let stepTwoData = stepTwo;

const mergeValidators = (element) => {};


  let arrayData = [...stepOneData];
export const workedData =(arrayData)=>{
  let res = {}
  res = arrayData.map((element) => {
  console.log("initial element being worked: ", element)
    let value = element?.validators?.map((validator) => ({
      [validator.key]: Object.values(validator?.parameters)[0],
    }));
    console.log("preSPREAD value: ",value)
    value = { ...value };
    console.log("preFLAT value: " , value)
    value = flattenObject(value);

    console.log("code: ",element.code,"value: ",value)
    return {
      [element.code]: value,
    };
  })
return res;
};

   export const generatePasswordValidator = (element) => {
    let name = Object.keys(element)[0];
    let validator = {
      passwordStrength: element[name]?.passwordStrength || default_validators.password.passwordStrength,
      passwordMustMatch: element[name]?.passwordMustMatch|| default_validators.password.passwordMustMatch
    };
    let result = {
      [Object.keys(
        element
      )[0]]: Yup.string().required(i18next.t(`errors.${name}.required`)).matches(validator.passwordStrength,i18next.t(`errors.password.passwordStrength`)).oneOf([Yup.ref("password"),null],i18next.t(`errors.password.passwordMatch`))
    };
    console.log(result);
    return result;
   };
  export const generateEmailValidator = (element) => {
    let name = Object.keys(element)[0];
    let validator = {
      email: element[name]?.emailValidator || default_validators.emailValidator.email,
    };
    let result = {
      [Object.keys(
        element
      )[0]]: Yup.string().required(i18next.t(`errors.${name}.required`)).matches(validator.email,i18next.t("errors.email.email"))
    };
    console.log(result);
    return result;
  };

  export const generateStringValidator = (element) => {
    console.log("INSIDE STRING VALIDATOR");
    let name = Object.keys(element)[0];
    let validator = {
      min: element[name]?.minLength || default_validators.string.length.min,
      max: element[name]?.maxLength || default_validators.string.length.max,
      lettersOnly: element[name]?.lettersOnlyValidator || default_validators.string.lettersOnly
    };
    let result = {
      [Object.keys(
        element
      )[0]]: Yup.string().required(i18next.t(`errors.${name}.required`)).min(`${validator.min}`,i18next.t(`errors.${name}.minLength`)).max(`${validator.max}`, i18next.t(`errors.${name}.maxLength`)).matches(validator.lettersOnly,i18next.t("errors.fname.letters_only"))
    };
    console.log(result);
    return result;
  };

  export const checkValidatorType = (element) => {
    if (Object.keys(element).filter((key) => key.startsWith("email")).length) {
      console.log("WENT INTO EMAIL");
      return generateEmailValidator(element);
    } else if (
      Object.keys(element).filter((key) => key.startsWith("password")).length
    ) {
      return generatePasswordValidator(element);
    } else {
      console.log("ELSE TRIGGERED");
      return generateStringValidator(element);
    }
  };

  let a = [
    { fname: { minLength: { targetLength: 2 } } },
    { fname: { maxLength: { targetLength: 25 } } },
  ];

  export const generateYupSchema = (data) => {
    let res = {};
    let arr = data.map((element) => {
      console.log("ELEMENT BEFORE PASSING TO CHECK: ", JSON.stringify(element));
      return checkValidatorType(element);
    });
    arr.forEach((element) => (res = { ...res, ...element }));
    return res;
  };



 


