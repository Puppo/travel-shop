export type Language = {
  code: string;
  label: string;
  currency: string;
};

export const LANGUAGES: Language[] = [
  {
    code: 'en-GB',
    label: 'English',
    currency: 'GBP',
  },
  {
    code: 'it-IT',
    label: 'Italiano',
    currency: 'EUR',
  },
  {
    code: 'es-ES',
    label: 'Español',
    currency: 'EUR',
  },
];
