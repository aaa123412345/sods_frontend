import { useState } from 'react'

const useSessionStorage = (key, initial) => {

    const [storedValue, setStoredValue] = useState(()=>{

        try{

            const savedValue = window.sessionStorage.getItem(key)
            return savedValue !== null ? JSON.parse(savedValue) : initial

        }catch(err){
            console.log(err)
            return initial
        }
        
    })

    const setValue = (value) => {

        try{

            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore))

        }catch(err) {
            console.log(err)
        }

    }

    return [storedValue, setValue]

}

export default useSessionStorage