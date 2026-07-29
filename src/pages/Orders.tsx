import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  payment: string;
  totalPrice: number;
  status: string;
  products?: any[];
};

function Orders() {

  const [orders, setOrders] = useState<Order[]>([]);
const fetchOrders = async () => {
  const snapshot = await getDocs(collection(db, "orders"));

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  setOrders(data);
};

const updateStatus = async (
  id: string,
  status: string
) => {
  await updateDoc(doc(db, "orders", id), {
    status,
  });

  fetchOrders();
};

useEffect(() => {
  fetchOrders();
}, []);


  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Customer Orders
      </h1>


      
      {orders.map(order => (
        <div
          key={order.id}
          className="border p-5 rounded mb-5"
        >

          <h2 className="font-bold">
            Name: {order.customerName}
          </h2>

          <p>
            Phone: {order.phone}
          </p>

          <p>
            Address: {order.address}
          </p>

          <p>
            Payment: {order.payment}
          </p>
          <p>
            Status: {order.status}
          </p>


          <h3 className="font-bold mt-3">
            Products:
          </h3>

          {order.products?.map((item,index)=>(
            <p key={index}>
              {item.name} x {item.quantity}
            </p>
          ))}


          <p className="font-bold mt-3">
            Total: {order.totalPrice} MMK
          </p>
          <div className="mt-3 flex gap-2 ">
  <button
  onClick={() =>
    updateStatus(order.id, "Pending")
  }
  className="bg-yellow-400 text-white px-3 py-1 rounded">
    Pending
  </button>
  <button
  onClick={() =>
    updateStatus(order.id, "Shipping")
  }
  className="bg-yellow-400 text-white px-3 py-1 rounded">
    Shipping
  </button>
  <button
  onClick={() =>
    updateStatus(order.id, "Delivered")
  }
  className="bg-yellow-400 text-white px-3 py-1 rounded">
    Delivered
  </button>
</div>

        </div>

      ))}

    </div>
    
  );
}

export default Orders;