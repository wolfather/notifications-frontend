import { CForm } from './components/CForm'
import { Log } from './components/Log'
import { Providers } from './providers'

function App() {
  return (
    <div className="App flex columns-2">
      <Providers>
        <main className='pl-6 mr-6'>
          <h1 className="mb-6 text-3xl font-bold underline">Notifications</h1>

          <CForm />
        </main>
        <Log />
      </Providers>
    </div>
  )
}

export default App
