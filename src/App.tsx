import { CForm } from './components/Form'
import { Providers } from './providers'
import { AppLoggerProvider } from './providers/applogger.provider'
import { UserProvider } from './providers/user.provider'

function App() {
  return (
    <div className="App">
      <Providers>
        <CForm />
      </Providers>
    </div>
  )
}

export default App
