import {API} from "../../API";

export function forgotPasswordService(data){
 
    return fetch(`${API}/forgotPassword`,{method:"POST",
                                          headers:{"Content-Type":"application/json"},
                                          body:JSON.stringify(data)
                                         });
}