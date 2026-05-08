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
    const [precio, setPrecio] = useState(0)
    const [stock, setStock] = useState(0)
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
            <div className='flex flex-col justify-center items-center gap-6 p-8 max-w-7xl w-full mx-auto'>

                <h1 className='text-2xl font-bold text-gray-800'>Añadir Medicamento</h1>

                <form onSubmit={manejarSubmit} className="flex flex-wrap w-full gap-4 items-end justify-center bg-white p-6 rounded-lg shadow-md">
                    
                    <div className='flex flex-col flex-1 min-w-[180px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Nombre del producto</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    
                    <div className='flex flex-col flex-1 min-w-[180px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Descripción</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Descripción" value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}/>
                    </div>

                    <div className='flex flex-col flex-1 min-w-[120px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Precio</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" placeholder="0.00" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} min="0.01" step="0.01" required />
                    </div>

                    <div className='flex flex-col flex-1 min-w-[120px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Stock</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" placeholder="0" value={stock} onChange={(e) => setStock(Number(e.target.value))} min="0" required />
                    </div>

                    <div className='flex flex-col flex-1 min-w-[140px]'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>Tipo</label>
                        <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md h-fit transition-colors shadow-sm" type="submit">Guardar</button>

                </form>

            </div>
        </>
    )

}

export default FormAdd