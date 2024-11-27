import React from 'react'
import PublicRoutes from './routes/PublicRoutes'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div>
      <PublicRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}
