import { useForm } from "react-hook-form";
import React from "react";
import jsonData from "../data/data.json";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import monkey from "../images/monkey.png";
import jungle from "../images/jungleBackground.png";
import jungleFilter from "../images/jungleBackgroundFilter.png";
import Sidebox from "./Sidebox";
import {generateYupSchema,generateEmailValidator,generatePasswordValidator,generateStringValidator,flattenObject,workedData,checkValidatorType} from './ValidatorTest'
import loader from "../images/chiploader.gif"
import { useState, useEffect } from "react";






//Second step of the form, takes data from the stepTwo array
// to dynamically generate input elements and labels

function StepTwo({
  setIsSubmitting,
  data,
  state,
  setState,
  step,
  prevStep,
  formattedData,
}) {
  const [isLoading,setIsLoading] = useState(false)
  const { t, i18n } = useTranslation();
 
  let arrayData = [...data]
 
  let workedOnData = workedData(arrayData)

  let generatedSchema ={...generateYupSchema(workedOnData)}

  let formSchema = Yup.object()
    .shape(generatedSchema)
    .required();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });
  //grab names and default values from json data
  let initialValues = [];
  jsonData.map((element) =>
    initialValues.push({
      code: element["code"],
      valueStr: "",
      dataType: "string",
    })
  );
  console.log(initialValues);

  const schema = Yup.array().of(
    Yup.object().shape({
      code: Yup.string().required(),
      valueStr: Yup.string().required(),
      dataType: Yup.string().required(),
    })
  );

  const submitRegistration = (fields) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        schema.isValid(fields).then((check) => {
          if (check) {
            resolve(fields);
          } else {
            reject({ message: "Error" });
          }
        });
      }, 1000);
    });
  };
  const onSubmit = (values) => {
    console.log(values);
    const newState = { ...state, ...values };
    setState(newState);
    setIsSubmitting((isSubmitting) => !isSubmitting);
  };
  const onBack = (values) => {
    setIsLoading(true)
    setTimeout(() => {prevStep(step);setIsLoading(false);setState(state, values)}, 1000)
    ;

    return false;
  };
  return (
    <div className="form-wrapper">
      <img className="monkey-img" src={monkey} />
    {isLoading?<div className="loader"><img  src={loader}/>LOADING...</div>:
      <form id="register" onSubmit={handleSubmit(onSubmit)}>
        {data.map((element) => (
          <div id="input-div" key={element.code}>
            <label>{t(`labels.${element.code}`)}</label>
            <input  placeholder={t(`labels.${element.code}`)} {...element.code.startsWith("password") ? {type:"password"} : {}}
              defaultValue={state[element.code]}
              {...register(element.code)}
              name={element.code}
            />
           
              <ErrorMessage as="span" errors={errors} name={element.code} />
            
          </div>
        ))}
      </form>}
      <div id="sidebar-container">
        <Sidebox />
        <div id="terms">
          <input form="register" type="checkbox" required="true" />
          {t("terms.text")}
          <a
            href="https://www.termsfeed.com/live/9ab59656-a7af-4080-8701-c88149727a24"
            target="_blank"
          >
            {t("terms.link")}
          </a>
        </div>
        <button
        id="back-button
        "
          onClick={(e) => {
            onBack(e.target.value)
            
          }}
        >
          {t("buttons.backButton")}
        </button>
        <button id="register-button
        " 
        form="register" type="submit">
        
          {t("buttons.submitButton")}
        </button>
      </div>
    </div>
  );
}

export default StepTwo;
