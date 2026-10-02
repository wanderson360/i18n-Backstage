import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { compatWrapper } from '@backstage/core-compat-api';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import argocdPlugin from '@roadiehq/backstage-plugin-argo-cd/alpha';
import { createElement } from 'react';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import { SidebarContent } from './Sidebar';
import { ArgoCDPageWithRollback } from '../argocd/ArgoCDPageWithRollback';
import { CatalogPagePT } from '../catalog/CatalogPagePT';

export const navModule = createFrontendModule({
  pluginId: 'app',
  extensions: [SidebarContent],
});

export const catalogPageModule = createFrontendModule({
  pluginId: 'catalog',
  extensions: [
    catalogPlugin.getExtension('page:catalog').override({
      params: {
        title: 'Catálogo',
        loader: async () => compatWrapper(createElement(CatalogPagePT)),
      },
    }),
  ],
});

export const userSettingsLabelsModule = createFrontendModule({
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
    argocdPlugin.getExtension('entity-content:argocd/ArgoCdPage').override({
      params: {
        loader: async () =>
          compatWrapper(createElement(ArgoCDPageWithRollback)),
      },
    }),
  ],
});
