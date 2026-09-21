import { InMemoryCatalogClient } from '@backstage/catalog-client/testUtils';
import { mockEntities } from './catalogMock';

describe('catalog mock', () => {
  it('returns local entities without a backend', async () => {
    const catalog = new InMemoryCatalogClient({ entities: mockEntities });

    const response = await catalog.queryEntities({
      filter: { kind: 'Component' },
    });

    expect(response.items).toHaveLength(1);
    expect(response.items[0].metadata.name).toBe('example-website');
  });
});
