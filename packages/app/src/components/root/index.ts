import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { compatWrapper } from '@backstage/core-compat-api';
import argocdPlugin from '@roadiehq/backstage-plugin-argo-cd/alpha';
import { createElement } from 'react';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import { SidebarContent } from './Sidebar';
import { ArgoCDPageWithRollback } from '../argocd/ArgoCDPageWithRollback';

export const navModule = createFrontendModule({
  pluginId: 'app',
  extensions: [SidebarContent],
});

export const userSettingsTranslationsModule = createFrontendModule({
  pluginId: 'user-settings',
  extensions: [
    userSettingsPlugin
      .getExtension('sub-page:user-settings/general')
      .override({ params: { title: 'Geral' } }),
    userSettingsPlugin
      .getExtension('sub-page:user-settings/auth-providers')
      .override({ params: { title: 'Provedores de autenticação' } }),
    userSettingsPlugin
      .getExtension('sub-page:user-settings/feature-flags')
      .override({ params: { title: 'Flags de funcionalidade' } }),
  ],
});

export const argocdRollbackModule = createFrontendModule({
  pluginId: 'argocd',
  extensions: [
    argocdPlugin
      .getExtension('entity-content:argocd/ArgoCdPage')
      .override({
        params: {
          loader: async () =>
            compatWrapper(createElement(ArgoCDPageWithRollback)),
        },
      }),
  ],
});
