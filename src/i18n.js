import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from './translate.json'
const croatian = {"woo":"boo"}

const resources = {
    ...english
}
i18n.use(initReactI18next).init({
    resources, lng:"hr",
    react:{useSuspense:false}
})

export default i18n;
