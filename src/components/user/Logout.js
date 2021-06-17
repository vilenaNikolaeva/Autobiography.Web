import React from 'react';
import { useHistory } from "react-router-dom";

export default function Logout({onLoginChange}) {
    let history = useHistory();
  
    function handleCLick() {
        localStorage.clear();
        sessionStorage.clear();
        onLoginChange(false);
        history.push("/");
    }
    
    return (
        <div>
            {handleCLick()}
        </div>
    )
}