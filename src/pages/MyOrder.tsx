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

type Order = {
  id: string;
  customerName: string;
  totalPrice: number;
  status: string;
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