import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Register(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");


const handleRegister = async()=>{

try{

const result = await createUserWithEmailAndPassword(
 auth,
 email,
 password
);
console.log(result.user.email);
alert("Register Success");

} catch(error) {

    console.log(error);

  }


};


return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-5">
Register
</h1>


<input
className="border p-3 w-full mb-3"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="border p-3 w-full mb-3"
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={handleRegister}
className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded"
>
Register
</button>


</div>

)

}


export default Register;