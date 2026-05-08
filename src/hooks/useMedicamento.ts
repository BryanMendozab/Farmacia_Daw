import { supabase } from "../utils/supabase"
import {useCallback, useEffect, useState} from 'react'
import type {Medicamento} from '../types'

function useMedicamento() {
    const [medicamento, setMedicamento] = useState<Medicamento[]>([])


    const traerMedicamentos = useCallback(async () =>{

        const {data, error} = await supabase.from ("medicamentos").select("*").order("nombre", {ascending:true  })

        if (error){
            console.error("Error al traer medicamentos", error)
            return

        }
        if (data){
            setMedicamento(data)
        }
    }, [])

    const insertar = useCallback(async (nombre: string, descripcion: string, precio:number, stock: number, tipo:string) => {
        const { error } = await supabase.from("medicamentos").insert([{ nombre, descripcion, precio, stock, tipo }])


        if(error){
            console.error( "error al guardar medicamento", error)
            return
        }
        await traerMedicamentos()
    }, [traerMedicamentos])

    const editar = useCallback(async (id:number, nombre: string, descripcion: string, precio:number, stock: number, tipo:string) => {

        const { error } = await supabase.from("medicamentos").update({ nombre, descripcion, precio, stock, tipo }).eq("id", id)

        if(error){
            console.error( "error al editar medicamento", error)
            return
        }
        await traerMedicamentos()

    }, [traerMedicamentos])

    const eliminar = useCallback(async (id:number) => {
        const { error } = await supabase.from("medicamentos").delete().eq("id", id)

        if(error) {
            console.error( "error al eliminar medicamento", error)
            return
        }
        await traerMedicamentos()
    }, [traerMedicamentos])

    useEffect(()=>{
        
        traerMedicamentos()

    }, [traerMedicamentos])

    return{
        medicamento,insertar, editar, eliminar
    }

}

export default useMedicamento 