import { render, waitFor } from '@testing-library/react';
import App from './App';
import { ensureAppLanguage } from './bootstrapLanguage';
import {
  catalogReactTranslations,
  catalogTranslations,
  coreComponentsTranslations,
} from './translations';

describe('App', () => {
  it('should force Portuguese on app startup', () => {
    window.localStorage.setItem('language', 'en');

    ensureAppLanguage();

    expect(window.localStorage.getItem('language')).toBe('pt-BR');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('should translate the catalog page content to Portuguese', () => {
    expect(catalogTranslations.messages['indexPage.title']).toBe(
      '{{orgName}} Catálogo',
    );
    expect(
      catalogReactTranslations.messages['userListPicker.orgFilterAllLabel'],
    ).toBe('Todos');
    expect(catalogTranslations.messages['aboutCard.ownerField.label']).toBe(
      'Responsável',
    );
    expect(catalogTranslations.messages['indexPage.createButtonTitle']).toBe(
      'Criar',
    );
    expect(catalogTranslations.messages['catalogTable.allFilters']).toBe(
      'Todos',
    );
    expect(catalogReactTranslations.messages['entityKindPicker.title']).toBe(
      'Tipo',
    );
    expect(catalogReactTranslations.messages['entityOwnerPicker.title']).toBe(
      'Responsável',
    );
    expect(
      catalogReactTranslations.messages['userListPicker.orgFilterAllLabel'],
    ).toBe('Todos');
    expect(
      coreComponentsTranslations.messages['signIn.guestProvider.title'],
    ).toBe('Convidado');
    expect(
      coreComponentsTranslations.messages['signIn.guestProvider.enter'],
    ).toBe('Entrar');
    expect(
      coreComponentsTranslations.messages['signIn.guestProvider.subtitle'],
    ).toContain('Entre como usuário convidado');
  });

  it('should render', async () => {
    process.env = {
      NODE_ENV: 'test',
      APP_CONFIG: [
        {
          data: {
            app: { title: 'Test' },
            backend: { baseUrl: 'http://localhost:7007' },
            techdocs: {
              storageUrl: 'http://localhost:7007/api/techdocs/static/docs',
            },
          },
          context: 'test',
        },
      ] as any,
    };

    const rendered = render(App.createRoot());

    await waitFor(() => {
      expect(rendered.baseElement).toBeInTheDocument();
    });
  });
});
