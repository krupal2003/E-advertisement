import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const useAuth=()=>{

    const [authState, setauthState] = useState({isLoggedin:false,role:""})
    const [loding, setloding] = useState(true)

     useEffect(()=>{
        const id=localStorage.getItem("id");
        const role=localStorage.getItem("role");

        if(id){
            setauthState({isLoggedin:true,role})
        }
        setloding(false)
     },[])
     
    return {...authState,loding} 
}

const PrivateRoutes=()=>{
    const auth=useAuth();

    if(auth.loding){
        return <h1>Loading</h1>
    }

    return auth.isLoggedin ? <Outlet></Outlet>: <Navigate to="/login"></Navigate>
}

export default PrivateRoutes