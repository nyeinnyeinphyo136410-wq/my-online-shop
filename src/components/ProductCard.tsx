import { useState } from "react";
import type { Product } from "../types";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
 
    addToCart: (Product: Product) => void;
};



function ProductCard({product, addToCart}: Props){
console.log(addToCart)
console.log("IMAGE =", product.image);
const [favorite, setFavorite] = useState(false);
  return (

    <div className=" shadow-lg rounded-xl p-5">
<div className="relative flex items-center just ify-between mt-2">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded hover:scale-110"
       />
       <button
  onClick={() => setFavorite(!favorite)}
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