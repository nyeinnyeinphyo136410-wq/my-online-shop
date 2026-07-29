import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";


function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");


  const handleAddProduct = async () => {

    try {

      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        image,
        category,
        brand,
        color
      });


      alert("Product Added Successfully");


      setName("");
      setPrice("");
      setImage("");
      setCategory("");
      setBrand("");
      setColor("");


    } catch(error) {

      console.log(error);
      alert("Add Product Error");

    }

  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Add Product
      </h1>


      <input
        className="border p-3 w-full mb-3"
        placeholder="Product Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />


      <input
        className="border p-3 w-full mb-3"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />


      <input
        className="border p-3 w-full mb-3"
        placeholder="Image "
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />


      <input
        className="border p-3 w-full mb-3"
        placeholder="Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      />


        <input
        className="border p-3 w-full mb-3"
        placeholder="Brand"
        value={brand}
        onChange={(e)=>setBrand(e.target.value)}
      />


      <input
        className="border p-3 w-full mb-3"
        placeholder="Color"
        value={color}
        onChange={(e)=>setColor(e.target.value)}
      />


      <button
        onClick={handleAddProduct}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Add Product
      </button>


    </div>

  );

}


export default AddProduct;