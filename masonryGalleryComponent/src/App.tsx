import { useState } from 'react'
import MasonryGallery from "./components/MasonryGallery";
import './App.css'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <MasonryGallery />
    </div>
  )
}

export default App;

