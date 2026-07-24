import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Product } from "../types";
import { Link } from "react-router-dom";


function ManageProducts(){

  const [products,setProducts] = useState<Product[]>([]);


  const fetchProducts = async()=>{

    const snapshot = await getDocs(
      collection(db,"products")
    );

    const data = snapshot.docs.map((item)=>({
      id:item.id,
      ...item.data()
    })) as Product[];


    setProducts(data);

  };


  useEffect(()=>{

    fetchProducts();

  },[]);



  const deleteProduct = async(id:string)=>{

    await deleteDoc(
      doc(db,"products",id)
    );


    alert("Product Deleted");


    fetchProducts();

  };



  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Manage Products
      </h1>


      {
        products.map(product=>(

          <div
          key={product.id}
          className="border p-4 mb-3 rounded flex justify-between"
          >

            <div>

              <h2 className="font-bold">
                {product.name}
              </h2>

              <p>
                {product.price} MMK
              </p>

            </div>

             <Link
  to={`/edit-product/${product.id}`}
  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
>
  Edit
</Link>
            <button
            onClick={()=>deleteProduct(product.id)}
            className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>


          </div>

        ))
      }


    </div>

  );

}


export default ManageProducts;