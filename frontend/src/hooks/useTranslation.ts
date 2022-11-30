import { useTranslation as externalUseTranslation } from 'react-i18next';

export type TranslationParams = {
  plural?: boolean;
  number?: number;
};

export const useTranslation = () => {
  const { t } = externalUseTranslation();
  return (text: string, params?: TranslationParams): string => {
    const translationParams = {
      count: params?.plural ? 0 : undefined,
      number: params?.number,
    };

    const translation = t(text, translationParams);
    return translation;
  };
};
