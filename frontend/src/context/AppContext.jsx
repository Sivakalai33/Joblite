import { createContext,useState } from "react";


export const AppContext = createContext();

export function AppProvider ({children}){
    const [message,setMessage] = useState("")
    const [history,setHistory] = useState([])
    const [messageType, setMessageType] = useState("");

    
    const addHistory = (entry) =>{
        setHistory ( (prev)=>[entry, ...prev])
    };

    return (

    
        <AppContext.Provider value={{message,setMessage,messageType,setMessageType,
        history,addHistory}} >
        {children}
        </AppContext.Provider>
    );

}

