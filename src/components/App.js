import React from "react";
import jsonData from "../data/data.json";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useTranslation } from "react-i18next";
import title from "../images/titletransparent.png";
import Success from "./Success";
function App() {
  const { t, i18n } = useTranslation();
  //initialize react-hook-form variables

  //set initial state for step
  const [step, setStep] = useState(1);
  //form state
  const [formState, setFormState] = useState({});
  const formStateHandler = (oldState, newState) => {
    let mergedState = { ...oldState, ...newState };
    setFormState(() => mergedState);
  };
  //
  const formatDataForSending = (data) => {
    let formattedData = initialValues.map((field) => {
      field.valueStr = data[field["code"]];
      return field;
    });
    return (formattedData = [...formattedData]);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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
  useEffect(() => {
    let formattedData = formatDataForSending(formState);
    if (isSubmitting === true) {
      submitRegistration(formattedData)
        .then((res) => {
          nextStep(step);

          setIsSubmitting((isSubmitting) => !isSubmitting);
        })
        .catch((err) => console.log(err));
    }
  }, [isSubmitting]);

  //Yup schema for validation
  let objSchema = Yup.object().shape({
    code: Yup.string().required(),
    valueStr: Yup.string().required(),
    dataType: Yup.string().required(),
  });
  let schema = Yup.array().of(objSchema);

  //separate json data into 2 steps
  const stepOne = [];
  const stepTwo = [];
  const stepSeparator = () => {
    for (let index = 0; index < jsonData.length; index++) {
      if (index < 3) {
        stepOne.push(jsonData[index]);
      } else {
        stepTwo.push(jsonData[index]);
      }
    }
  };

  stepSeparator();

  //grab names and default values from json data
  let initialValues = [];
  jsonData.map((element) =>
    initialValues.push({
      code: element["code"],
      valueStr: "",
      dataType: "string",
    })
  );

  //handlers for setting step state
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const resetStep = () => {
    setStep(1);
  };
  return (
    <div>
      <div id="app-container">
        <header>
          <img
            className="title-img"
            alt="MONKEY CASINO written on a wooden board"
            src={title}
          />
          <div id="language-buttons">
            <button onClick={() => i18n.changeLanguage("en")}>
              {t("buttons.englishButton")}
            </button>
            <button onClick={() => i18n.changeLanguage("hr")}>
              {t("buttons.croatianButton")}
            </button>
          </div>
        </header>
        <div id="step-container">
          {step === 1 ? (
            <StepOne
              step={step}
              nextStep={nextStep}
              state={formState}
              setState={formStateHandler}
              data={stepOne}
            />
          ) : step === 2 ? (
            <StepTwo
              setIsSubmitting={setIsSubmitting}
              step={step}
              prevStep={prevStep}
              state={formState}
              setState={formStateHandler}
              data={stepTwo}
            />
          ) : (
            <Success step={step} setStep={resetStep}></Success>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
