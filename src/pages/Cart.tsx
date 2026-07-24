import type { Product } from "../types";
import { Link } from "react-router-dom"
type Props = {
  cart: Product[];
  removeFromCart: (index:number)=>void;
  increase: (id:string)=>void;
  decrease: (id:string)=>void;
};


function Cart({
  cart,
  removeFromCart,
  increase,
  decrease
}:Props){

const totalPrice = cart.reduce(
  (total, product)=>
    total + product.price * (product.quantity || 1),
  0
);


return(
<div className="p-10">

<h1 className="text-3xl font-bold">
Cart Items
</h1>


{cart.map((product,index)=>(

<div 
key={product.id}
className="border p-3 mt-3"
>

<h2>
{product.name}
</h2>

<p>
{product.price} MMK
</p>


<button
onClick={()=>removeFromCart(index)}
className="bg-red-500 text-white px-3 py-1"
>
Remove
</button>


<button onClick={()=>decrease(product.id)}>
-
</button>


<span className="mx-3">
{product.quantity}
</span>


<button onClick={()=>increase(product.id)}>
+
</button>

<Link
to="/checkout"
className="bg-blue-400 text-white px-5 py-2 rounded">
  Go To Checkout
</Link>
</div>

))}


<h2 className="text-xl font-bold mt-5">
Total Price: {totalPrice} MMK
</h2>


</div>
)

}


export default Cart;