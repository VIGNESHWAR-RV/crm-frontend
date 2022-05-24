import { API } from "../../API";


export function loginService(data){
 
    return fetch(`${API}/login`,{method:"POST",
                                 headers:{"Content-Type":"application/json"},
                                 body:JSON.stringify(data)
                                });
}

export function loggedInCheckService(authorization){

    return fetch(`${API}/loggedInCheck`,{method:"POST",
                                 headers:{...authorization}
                                });
}