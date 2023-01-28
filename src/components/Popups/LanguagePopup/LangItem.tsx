import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { LanguageType } from "../../../redux/types/prefs";
import { languageTexts } from "../../../utils/languageTexts";
import CheckItem from "../../UI/PopupItems/CheckItem";

const LangItem = ({
  lang,
  onCheck,
}: {
  lang: LanguageType;
  onCheck: (language: LanguageType) => void;
}) => {
  const language = useSelector(getLanguage);
  return (
    <CheckItem
      key={lang}
      title={languageTexts.languages[lang]}
      onPress={() => onCheck(lang)}
      isChecked={language === lang}
    />
  );
};

export default LangItem;
