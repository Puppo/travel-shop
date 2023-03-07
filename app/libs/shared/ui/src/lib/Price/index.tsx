import { LANGUAGES } from '@travel-shop-app/utils';
import { useTranslation } from 'react-i18next';

interface PriceProps {
  value: number;
  currency?: string;
}

export function Price({ value, currency }: PriceProps) {
  const {
    i18n: { language },
  } = useTranslation();

  const currencySymbol = currency || LANGUAGES.find((lang) => lang.code === language)?.currency || 'EUR';

  return <>
    {new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currencySymbol,
    }).format(value)}
  </>;
}
