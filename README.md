# Ambix

Rework of Ambix using functional components and hooks rather than class components.

## Commands

`npm run now` - Creates a production build of the frontend and serves it on PORT 3000. The development server used by `create-react-app` has a refresh quirk that creates a race-condition when loading the YouTube IFrame API. This is a quick workaround.

`npm run build` - Uses the `create-react-aoo` build script to generate a production build in the `/build` directory.
