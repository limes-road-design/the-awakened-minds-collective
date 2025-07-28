import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HomeRoute } from '~/routes/HomeRoute'

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomeRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)
