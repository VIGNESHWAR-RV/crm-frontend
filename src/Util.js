import toast from "react-hot-toast";

//---- { API imports } ----------------------------
import { API } from "./API";
//--------------------------------------------------

export function giveDate(date,withYear) {
  let ActualDate = new Date(date).toDateString().split(" ");
  ActualDate.shift();
  if(withYear === "withYear"){
      return ActualDate.join("/");
  }
  ActualDate.pop();
  return ActualDate.reverse().join(" ");
}

  export function dateColor(date){

    let difference = new Date(date) -  new Date();
    
    if(difference <= (1000*60*60*24)){
        return "error"
    }
    else if (difference <= (1000*60*60*24*3)){
        return "warning";
    }
    else{
        return "primary";
    }

}

  // for generating list of options
export function optionsGenerator(array,key,role="Options"){
  let options = [];
   options.push({name:role,disabled:true,sx:{color:"dodgerblue"}});
  for(let each of array){
       options.push({name:each[key],value:each[key]});
  }
  return options;
}

export function statusColorGenerator(value){
  switch (value){
    case "in-complete" :{
      return "error"
    }
    case "in-progress" :{
      return "primary"
    }
    case "completed" :{
      return "success"
    }
    case "not available" :{
      return "secondary"
    }
    case "junk customer" :{
      return "warning"
    }
    case "cancelled" :{
      return "error"
    }
    default :{
       return "primary"
    }
  }
}

export async function update({path="/",method="POST",header={},body={},role=""}){

  if(path === "/"){
    toast.error("Please provide a valid API to update changes");
    return;
  }
  if(role === ""){
      toast.error("please specify update with role");
      return;
  }

  const roles = {admin:"admin_auth",
                 teamLead:"teamLead_auth",
                 employee:"employee_auth"};

   const token = sessionStorage.getItem(roles[role]);

     if(token !== "" && token !== undefined && token !== null){

                try{
                     let fetchInfo = (method==="GET")
                                        ?{method:method,
                                          headers:{"Content-Type":"application/json",[roles[role]]:token,...header}}
                                        :{method:method,
                                          headers:{"Content-Type":"application/json",[roles[role]]:token,...header},
                                          body:JSON.stringify(body)};

                     const response = await fetch(`${API}${path}`,fetchInfo);
      
                     const data = await response.json();

                        if(response.status === 200){
                            toast.success((data.message)?data.message:"changes updated successfully");
                            return response.status;
                        }

                        else if (response.status >= 400 && response.status < 500){

                            toast.error((data.message)?data.message:"something went wrong, please try again");
                            return response.status;

                        }
                        else{

                            toast.error((data.message)?data.message:"Server Busy , try again later");
                            return response.status;

                        }
                      
                }catch(err){
                    console.log(err);
                    toast.error("something went wrong, please try again");
                    return 303;
                }
           
         

     }else{
         sessionStorage.clear();
         window.location.pathname = "login";
         return;
     }
}

