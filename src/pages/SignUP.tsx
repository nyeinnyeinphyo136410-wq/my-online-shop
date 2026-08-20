import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";


function SignUP(){
const navigate = useNavigate();
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);


const handleSignup = async()=>{

try{

const result = await createUserWithEmailAndPassword(
 auth,
 email,
 password
);

await setDoc(doc(db, "users", result.user.uid), {
  email: result.user.email,
  createdAt: new Date()
});

alert("Signup Success");
navigate("/");

 } catch (error: any) {
  console.log("SIGNUP ERROR:", error.code);
  console.log("MESSAGE:", error.message);

  alert(`${error.code}\n${error.message}`);
}

};


return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-5">
Customer Signup
</h1>


<input
className="border p-3 w-full "
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<div className="relative mt-3">
<input
className="border p-3 w-full mb-3 scroll-pr-10"
placeholder="Password"
type={showPassword ? "text" : "password"}
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
onClick={handleSignup}
className="cursor-pointer hover:bg-blue-400 bg-blue-600 text-white px-5 py-2 rounded"
>
Sign Up
</button>


</div>

)

}


export default SignUP;