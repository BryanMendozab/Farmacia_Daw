import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

function Navbar(){
    const navigate = useNavigate()
    const userSession = localStorage.getItem('user_session')
    const user = userSession ? JSON.parse(userSession) : null
    
    const handleLogout = () => {
        localStorage.removeItem('user_session')
        navigate('/login')
    }

    return(
        <>
            <nav className="bg-sky-600 text-white w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 max-w-7xl w-full mx-auto gap-4">
                        <div className="flex items-center gap-2 sm:gap-6">
                            <span className="text-lg sm:text-xl font-bold">Farmacia</span>
                            {user && (
                                <span className="text-gray-300 text-sm sm:text-base">Bienvenido, <span className="text-white font-semibold">{user.nombre}</span></span>
                            )}
                        </div>
                        {user && (
                            <button 
                                onClick={handleLogout}
                                className='flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base'
                                title="Cerrar Sesión"
                            >
                                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Cerrar Sesión</span>
                            </button>
                        )}
                </div>
            </nav>
        </>
    )

}

export default Navbar