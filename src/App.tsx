import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import type {Medicamento} from './types'
import {FormAdd, Listado, Navbar} from './components'
import { useMedicamento} from './hooks'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Registro from './pages/Registro'
import './App.css'

function Farmacia() {

  const {medicamento, insertar, editar, eliminar} =useMedicamento()
  const [medicamentoEditar, setMedicamentoEditar] = useState<Medicamento | null>(null)
  const [filtroTipo, setFiltroTipo] = useState<string>("Todos")

  const usarEditar = (medicamento: Medicamento) => {
    setMedicamentoEditar(medicamento)
  }

  const tiposUnicos = ["Todos", ...Array.from(new Set(medicamento.map(m => m.tipo).filter(t => t.trim() !== "")))]
  const medicamentosFiltrados = filtroTipo === "Todos" ? medicamento : medicamento.filter(m => m.tipo === filtroTipo)

  return (
    <>
    <div className='flex flex-col justify-center items-center'>

      <Navbar/>

      <FormAdd
      insertar={insertar}
      editar={editar}
      medicamentoEditar = {medicamentoEditar}
       /> 

      <div className="w-full max-w-7xl mx-auto px-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por tipo:</label>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {tiposUnicos.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl w-full'>

            {medicamentosFiltrados.map((dato) =>(
              <Listado 
                id={dato.id}
                nombre={dato.nombre}
                descripcion={dato.descripcion}
                precio={dato.precio}
                stock={dato.stock}
                tipo={dato.tipo}
                onEditar={usarEditar}
                onEliminar={eliminar}
              />
            ))}


      </div>
      
    </div>
    </>
  )
}

function App() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route path="/" element={user ? <Farmacia /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/registro" element={!user ? <Registro /> : <Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
