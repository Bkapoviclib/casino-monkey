import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Sidebox from "./Sidebox";
import monkey from "./monkey.png";
import jungle from "./jungleBackground.png";
import jungleFilter from "./jungleBackground.png";
import { Animated } from "react-animated-css";

//First step of the form, takes data from the stepOne array
// to dynamically generate input elements and labels
function StepOne({ data, state, setState, step, nextStep }) {
  const { t, i18n } = useTranslation();
  let schema = Yup.object()
    .shape({
      fname: Yup.string()
        .required(t("errors.fname.required"))
        .matches(/^[aA-zZ\s]+$/, t("errors.fname.letters_only")),
      lname: Yup.string().required(t("errors.lname.required")),
      address: Yup.string().required(t("errors.address.required")),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (values) => {
    console.log("onSubmit values: ", values);
    setState(state, values);
    console.log(state);
  };

  return (
    <div className="form-wrapper">
      <img className="monkey-img" src={monkey} />
      <form>
        {data.map((element) => (
          <div id="input-div" key={element.code}>
            <label>{t(`labels.${element.code}`)}</label>
            <input
              placeholder={t(`labels.${element.code}`)}
              {...register(element.code, { required: "req" })}
              defaultValue={state[element.code]}
            />
            <span>
              <ErrorMessage errors={errors} name={element.code} />
            </span>
          </div>
        ))}
      </form>
      <div id="sidebar-container" backgroundImage={jungle}>
        <Sidebox />

        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(onSubmit)(e.target.value);
          }}
        >
          {t("buttons.forwardButton")}
        </button>
      </div>
    </div>
  );
}

export default StepOne;
