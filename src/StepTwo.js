import { useForm } from "react-hook-form";
import React from "react";
import jsonData from "./data.json";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Sidebox from "./Sidebox";
import monkey from "./monkey.png";
import jungle from "./jungleBackground.png";
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
  const { t, i18n } = useTranslation();
  const formSchema = Yup.object()
    .shape({
      username: Yup.string().required(t("errors.username.required")),
      email: Yup.string().required(t("errors.email.required")),
      password: Yup.string().required(t("errors.password.required")),
      password_confirm: Yup.string().required(
        t("errors.password_confirm.required")
      ),
    })
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
    console.log(values);
    setState(state, values);

    return false;
  };
  return (
    <div className="form-wrapper">
      <img className="monkey-img" src={monkey} />
      <form id="register" onSubmit={handleSubmit(onSubmit)}>
        {data.map((element) => (
          <div id="input-div" key={element.code}>
            <label>{t(`labels.${element.code}`)}</label>
            <input
              defaultValue={state[element.code]}
              {...register(element.code)}
              name={element.code}
            />
            <span>
              <ErrorMessage errors={errors} name={element.code} />
            </span>
          </div>
        ))}
      </form>
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
          onClick={(e) => {
            onBack(e.target.value);
          }}
        >
          {t("buttons.backButton")}
        </button>
        <button form="register" type="submit">
          {t("buttons.submitButton")}
        </button>
      </div>
    </div>
  );
}

export default StepTwo;
