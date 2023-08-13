import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Loader from './components/Loader.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Loader urls={{
    departamentos: '/data/departamentos-argentina.json',
    departamentosBsAs: '/data/departamentos-buenos_aires.json',
    provincias: '/data/provincias.json',
    rutas: '/data/rutas.json',
    }}>
 <App />
</Loader>
 </React.StrictMode>,
)
