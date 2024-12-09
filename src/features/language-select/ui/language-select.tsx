"use client";
import { useState } from "react";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { languageOptions } from "@/shared/data/locales";

const LanguageSelect: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    console.log(`Selected language: ${value}`);
  };

  return (
    <Dropdown
      items={languageOptions}
      value={selectedLanguage}
      onChange={handleLanguageChange}
      placeholder="Select Language"
    />
  );
};

export default LanguageSelect;
