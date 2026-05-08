import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks'

function Registro() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')
    const navigate = useNavigate()

    const { insertarUsers } = useUsers()

    const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        insertarUsers(nombre, email, password)
        navigate('/')
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Crear Cuenta</h1>
                
                <form onSubmit={manejarSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Nombre completo</label>
                        <input 
                            type="text" 
                            placeholder='Juan Pérez'
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder='correo@ejemplo.com'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder='********'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Confirmar contraseña</label>
                        <input 
                            type="password" 
                            placeholder='********'
                            value={confirmarPassword} 
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    <button 
                        type='submit'
                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors mt-2'
                    >
                        Registrarse
                    </button>
                </form>

                <p className='text-center text-sm text-gray-600 mt-4'>
                    ¿Ya tienes cuenta? <a href='/login' className='text-blue-600 hover:underline'>Inicia sesión</a>
                </p>
            </div>
        </div>
    )
}

export default Registro
