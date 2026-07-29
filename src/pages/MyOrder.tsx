import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";
import type { Product } from "../types";

type Order = {
  id: string;
  customerName: string;
  totalPrice: number;
  status: string;
  products?: Product[];
};


function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    
    const q = query(
      collection(db, "orders"),
      where("userEmail", "==", auth.currentUser?.email)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id: string) => {

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) {
    return;
  }

  await updateDoc(doc(db, "orders", id), {
    status: "Cancelled"
  });

  fetchOrders();

};

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        My Orders
      </h1>

      {orders.map(order => (

        <div
          key={order.id}
          className="border p-5 rounded mb-4"
        >

          <p>Status : {order.status}</p>

          <p>Total : {order.totalPrice} MMK</p>
          <h3 className="font-bold mt-3">
  Products:
</h3>

{order.products?.map((item, index) => (
  <div key={index} className="border p-2 mt-2 rounded">

    <p>
      Name: {item.name}
    </p>

    <p>
      Quantity: {item.quantity}
    </p>

    <p>
      Price: {item.price} MMK
    </p>

  </div>
))}

          {order.status === "Pending" && (

            <button
              onClick={() => cancelOrder(order.id)}
              className="hover:bg-red-300 bg-red-600 text-white px-4 py-2 rounded mt-3"
            >
              Cancel Order
            </button>

          )}

        </div>

      ))}

    </div>
  );
}

export default MyOrders;