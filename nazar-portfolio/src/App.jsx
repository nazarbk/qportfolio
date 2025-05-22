import { useState } from 'react'
import Typical from 'react-typical';
import './App.css'
import Terminal from './components/Terminal';

export default function App() {
  const[portfolioStarted, setPortfolioStarted] = useState(false);

  return (
    <>
      <div className='portfolio-header'>
        <h1 className='main-title'>Nazar Blanco</h1>
        <Typical 
          steps={[
            'Multimedia Engineer', 1500,
            'Fullstack Developer', 1500,
            'Quantum Computing Engineer', 1500,
            'Software Developer', 1500
          ]}
          loop={Infinity}
          wrapper='span'
          className='typing-title'
        />
      </div>
        {!portfolioStarted ? (
          <Terminal onSuccess={() => setPortfolioStarted(true)}/>
        ) : (
          <Home />
        )}
    </>
  )
}
