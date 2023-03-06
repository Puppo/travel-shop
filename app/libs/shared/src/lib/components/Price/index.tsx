import { useTranslation } from 'react-i18next';

interface PriceProps {
  value: number;
  currency?: string;
}

export function Price({ value, currency }: PriceProps) {
  const {
    i18n: { language },
  } = useTranslation();

  return <>
    {new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency || 'EUR',
    }).format(value)}
  </>;
}
