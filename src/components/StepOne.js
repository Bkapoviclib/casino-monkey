import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Sidebox from "./Sidebox";
import monkey from "../images/monkey.png";
import jungle from "../images/jungleBackground.png";
import loader from "../images/chiploader.gif";
import { generateYupSchema, workedData } from "./ValidatorTest";

//First step of the form, takes data from the stepOne array
// to dynamically generate input elements and labels
function StepOne({ data, state, setState, step, nextStep }) {
  //initiate translation variables
  const { t } = useTranslation();

  let arrayData = [...data];

  let workedOnData = workedData(arrayData);

  let generatedSchema = { ...generateYupSchema(workedOnData) };

  let schema = Yup.object().shape(generatedSchema).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });
  const onSubmit = (values) => {
    console.log("onSubmit values: ", values);
    setState(state, values);
    console.log(state);
    nextStep(step);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="form-wrapper">
      <img
        className="monkey-img"
        alt="Monkey hanging to the side of the form window"
        src={monkey}
      />
      {isLoading ? (
        <div className="loader">
          <img alt="Loading chip" src={loader} />
          LOADING...
        </div>
      ) : (
        <form>
          {data.map((element) => (
            <div id="input-div" key={element.code}>
              <label>{t(`labels.${element.code}`)}</label>
              <input
                placeholder={t(`labels.${element.code}`)}
                {...register(element.code, { required: "req" })}
                defaultValue={state[element.code]}
              />
              <ErrorMessage as="span" errors={errors} name={element.code} />
            </div>
          ))}
        </form>
      )}
      <div id="sidebar-container" backgroundImage={jungle}>
        <Sidebox />
        <button
          id="next-button
          "
          type="submit"
          onClick={(e) => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              handleSubmit(onSubmit)(e.target.value);
            }, 1000);
          }}
        >
          {t("buttons.forwardButton")}
        </button>
      </div>
    </div>
  );
}

export default StepOne;
