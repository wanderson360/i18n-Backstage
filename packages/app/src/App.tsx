import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { ensureAppLanguage } from './bootstrapLanguage';
import { navModule, userSettingsTranslationsModule } from './components/root';
import { catalogApi } from './catalogMock';
import {
  appTranslations,
  catalogReactTranslations,
  catalogTranslations,
  coreComponentsTranslations,
  userSettingsTranslations,
} from './translations';

ensureAppLanguage();

const appOptions = {
  features: [
    catalogPlugin,
    catalogApi,
    navModule,
    userSettingsTranslationsModule,
  ],
  __experimentalTranslations: {
    defaultLanguage: 'pt-BR',
    availableLanguages: ['pt-BR'],
    resources: [
      appTranslations,
      catalogTranslations,
      catalogReactTranslations,
      coreComponentsTranslations,
      userSettingsTranslations,
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
