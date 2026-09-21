import {
  Sidebar,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarScrollWrapper,
  SidebarSpace,
} from '@backstage/core-components';
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { NavContentBlueprint } from '@backstage/plugin-app-react';
import { SidebarLogo } from './SidebarLogo';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { SidebarSearchModal } from '@backstage/plugin-search';
import { UserSettingsSignInAvatar } from '@backstage/plugin-user-settings';
import { NotificationsSidebarItem } from '@backstage/plugin-notifications';
import { appTranslationRef } from '../../translations';

const sidebarTranslationKeys: Record<string, keyof typeof appTranslationRef.T> =
  {
    Home: 'sidebar.home',
    Search: 'sidebar.search',
    Catalog: 'sidebar.catalog',
    Create: 'sidebar.create',
    APIs: 'sidebar.apis',
    'Catalog Graph': 'sidebar.catalogGraph',
    Docs: 'sidebar.docs',
    Notifications: 'sidebar.notifications',
    'Register Existing…': 'sidebar.registerExisting',
    Visualizer: 'sidebar.visualizer',
    Settings: 'sidebar.settings',
    Menu: 'sidebar.menu',
  };

export const SidebarContent = NavContentBlueprint.make({
  params: {
    component: function SidebarComponent({ navItems }) {
      const { t } = useTranslationRef(appTranslationRef);

      const translateSidebarTitle = (title?: string) =>
        title && sidebarTranslationKeys[title]
          ? t(sidebarTranslationKeys[title])
          : title;

      const nav = navItems.withComponent(item => (
        <SidebarItem
          icon={() => item.icon}
          to={item.href}
          text={translateSidebarTitle(item.title)}
        />
      ));

      // Skipped items
      nav.take('page:search'); // Using search modal instead

      return (
        <Sidebar>
          <SidebarLogo />
          <SidebarGroup
            label={t('sidebar.search')}
            icon={<SearchIcon />}
            to="/search"
          >
            <SidebarSearchModal />
          </SidebarGroup>
          <SidebarDivider />
          <SidebarGroup label={t('sidebar.menu')} icon={<MenuIcon />}>
            {nav.take('page:catalog')}
            {nav.take('page:scaffolder')}
            <SidebarDivider />
            <SidebarScrollWrapper>
              {nav.rest({ sortBy: 'title' })}
            </SidebarScrollWrapper>
          </SidebarGroup>
          <SidebarSpace />
          <SidebarDivider />
          <NotificationsSidebarItem />
          <SidebarDivider />
          <SidebarGroup
            label={t('sidebar.settings')}
            icon={<UserSettingsSignInAvatar />}
            to="/settings"
          >
            {nav.take('page:app-visualizer')}
            {nav.take('page:user-settings')}
          </SidebarGroup>
        </Sidebar>
      );
    },
  },
});
