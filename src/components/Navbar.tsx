import { signOut, onAuthStateChanged  } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type Props = {
  cartCount: number;
};
function Navbar({ cartCount }: Props) {

  const [user, setUser] = useState<any>(null);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log("USER =", currentUser);
         console.log("EMAIL =", currentUser?.email);
        setUser(currentUser);

      }
    );
  return () => unsubscribe();

  }, []);



  const logout = async () => {

    await signOut(auth);

    alert("Logout Success");

  };
  return (
    <nav className="bg-[#85827c] text-white p-5 flex justify-between">

      <h1 className="text-2xl font-bold">
        My Shop
      </h1>

      <div className="space-x-5">
        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>


        <Link to="/cart">
🛒       Cart ({cartCount})
        </Link>
        {user?.email === "nyeinnyeinphyo136410@gmail.com" ? (
  <Link to="/orders">
    Customer Orders
  </Link>
) : (
  <Link to="/my-orders">
    My Orders
  </Link>
)}

      </div>
       {
        user ? (
           <div className="flex items-center gap-3">

            <span className="bg-blue-200 rounded-2xl text-white p-2">
  {user ? user.email : "No User"}
</span>
{user?.email === 
"nyeinnyeinphyo136410@gmail.com" && (
<Link to="/admin">
 Admin Dashboard
</Link>)}
      <button
          
            onClick={logout}
            className="cursor-pointer hover:bg-red-400 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          </div>
        ) : (
          <div className="flex gap-3">
         <Link
 to="/login"
 className="cursor-pointer hover:bg-green-700 bg-green-500 text-white px-4 py-2 rounded"
>
 Login
</Link>
          <Link
 to="/signup"
 className="cursor-pointer hover:bg-green-700 bg-green-500 text-white px-4 py-2 rounded"
>
 Sign up
</Link>
</div>
        )
      }
    
    </nav>
  );
}

export default Navbar;