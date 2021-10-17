import React from "react";
import jsonData from "./data.json";
import translate from "./translate.json";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useForm } from "react-hook-form";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import monkey from "./monkey.png";
import { Animated } from "react-animated-css";

function App() {
  const { t, i18n } = useTranslation();
  //initialize react-hook-form variables
  const { register, handleSubmit, watch } = useForm();
  console.log(watch("First Name"));
  //set initial state for step
  const [step, setStep] = useState(0);
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
    console.log("formatted data: ", formattedData);
    if (isSubmitting == true) {
      submitRegistration(formattedData)
        .then((res) => {
          alert("Success!!!");
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
  let testSchema = [{ valueStr: "testName", dataType: "string" }];

  useEffect(() => {
    if (step == 0) {
      nextStep(step);
    } else if (step == 1) {
      nextStep(step);
    } else {
      prevStep(step);
    }
  }, [formState]);

  schema.isValid(testSchema).then((res) => {
    console.log(res, testSchema);
  });

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
    console.log("step one: ", stepOne, "step two: ", stepTwo);
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
  console.log(initialValues);

  //handlers for setting step state
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  //updating state on step change
  const updateState = () => {};

  return (
    <div id="app-container">
      <header>
        <h1 id="title">MONKEY CASINO</h1>
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
        {step == 1 ? (
          <StepOne
            step={step}
            nextStep={nextStep}
            state={formState}
            setState={formStateHandler}
            data={stepOne}
          />
        ) : (
          <StepTwo
            setIsSubmitting={setIsSubmitting}
            step={step}
            prevStep={prevStep}
            state={formState}
            setState={formStateHandler}
            data={stepTwo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
