import { useState } from "react";
import type { Product } from "../types";
import { Link } from "react-router-dom";
import { addDoc,collection } from "firebase/firestore";
import { auth,db } from "../firebase";

type Props = {
  product: Product;
 
    addToCart: (Product: Product) => void;
};



function ProductCard({product, addToCart}: Props){
console.log(addToCart)
console.log("IMAGE =", product.image);
const [favorite, setFavorite] = useState(false);
const addFavorite = async () => {
  const user = auth.currentUser;
  if(!user){
    alert("Please Login First");
    return;
  }
  await addDoc(collection(db,"favorites"),{

    userEmail: user.email,
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image

  });

  alert("Added Favorite ❤️");

};

  return (

    <div className=" shadow-lg rounded-xl p-5">
<div className="relative flex items-center justify-between mt-2">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded hover:scale-110"
       />
       <button
  onClick={async () => {
    setFavorite(!favorite);
    await addFavorite();
  }}
  className="absolute top-3 right-3 text-2xl"
>
  {favorite ? "❤️" : "🤍"}
</button>
</div>
      
      
      <h3 className="text-xl font-bold mt-4 h-14">
        {product.name}
      </h3>

        
        <p>
  Brand: {product.brand}
</p>

<p>
  Color: {product.color}
</p>
      <p className="font-bold">
        {product.price} MMK
      </p>
      

      <div className="flex gap-3 mt-auto">
       
      <button 
      onClick={() => addToCart(product)}
        className="hover:scale-110 cursor-pointer bg-blue-600 hover:bg-red-400 text-white px-5 py-2 mr-3 mt-4 rounded-lg"
      >
        Add Cart
      </button>
      <Link
      to={`/product/${product.id}`}
      className="hover:scale-110 bg-green-500 hover:bg-red-400 text-white px-5 py-2 mt-4 mr-3 rounded-lg inline-block">
        View Details
      </Link>
      </div>
      

    </div>

  );
}


export default ProductCard;