import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";


function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const handleLogin = async() => {

try{
    await signOut(auth);

 const result = await signInWithEmailAndPassword(
auth,
email,
password
);
console.log("LOGIN USER:", result.user.email);
alert("Login Success");


}catch(error:any) {

alert(error.message);

}

};


return(

<div className="p-10">

<h1 className="text-3xl font-bold">
Customer Login
</h1>


<input
className="border p-3 w-full mt-5"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="border p-3 w-full mt-3"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={handleLogin}
className="cursor-pointer bg-green-600 text-white px-5 py-2 mt-5 rounded"
>
Login
</button>


</div>

)

}


export default Login;