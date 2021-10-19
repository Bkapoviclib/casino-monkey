import i18next from 'i18next';
import React from 'react'
import { useTranslation } from "react-i18next";

function Success({step,setStep}) {
    const { t, i18n } = useTranslation();
    return (
        <div id="success-div">
            {i18next.t(`success.message`)}
            <button onClick={setStep}>{i18next.t(`success.button`)}</button>
            
        </div>
    )
}

export default Success
