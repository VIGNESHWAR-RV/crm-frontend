export  function header(){
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token") || "no token";
    const converted = token.split("/a").join(".");
    const header = (role==="admin") 
                      ? {"admin-auth":`${converted}`}
                      : (role==="manager")
                           ?{"manager-auth":`${converted}`}
                           :(role==="employee")
                               ?{"employee-auth":`${converted}`}
                               :{"user-auth":`${converted}`};
  
    return header;
    }