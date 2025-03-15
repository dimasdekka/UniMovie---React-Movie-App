'use client'
import { useEffect } from 'react'
import useFluidCursor from '../hooks/useFluidCursor'

const FluidCursor = () => {
  useEffect(() => {
    useFluidCursor()
  }, [])

  return (
    <div className="fixed top-0 left-0 z-[9999] pointer-events-none">
      <canvas 
        id="fluid" 
        className="w-screen h-screen"
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
    </div>
  )
}

export default FluidCursor