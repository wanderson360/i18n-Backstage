export const ensureAppLanguage = () => {
  const preferredLanguage = 'pt-BR';

  if (typeof window === 'undefined') {
    return preferredLanguage;
  }

  const currentLanguage = window.localStorage.getItem('language');

  if (currentLanguage !== preferredLanguage) {
    window.localStorage.setItem('language', preferredLanguage);
  }

  document.documentElement.lang = preferredLanguage;

  return preferredLanguage;
};
