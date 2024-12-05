'use client';

import { useState } from "react";
import MenuButton from "./MenuButton";
import Slider from "./Slider";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const t = useTranslations('header');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="absolute z-50 md:hidden">
      <MenuButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
      <Slider isMenuOpen={isMenuOpen}>
        <div className="flex flex-col px-4 underline gap-4 uppercase">
        <Link href='/'>{t('home')}</Link>
          <Link href='/blogs/sniffing'>{t('sniffing')}</Link>
          <Link href='/blogs/phishing'>{t('phishing')}</Link>
          <Link href='/ai-detector'>{t('ai-detector')}</Link>
          <Link href='/quiz'>{t('quiz')}</Link>

          <span className="bg-blue-hover w-16 h-[1px] self-center my-4"/>
        </div>
      </Slider>
    </section>
  );
}
