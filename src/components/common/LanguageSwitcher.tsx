"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { localeNames } from "@/i18n/config";

/**
 * This component displays the language switcher.
 * @author Valentin Magde
 * @author Gregory Albert
 *
 * @since 2024-11-18
 *
 * @returns {JSX.Element} A Language switcher component.
 */
export default function LanguageSwitcher(): JSX.Element {
    const locale = useLocale();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const t = useTranslations("header.language-switcher");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const [form, setForm] = useState({
        country: "",
        lang: "en",
    });

    const handleChange = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onSubmit = () => {
        if (locale === form.lang) {
            toggleDropdown();
            return;
        }

        toggleDropdown();
        router.replace(pathName, { locale: form.lang });
    };

    return (
        <section className="absolute select-none z-50 flex flex-col items-end top-12">
            <span
                onClick={toggleDropdown}
                className={`p-1 px-2 font-bold text-base cursor-pointer ${dropdownOpen ? "bg-gray-200 text-dark-gray" : "bg-transparent text-ivory"
                    }`}
            >
                {!dropdownOpen
                    ? localeNames[locale as keyof typeof localeNames]
                    : "- -"}
            </span>

            {dropdownOpen && (
                <div
                    className="items-start flex flex-col gap-2 w-fit text-gray-600 text-sm h-fit p-4 bg-gray-200 absolute top-8"
                >
                    <div>
                        <select
                            className="bg-white w-36"
                            defaultValue={locale}
                            name="lang"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        >
                            {Object.entries(localeNames).map(([langCode, langName]) => (
                                <option key={langCode} value={langCode}>
                                    {langName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div
                        onClick={onSubmit}
                        className="bg-pale-blue w-fit h-fit rounded-sm text-blue-hover py-1 px-3 text-sm"
                    >
                        {t("submit")}
                        {" >"}
                    </div>
                </div>
            )}
        </section>
    );
}
