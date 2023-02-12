import { CForm } from './components/CForm'
import { Navbar } from './components/Navbar'
import { Log } from './components/Log'
import { Providers } from './providers'

function App() {
  return (
    <>
      <Providers>
        <Navbar />
        <section className='flex columns-2'>
          <main className='pl-6 mr-6'>
            <CForm />
          </main>
          <Log />
        </section>
      </Providers>
    </>
  )
}

export default App
