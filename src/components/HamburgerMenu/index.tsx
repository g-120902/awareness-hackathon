'use client';

import { useState } from "react";
import MenuButton from "./MenuButton";
import Slider from "./Slider";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const t = useTranslations('hamburger');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="relative">
      <MenuButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
      <Slider isMenuOpen={isMenuOpen}>
        <div className="flex flex-col px-4">
          <Link href='/contact-us'>{t('contact-us')}</Link>
          <span className="bg-ivory w-16 h-[1px] self-center my-4"/>
            <LanguageSwitcher />
        </div>
      </Slider>
    </section>
  );
}
