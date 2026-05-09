import {useEffect, useState} from 'react'
import type {Medicamento} from '../types'

interface Props{
    insertar: (nombre:string, descripcion:string, precio:number, stock:number, tipo:string)=>void
    editar: (id: number, nombre:string, descripcion:string, precio:number, stock:number, tipo:string)=>void
    medicamentoEditar: Medicamento | null

}

function FormAdd({insertar, editar, medicamentoEditar}:Props) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState<number | ''>('')
    const [stock, setStock] = useState<number | ''>('')
    const [tipo, setTipo] = useState('')

    useEffect(() => {
        if (medicamentoEditar) {
            setNombre(medicamentoEditar.nombre)
            setDescripcion(medicamentoEditar.descripcion)
            setPrecio(medicamentoEditar.precio)
            setStock(medicamentoEditar.stock)
            setTipo(medicamentoEditar.tipo)
        }
    }, [medicamentoEditar])

    const validarForm = () => {
        if (!nombre.trim()){
            alert("El nombre es obligatorio")
            return false
        }
        if (precio <= 0){
            alert("El precio debe ser mayor a 0")
            return false
        }
        if (stock <0) {
            alert("El stock no puede ser negativo")
            return false

        }
        return true
    }


    const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validarForm()){
            return
        }
        if (medicamentoEditar){
            editar(medicamentoEditar.id, nombre, descripcion, precio, stock, tipo)
        }else{
            insertar(nombre, descripcion, precio, stock, tipo)
        }
        setNombre('')
        setDescripcion('')
        setPrecio(0)
        setStock(0)
        setTipo('')
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto'>


                <form onSubmit={manejarSubmit} className="flex flex-wrap w-full gap-3 sm:gap-4 items-end justify-center bg-white p-4 sm:p-6 rounded-lg shadow-md">
                    
                    <div className='flex flex-col flex-1 min-w-[140px] sm:min-w-[180px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Nombre del producto</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    
                    <div className='flex flex-col flex-1 min-w-[140px] sm:min-w-[180px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Descripción</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" type="text" placeholder="Descripción" value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}/>
                    </div>

                    <div className='flex flex-col flex-1 min-w-[100px] sm:min-w-[120px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Precio</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" type="number" value={precio} onChange={(e) => {
        const value = e.target.value
        setPrecio(value === '' ? '' : Number(value))
    }} min="0.01" step="0.01" required />
                    </div>

                    <div className='flex flex-col flex-1 min-w-[100px] sm:min-w-[120px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Stock</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" type="number" value={stock} onChange={(e) => {
        const value = e.target.value
        setStock(value === '' ? '' : Number(value))
    }}       min="0" required />
                    </div>

                    <div className='flex flex-col flex-1 min-w-[120px] sm:min-w-[140px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Tipo</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>

                    <button className="bg-sky-800 hover:bg-sky-900 text-white font-semibold px-4 sm:px-6 py-2 rounded-full h-fit transition-colors shadow-sm w-full sm:w-auto" type="submit">Guardar</button>

                </form>

            </div>
        </>
    )

}

export default FormAdd