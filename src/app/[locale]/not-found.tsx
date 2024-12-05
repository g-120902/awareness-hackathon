import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { HomeIcon } from "@heroicons/react/24/outline";
import { IconButton } from '@/components/common/IconButton';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex flex-col items-center justify-center pb-12 mt-12">
      <div className="flex justify-center w-full">
        <Image
          priority={true}
          width={490}
          height={481}
          src="/images/NotFound/404Error.png"
          alt={t('imageAlt')}
          className="h-3/12 w-auto"
        />
      </div>

      {/* Title and message */}
      <h1 className="md:text-4xl text-xl font-semibold text-black mb-4 text-center mx-4">{t('title')}</h1>
      <p className="md:text-lg text-base text-dark-gray mb-6 text-center">{t('message')}</p>

      {/* Back to home button */}
      <Link href="/">
        <IconButton icon={<HomeIcon />} label={t('button')} />
      </Link>
    </div>
  );
}
