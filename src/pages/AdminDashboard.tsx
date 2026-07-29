import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
function AdminDashboard() {
   const [totalProducts, setTotalProducts] = useState(0);
   const [totalOrders, setTotalOrders] = useState(0);
   const navigate =useNavigate();
    useEffect(() => {
      const checkAdmin = () => {
    if(auth.currentUser?.email !== "nyeinnyeinphyo136410@gmail.com"){
      navigate("/");
    }
     
    const fetchData = async () => {

      const productsSnapshot = await getDocs(
        collection(db, "products")
      );
      const ordersSnapshot = await getDocs(
        collection(db, "orders")
      );

      setTotalProducts(productsSnapshot.size);
      setTotalOrders(ordersSnapshot.size);
    };


   fetchData();

};  
checkAdmin();

}, [navigate]);

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-blue-500 text-white p-5 rounded">
          <h2>Total Products</h2>
          <p className="text-3xl">{totalProducts}
           </p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded">
          <h2>Total Orders</h2>
          <p className="text-3xl">
            {totalOrders}
          </p>
        </div>

        <div className="bg-red-500 text-white p-5 rounded">
          <h2>Total Users</h2>
          <p className="text-3xl">-</p>
        </div>

      </div>

      <div className="mt-10">
        <Link
  to="/add-product"
  className="cursor-pointer hover:bg-blue-300 bg-blue-600 text-white px-5 py-2 rounded mr-3"
>
  Add Product
</Link>

       <Link
  to="/manage-products"
  className="cursor-pointer hover:bg-blue-300 bg-blue-600 text-white px-5 py-2 rounded mr-3"
>
Manage products
</Link>

        
<Link
  to="/orders"
  className="cursor-pointer hover:bg-green-300 bg-green-600 text-white px-5 py-2 rounded mr-3"
>
  View Orders
</Link>
<Link
  to="/admin-favorites"
  className="bg-pink-500 text-white px-4 py-2 rounded"
>
  Customer Favorites
</Link>
      </div>

    </div>
  );
}

export default AdminDashboard;