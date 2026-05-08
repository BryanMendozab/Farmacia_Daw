import { useState, useEffect } from 'react'

export function useAuth() {
    const [user, setUser] = useState(() => localStorage.getItem('user_session'))
    
    useEffect(() => {
        setUser(localStorage.getItem('user_session'))
        
        const interval = setInterval(() => {
            setUser(localStorage.getItem('user_session'))
        }, 100)
        
        return () => clearInterval(interval)
    }, [])
    
    return { user }
}