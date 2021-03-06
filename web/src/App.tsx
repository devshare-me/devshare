import { AuthProvider } from '@redwoodjs/auth'
import { createClient } from '@supabase/supabase-js'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import packageJson from '../package.json'

import './index.css'

process.env.SENTRY_DSN &&
  process.env.NODE_ENV === 'production' &&
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5,
    release: 'devshare@' + packageJson.version,
  })

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <AuthProvider client={supabaseClient} type="supabase">
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
