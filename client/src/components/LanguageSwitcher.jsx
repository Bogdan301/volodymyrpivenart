import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <div className="flex items-center gap-2 font-label text-sm">
      <button
        onClick={() => changeLanguage("en")}
        className={`transition-colors ${
          i18n.language === "en"
            ? "text-crimson font-semibold"
            : "text-inherit opacity-70 hover:opacity-100"
        }`}
      >
        EN
      </button>

      <span className="opacity-40">|</span>

      <button
        onClick={() => changeLanguage("uk")}
        className={`transition-colors ${
          i18n.language === "uk"
            ? "text-crimson font-semibold"
            : "text-inherit opacity-70 hover:opacity-100"
        }`}
      >
        UA
      </button>
    </div>
  );
}