import {API} from '../../backend';


export const createOrder=(userId,token,orderData)=>{
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
    }).then(reponse=>{
        return reponse.json()
    })
    .catch(err=>console.log(err))
}