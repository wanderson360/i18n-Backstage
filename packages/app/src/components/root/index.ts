import { createFrontendModule } from '@backstage/frontend-plugin-api';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import { SidebarContent } from './Sidebar';

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
