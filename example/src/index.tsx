import React from 'react'
import ReactDOM from 'react-dom/client'
import { SignatureCanvas } from 'kinto-brasil-checklist-sinistro-components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
      <SignatureCanvas />
    </div>
  </React.StrictMode>,
)