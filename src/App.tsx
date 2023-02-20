//import { CForm } from './components/CForm';

import lazyLoadingComponent from './lazyloadingcomponent';
import { Providers } from './providers';

import { Suspense } from 'react'


const CForm = lazyLoadingComponent({path: './components/CForm', name: 'CForm'});
const CNavbar = lazyLoadingComponent({path: './components/CNavbar', name: 'CNavbar'});
const CLog = lazyLoadingComponent({path: './components/CLog', name: 'CLog'});

function App() {
  return (
    <>
      <Providers>
        <Suspense fallback={<p>loading...</p>}>
          <CNavbar />
          <section className='flex columns-2'>
            <main className='pl-6 mr-6'>
              <CForm />
            </main>
            <CLog />
          </section>
        </Suspense>
      </Providers>
    </>
  )
}

export default App
