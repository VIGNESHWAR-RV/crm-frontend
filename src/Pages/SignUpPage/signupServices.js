import { API } from "../../API";

export function signupService(data){
    return fetch(`${API}/signup`,{method:"POST",
                                  headers:{"Content-Type":"application/json"},
                                  body:JSON.stringify(data)
                                });
}