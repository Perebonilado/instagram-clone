import React, { useEffect, useState } from "react"

export type AppTypes = {
    token: any;
    setToken: React.Dispatch<any>;
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: any,
    setCurrentUser: React.Dispatch<any>
}

export const AppContext = React.createContext<AppTypes | null>(null)

export const AppProvider: React.FC = ({children}) => {

    const [ token, setToken ] = useState<any>(null)
    const [ isModal, setIsModal ] = useState<boolean>(false)
    const [ currentUser, setCurrentUser ] = useState<any>(null)
    
    useEffect(() => {
        const data = localStorage.getItem('token')
        if(data)setToken(JSON.parse(data))
    }, [])
    
    return (
        <AppContext.Provider value={{
            token, 
            setToken,
            isModal,
            setIsModal,
            currentUser,
            setCurrentUser
        }}>
            {children}
        </AppContext.Provider>
    )

}