import { useState } from 'react'
import type {Medicamento} from '../types'
import Confirmacion from './confirmacion'


interface Props{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock:number;
    tipo:string;
    onEditar: (medicamento: Medicamento) => void;
    onEliminar: (id:number) => void;

}

function Listado({id, nombre, descripcion, precio, stock, tipo, onEditar, onEliminar}:Props){

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)


    const eliminar = (id: number) =>{
        onEliminar(id)
        setMostrarConfirmacion(false)
    }



    return(
        <>
            <div className='relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-1 min-w-[260px] max-w-sm'>
                {stock <= 5 && (
                    <div  className='absolute top-0 left-0 w-full bg-red-600 text-white text-center text-xs font-bold py-1 animate-pulse z-10'>
                        ¡STOCK BAJO! - Solo quedan {stock} unidades
                    </div>
                )}
                <div className={`bg-gradient-to-r from-sky-600 to-sky-600 p-4 pt-7`}>
                    <h3 className='text-lg font-semibold text-white truncate'>{nombre}</h3>
                    <span className='text-blue-100 text-xs uppercase tracking-wide'>{tipo}</span>
                </div>

                <div className='p-4 flex flex-col gap-3'>
                    <p className='text-gray-600 text-sm line-clamp-2'>{descripcion}</p>

                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col'>
                            <span className='text-xs text-gray-500'>Precio</span>
                            <span className='text-xl font-bold text-green-600'>${precio.toFixed(2)}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='text-xs text-gray-500'>Stock</span>
                            <span className={`text-lg font-semibold ${stock > 0 ? 'text-gray-800' : 'text-red-500'}`}>{stock}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='text-xs text-gray-500'>Total</span>
                            <span className={`text-lg font-semibold ${stock > 0 ? 'text-gray-800' : 'text-red-500'}`}>${(stock * precio).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className='flex gap-2 mt-2 pt-3 border-t border-gray-200'>
                        <button 
                            onClick={() => onEditar({id, nombre, descripcion, precio, stock, tipo})}
                            className='flex-1 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium py-2 px-3 rounded-full transition-colors'
                        >
                            Editar
                        </button>
                        <button 
                            onClick={() => setMostrarConfirmacion(true)}
                            className='flex-1 bg-sky-700 hover:bg-sky-800 text-white text-sm font-medium py-2 px-3 rounded-full transition-colors'
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            {mostrarConfirmacion && (
                <Confirmacion 
                    mensaje={`¿Estás seguro de eliminar el medicamento "${nombre}"?`}
                    onConfirmar={() => eliminar(id)}
                    onCancelar={() => setMostrarConfirmacion(false)}
                />
            )}
        </>
    )

}

export default Listado