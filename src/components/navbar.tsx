import { useNavigate } from 'react-router-dom'

function Navbar(){
    const navigate = useNavigate()
    const user = localStorage.getItem('user_session')
    
    const handleLogout = () => {
        localStorage.removeItem('user_session')
        navigate('/login')
    }

    return(
        <>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white w-full ">
                    <ul className="flex gap-4 ">
                        <li className="hover:text-gray-300 flex-1"><a href="/">Inicio</a></li>
                        <li className="hover:text-gray-300 flex-1"><a href="/medicamentos">Medicamentos</a></li>
                        <li className="hover:text-gray-300 flex-1"><a href="/contacto">Contacto</a></li>
                        <li className="hover:text-gray-300 flex-1"><a href="/carrito">Carrito</a></li>
                        {!user && <li className="hover:text-gray-300 flex-1"><a href="/login">Login</a></li>}

                    </ul>
                    {user && (
                        <button 
                            onClick={handleLogout}
                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors'
                        >
                            Cerrar Sesión
                        </button>
                    )}
            </nav>
        </>
    )

}

export default Navbar