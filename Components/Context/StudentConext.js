import { createContext,useEffect ,useState} from "react";

export const StudentContext=createContext();

export const StudentProvider=({children})=>
{
    const [child_id,setChildId]=useState("");
    const setChildIdHandler=(id)=>
    {
        setChildId(id);
    }
    return (
        <StudentContext.Provider value={{child_id,setChildId,setChildIdHandler}}>
            {children}
        </StudentContext.Provider>
    )
}
