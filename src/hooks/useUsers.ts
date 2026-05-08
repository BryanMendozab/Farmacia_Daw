import { supabase } from "../utils/supabase"
import {useCallback, useEffect, useState} from 'react'
import type {User} from '../types'

function useUsers() {
    const [users, setUsers] = useState<User[]>([])


    const traerUsers = useCallback(async () =>{

        const {data, error} = await supabase.from ("users").select("*").order("nombre", {ascending:true  })

        if (error){
            console.error("Error al traer usuarios", error)
            return

        }
        if (data){
            setUsers(data)
        }
    }, [])

    const insertarUsers = useCallback(async (nombre: string, email:string, password: string) => {
        const { error } = await supabase.from("users").insert([{ nombre, email, password }])


        if(error){
            console.error( "error al guardar usuario", error)
            return
        }
        await traerUsers()
    }, [traerUsers])

   
    useEffect(()=>{
        traerUsers()

    }, [traerUsers])

    const login = useCallback(async (email: string, password: string) => {
        const { data, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password).single()

        if (error || !data){
            console.error("Error al iniciar sesión", error)
            return null
        }
        return data
    }, [])

    return{
        users,insertarUsers, login
    }

}

export default useUsers 