import { useState } from 'react'
import './App.css'
import Terminal from './components/Terminal';
import PortfolioBody from './components/PortfolioBody';

export default function App() {
  const[portfolioStarted, setPortfolioStarted] = useState(false);

  return (
    <>
      <PortfolioBody />
      {!portfolioStarted ? (
        <Terminal onSuccess={() => setPortfolioStarted(true)}/>
      ) : (
        <Home />
      )}
    </>
  )
}
