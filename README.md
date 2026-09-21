# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app locally, install the dependencies first:

```sh
yarn install
```

The local configuration uses SQLite in memory and loads the example catalog.
Run the frontend and backend in separate terminals:

Terminal 1:

```sh
yarn workspace app start
```

Terminal 2:

```sh
yarn workspace backend start
```

The frontend runs on `http://localhost:3001` and the backend must be running on
`http://localhost:7008`. The catalog API should then be available at
`http://localhost:7008/api/catalog/entities`.

If the browser shows `404` for catalog routes such as `/entity-facets` or
`/entities/by-query`, rebuild the backend after installing dependencies:

```sh
yarn workspace backend build
yarn workspace backend start
```
