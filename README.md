[![Netlify Status](https://api.netlify.com/api/v1/badges/452c6634-d643-4dce-8725-d748a6580cd4/deploy-status)](https://app.netlify.com/sites/devshare-prod/deploys)

# DevShare

## Technologies
- [RedwoodJS](https://redwoodjs.com/): Open-source full-stack JAMstack framework for web and api layers
- [Supabase](https://supabase.io/): Open-source Firebase alternative for database and user management
- [TailwindCSS](https://tailwindcss.com/): CSS utility class framework for rapid styles generation
- [HeadlessUI](https://headlessui.dev/): Accessible UI components
- [Netlify](https://www.netlify.com/): Website hosting with continuous deployment

## Getting Started with RedwoodJS
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`. 
