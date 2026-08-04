import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const snapshot = await getDoc(doc(db, "products", id!));

      if (snapshot.exists()) {
        setProduct(snapshot.data());
      }
    };

    fetchProduct();
  }, [id]);
  const submitReview = async () => {

  if (!auth.currentUser) {
    alert("Please Login First");
    return;
  }

  await addDoc(collection(db, "reviews"), {
    productId: id,
    userEmail: auth.currentUser.email, 
    rating,
    comment,
    createdAt: serverTimestamp()
  });

  alert("Review Submitted");

  setComment("");
  setRating(5);

};

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
      <h2 className="text-2xl font-bold mt-10">
        Write Review
      </h2>
      <select
      className="border p-3 w-full mt-3"
      value={rating}
      onChange={(e)=>setRating(Number(e.target.value))}>
  <option value={5}>⭐⭐⭐⭐⭐</option>
  <option value={4}>⭐⭐⭐⭐</option>
  <option value={3}>⭐⭐⭐</option>
  <option value={2}>⭐⭐</option>
  <option value={1}>⭐</option>
      </select>
      <textarea
  className="border p-3 w-full mt-3"
  placeholder="Write your review..."
  value={comment}
  onChange={(e)=>setComment(e.target.value)}
/>

<button
  onClick={submitReview}
  className="bg-blue-600 text-white px-5 py-2 rounded mt-3"
>
  Submit Review
</button>

      <p>Brand: {product.brand}</p>
      <p>Color: {product.color}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price} MMK</p>
    </div>
  );
}

export default ProductDetail;