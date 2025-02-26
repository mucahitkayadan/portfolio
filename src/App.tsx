import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Education, Experience, Awards, Hero, Navbar, Tech, Projects, StarsCanvas } from './components'
import Feedbacks from './components/Feedbacks'
import ChatBot from './components/ChatBot'
// import { Analytics } from "@vercel/analytics/react"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className="div bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Education />
        <Experience />          
        <Tech />
        <Projects />
        <Awards />
        {/* <Feedbacks /> */}
        <div className="div relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <ChatBot />
      </div>
    </BrowserRouter>
  )
}

export default App 