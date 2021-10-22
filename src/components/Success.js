import i18next from "i18next";
import React from "react";

function Success({ setStep }) {
  return (
    <div id="success-div">
      {i18next.t(`success.message`)}
      <button onClick={setStep}>{i18next.t(`success.button`)}</button>
    </div>
  );
}

export default Success;
