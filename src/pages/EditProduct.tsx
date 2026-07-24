import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


function EditProduct(){

  const { id } = useParams();


  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState("");
  const [category,setCategory] = useState("");



  useEffect(()=>{

    const getProduct = async()=>{

      const productRef = doc(
        db,
        "products",
        id!
      );

      const snapshot = await getDoc(productRef);


      if(snapshot.exists()){

        const data = snapshot.data();

        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);

      }

    };


    getProduct();

  },[id]);




  const handleUpdate = async()=>{

    await updateDoc(
      doc(db,"products",id!),
      {
        name,
        price:Number(price),
        image,
        category
      }
    );


    alert("Product Updated");

  };



  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Edit Product
      </h1>


      <input
      className="border p-3 w-full mb-3"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />


      <input
      className="border p-3 w-full mb-3"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
      />


      <input
      className="border p-3 w-full mb-3"
      value={image}
      onChange={(e)=>setImage(e.target.value)}
      />


      <input
      className="border p-3 w-full mb-3"
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      />


      <button
      onClick={handleUpdate}
      className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Update Product
      </button>


    </div>

  );

}


export default EditProduct;