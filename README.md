# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn start
```

The local configuration uses SQLite in memory and loads the example catalog.
Start the backend separately when the catalog page shows a connection error:

```sh
yarn workspace backend start
```

The catalog API should then be available at `http://localhost:7007/api/catalog/entities`.

yarn install
yarn workspace app build
yarn start
yarn workspace backend start
