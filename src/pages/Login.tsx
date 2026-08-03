import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login(){
 const navigate = useNavigate();
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [showPassword, setShowPassword] = useState(false);


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
navigate("/");

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

<div className="relative mt-3">
<input
className="border p-3 w-full pr-10"
type={showPassword ? "text" : "password"}
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-3 top-1/2 -translate-y-1/2">
    {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>
</div>
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