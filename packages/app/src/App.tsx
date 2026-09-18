import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { ensureAppLanguage } from './bootstrapLanguage';
import { navModule } from './modules/nav';
import {
  appTranslations,
  catalogReactTranslations,
  catalogTranslations,
  coreComponentsTranslations,
} from './translations';

ensureAppLanguage();

const appOptions = {
  features: [catalogPlugin, navModule],
  __experimentalTranslations: {
    defaultLanguage: 'pt-BR',
    availableLanguages: ['pt-BR'],
    resources: [
      appTranslations,
      catalogTranslations,
      catalogReactTranslations,
      coreComponentsTranslations,
    ],
  },
} as Parameters<typeof createApp>[0] & {
  __experimentalTranslations: {
    defaultLanguage: string;
    availableLanguages: string[];
    resources: (typeof appTranslations)[];
  };
};

export default createApp(appOptions);
