import { CForm } from './components/CForm'
import { CNavbar } from './components/CNavbar'
import { CLog } from './components/CLog'
import { Providers } from './providers'

function App() {
  return (
    <>
      <Providers>
        <CNavbar />
        <section className='flex columns-2'>
          <main className='pl-6 mr-6'>
            <CForm />
          </main>
          <CLog />
        </section>
      </Providers>
    </>
  )
}

export default App
