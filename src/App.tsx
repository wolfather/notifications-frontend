import { CForm } from './components/CForm'
import { Log } from './components/Log'
import { Providers } from './providers'

function App() {
  return (
    <div className="App">
      <Providers>
        <CForm />
        <Log />
      </Providers>
    </div>
  )
}

export default App
