import { useEffect } from 'react'
import { useRouter } from 'next/router'
import './styles.css';

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('/api/session')
      if (!response.ok) {
        router.push('/login')
      }
    }

    checkSession()
  }, [])

  return <Component {...pageProps} />
}

export default App;
