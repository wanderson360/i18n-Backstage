import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import argocdPlugin from '@roadiehq/backstage-plugin-argo-cd/alpha';
import { ensureAppLanguage } from './bootstrapLanguage';
import {
  catalogPageModule,
  argocdRollbackModule,
  navModule,
  userSettingsLabelsModule,
} from './components/root';
import { catalogApi } from './catalogMock';

ensureAppLanguage();

const appOptions = {
  features: [
    catalogPlugin,
    argocdPlugin,
    catalogApi,
    navModule,
    catalogPageModule,
    userSettingsLabelsModule,
    argocdRollbackModule,
  ],
} as Parameters<typeof createApp>[0];

export default createApp(appOptions);
