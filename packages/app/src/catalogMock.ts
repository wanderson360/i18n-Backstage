import { InMemoryCatalogClient } from '@backstage/catalog-client/testUtils';
import {
  ApiBlueprint,
  configApiRef,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/frontend-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { CatalogClient } from '@backstage/catalog-client';

export const mockEntities: Entity[] = [
  {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'System',
    metadata: { name: 'portal-dev-wan', description: 'Sistema de exemplo' },
    spec: { owner: 'group:default/guests' },
  },
  {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Component',
    metadata: {
      name: 'example-website',
      description: 'Componente local para desenvolvimento do portal',
    },
    spec: {
      type: 'website',
      lifecycle: 'experimental',
      owner: 'group:default/guests',
      system: 'system:default/portal-dev-wan',
    },
  },
  {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'API',
    metadata: { name: 'example-api', description: 'API de exemplo' },
    spec: {
      type: 'openapi',
      lifecycle: 'experimental',
      owner: 'group:default/guests',
      system: 'system:default/portal-dev-wan',
      definition:
        'openapi: 3.0.0\ninfo:\n  title: Example API\n  version: 1.0.0',
    },
  },
  {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Group',
    metadata: { name: 'guests', description: 'Grupo local de desenvolvimento' },
    spec: { type: 'team', children: [] },
  },
  {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'User',
    metadata: { name: 'guest', description: 'Usuário local' },
    spec: { memberOf: ['group:default/guests'] },
  },
];

export const catalogApi = ApiBlueprint.make({
  name: 'catalog-backend-or-mock',
  params: defineParams =>
    defineParams({
      api: catalogApiRef,
      deps: {
        configApi: configApiRef,
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ configApi, discoveryApi, fetchApi }) => {
        if (configApi.getOptionalBoolean('catalog.frontendMock.enabled')) {
          return new InMemoryCatalogClient({ entities: mockEntities });
        }

        return new CatalogClient({ discoveryApi, fetchApi });
      },
    }),
});
