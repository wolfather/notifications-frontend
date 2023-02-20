import { CLog } from './components/CLog';
import { CNavbar } from './components/CNavbar';
import { CForm } from './components/CForm';

import { Providers } from './providers';
import { Suspense } from 'react';
import lazyLoadingComponent from './lazyloadingcomponent';
import { CLoadingComponent } from './components/CLoading/CLoading.compoent';

// const CLog = lazyLoadingComponent({path: './components/CLog'})
// const CNavbar = lazyLoadingComponent({path: './components/CNavbar'})
// const CForm = lazyLoadingComponent({path: './components/CForm'})

function App() {
  return (
    <>
      <Providers>
        <Suspense fallback={<CLoadingComponent />}>

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
