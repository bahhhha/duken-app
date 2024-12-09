import ReactCountryFlag from "react-country-flag";

export const languageOptions = [
  {
    value: "kz",
    label: "Қазақша",
    icon: ReactCountryFlag({ countryCode: "KZ", svg: true }),
  },
  {
    value: "ru",
    label: "Русский",
    icon: ReactCountryFlag({ countryCode: "RU", svg: true }),
  },
  {
    value: "en",
    label: "English",
    icon: ReactCountryFlag({ countryCode: "US", svg: true }),
  },
];
