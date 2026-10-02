import { render, waitFor } from '@testing-library/react';
import App from './App';
import { ensureAppLanguage } from './bootstrapLanguage';

describe('App', () => {
  it('should force Portuguese on app startup', () => {
    window.localStorage.setItem('language', 'en');

    ensureAppLanguage();

    expect(window.localStorage.getItem('language')).toBe('pt-BR');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('should render', async () => {
    process.env = {
      NODE_ENV: 'test',
      APP_CONFIG: [
        {
          data: {
            app: { title: 'Test' },
            backend: { baseUrl: 'http://localhost:7008' },
            techdocs: {
              storageUrl: 'http://localhost:7008/api/techdocs/static/docs',
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
