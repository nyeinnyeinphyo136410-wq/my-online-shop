import type { Product } from "../types";


type Props = {
  product: Product;
 
    addToCart: (Product: Product) => void;
};



function ProductCard({product, addToCart}: Props){
console.log(addToCart)
  return (

    <div className="shadow-lg rounded-xl p-5">

      <img
        src={product.image}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="text-xl font-bold mt-4">
        {product.name}
      </h3>

        
        <p>
  Brand: {product.brand}
</p>

<p>
  Color: {product.color}
</p>


      <p>
        {product.price} MMK
      </p>


      <button 
      onClick={() => addToCart(product)}
        className="cursor-pointer bg-blue-600 hover:bg-red-400 text-white px-5 py-2 mt-4 rounded"
      >
        Add Cart
      </button>

    </div>

  );
}


export default ProductCard;