import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type Favorite = {
  id: string;
  userEmail: string;
  productId: string;
  name: string;
  price: number;
  image: string;
};

function AdminFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const fetchFavorites = async () => {
    const snapshot = await getDocs(collection(db, "favorites"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Favorite[];

    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Customer Favorites ❤️
      </h1>

      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        favorites.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5 mb-5 flex items-center gap-5"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <p><strong>Customer:</strong> {item.userEmail}</p>
              <p><strong>Product:</strong> {item.name}</p>
              <p><strong>Price:</strong> {item.price} MMK</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminFavorites;