import { useState } from "react";
import type { Product } from "../types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
type Props = {
  cart: Product[];
  totalPrice: number;
  placeOrder: () => void;
};

function CheckoutForm({ cart, totalPrice, placeOrder }: Props)  {
const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [address,setAddress] = useState("");
const [payment, setPayment] = useState("Cash on  Delivery");

const handleOrder = async () => {
  if (!name || !phone || !address ) {
    alert("Please fill all fields");
    return;
  }
   await addDoc(collection(db, "orders"), {
    customerName: name,
    phone: phone,
    address: address,
    payment: payment,
    products: cart,
    totalPrice: totalPrice,
    createdAt: new Date()
  });

  alert("Order Placed Successfully!");

  placeOrder();
};
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

{cart.map((item) => (
  <p key={item.id}>
    {item.name} x {item.quantity}
  </p>
))}
      <div className="grid md:grid-cols-2 gap-10">


          <input
               className="border p-3 w-full mb-4 rounded"
               type="text"
               placeholder="Customer Name"
               value={name}
               onChange={(e) => 
               setName(e.target.value) }
           />
              
            <input
            className="border p-3 w-full mb-4 rounded"
            type="text"
            placeholder="Phone Number"
              value={phone}
              onChange={(e) => 
              setPhone(e.target.value)}
              
              />

            <input
             className="border p-3 w-full mb-4 rounded"
           
            placeholder="Address"
              value={address}
               onChange={(e) => 
              setAddress(e.target.value)}
             />


        <select
       className="border p-3 w-full mb-4 rounded"
             value={payment}
             onChange={(e) => 
              setPayment(e.target.value)}
            >
              <option>Cash on delivery</option>
              <option>KPZpay</option>
              <option>Wave Money</option>
              <option>AYA Pay</option>
              </select>
        <h2 className="text-xl font-bold mb-5">
  Total Price: {totalPrice} MMK
</h2>

          

                
          
          <button
           onClick={handleOrder}
         
            className="cursor-pointer bg-blue-600 hover:bg-red-400 text-white px-5 py-3 mt-5 rounded w-full"
          >
            Place Order
          </button>


        </div>


      </div>


   
  );
}


export default CheckoutForm;