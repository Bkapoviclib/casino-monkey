import React from 'react'
import { useTranslation } from "react-i18next";
function Sidebox() {
    const { t, i18n } = useTranslation();
    return (

        <div id="side-text">
            <h1>{t(`registration.title`)}</h1>
            <p>{t(`registration.text`)}</p>
        </div>
    )
}

export default Sidebox
