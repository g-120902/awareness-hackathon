import LinkItem from "./LinkItem";
import { useTranslations } from "next-intl";

export default function Header(): JSX.Element {
  const t = useTranslations('header');

  return (
    <div className="h-8 text-secondary shadow-sm text-blue-hover md:flex hidden">
      <LinkItem text={t('home')} href={`/`} />
      <LinkItem text={t('sniffing')} href={`/blogs/sniffing`} />
      <LinkItem text={t('phishing')} href={`/blogs/phishing`} />
      <LinkItem text={t('ai-detector')} href={`/ai-detector`} />
      <LinkItem text={t('deepfake')} href={`/deepfake`} />
      <LinkItem text={t('quiz')} href={`/quiz`} />


    </div>
  );
}
