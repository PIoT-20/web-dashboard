# web-dashboard

The web dashboard is the frontend of the PIoT-20 system. It is built with Vue 3, TypeScript and Vite.

## Features

- **Dashboard** (`/`): pick a user and a time range to see quality indexes per device, as cards and as a heat map on the user's floor plan.
- **Users** (`/user`): create and edit users, including their SVG floor plan and the location points on it.
- **Devices** (`/devices`): create and edit a user's devices, including their sensors and connection settings.

## How it talks to the backend

- **Catalog** (`VITE_CATALOG_URL`) handles users and devices.
- **Quality index service (QIS)**: the dashboard asks the catalog for the address registered as `QIS` (`GET /service?service_type=QIS`), then calls that address directly from the browser.

All requests come from the user's browser. That means the catalog URL, and the address QIS registers, must be reachable from the user's machine, not just from inside the Docker network.

## Configuration

Create `.env` (gitignored):

```env
VITE_CATALOG_URL=http://localhost:8085
VITE_QIS_URL=http://localhost:8084
```

Vite builds `VITE_*` variables into the bundle **at build time**. The Docker image copies this `.env` before running `yarn build`, so variables set at runtime (for example in docker-compose `environment:`) have no effect on the built app.

## Development

```sh
yarn               # install dependencies
yarn dev           # dev server at http://localhost:8080 (hot reload)
yarn build         # type-check and build for production
yarn type-check    # vue-tsc only
yarn test:unit     # vitest
yarn format        # prettier
```

## Docker

The image builds the app with Node 20 and serves `dist/` from nginx on port 80. It falls back to `index.html` for client-side routing and proxies `/catalog/` to `http://catalog:8080/`.

```sh
docker build -t web-dashboard .
docker run -p 80:80 web-dashboard
```

In the full stack, start it with `docker compose up web-dashboard` from the [devops](https://github.com/PIoT-20/devops) repo.

## Project structure

```
src/
  views/        pages: home (dashboard), user-page, device-page, plus their components
  services/     REST calls to the catalog and QIS
  models/       TypeScript models matching the catalog schemas
  controllers/  shared app state (e.g. the QIS address)
  api/          axios HTTP client
  stores/       local storage helpers
  utils/        formatting and helper functions
```
