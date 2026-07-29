import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const snapshot = await getDoc(doc(db, "products", id!));

      if (snapshot.exists()) {
        setProduct(snapshot.data());
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="p-10">
      <img
        src={product.image}
        className="w-80 h-80 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-5">
        {product.name}
      </h1>

      <p>Brand: {product.brand}</p>
      <p>Color: {product.color}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price} MMK</p>
    </div>
  );
}

export default ProductDetail;