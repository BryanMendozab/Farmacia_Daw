import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const manejarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const { data, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password).single()

        if (error || !data) {
            alert('Correo o contraseña incorrectos')
            return
        }
        
        localStorage.setItem('user_session', JSON.stringify(data))
        console.log('Usuario logueado:', data)
        alert('¡Login exitoso! Bienvenido.')
        navigate('/')
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md'>
                <h1 className='text-xl sm:text-2xl font-bold text-sky-700 mb-4 sm:mb-6 text-center'>Iniciar Sesión</h1>
                
                <form onSubmit={manejarSubmit} className='flex flex-col gap-3 sm:gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Correo electrónico</label>
                        <input 
                            type="email" 
                            placeholder='correo@ejemplo.com'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className='border border-gray-300 rounded-md p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-sky-500'
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
                            className='border border-gray-300 rounded-md p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-sky-500'
                            required
                        />
                    </div>

                    <button 
                        type='submit'
                        className='bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 sm:py-3 rounded-md transition-colors mt-2'
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
