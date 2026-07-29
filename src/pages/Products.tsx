import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useSearchParams } from "react-router-dom";
type Props = {
    addToCart: (product:Product) => void;
};
function Products({ addToCart }:Props){
const [products, setProducts] = useState<Product[]>([]);
const [search, setSearch] = useState("");
const [searchText, setSearchText] = useState("");
const [searchParams] = useSearchParams();

const categoryFromUrl =
  searchParams.get("category") || "All";

const [category, setCategory] =
  useState(categoryFromUrl);
  useEffect(() => {
  setCategory(categoryFromUrl);
}, [categoryFromUrl]);
useEffect(() => {

  const fetchProducts = async () => {

    const snapshot = await getDocs(
      collection(db, "products")
    );

    const productData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    setProducts(productData);

  };

  fetchProducts();

}, []);
return(
<section id="products" className="p-10">

<h2 className="text-3xl font-bold mb-8">
Products
</h2>
<div className="flex mb-5">


<input
type="text"
placeholder="Search Product..."
value={searchText}
onChange={(e)=>setSearchText(e.target.value)}
className="border p-3 w-3xl mb-5 rounded"
/>
<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-3 ml-2 mb-5 rounded-lg"
>
<option value="All">All</option>
<option value="Phone">Phone</option>
<option value="Laptop">Laptop</option>
<option value="Watch">Watch</option>
<option value="Accessory">Accessory</option>
</select>
<button
onClick={() => setSearch(searchText)}
className="border p-3 py-2 px-4 mb-5 ml-3 rounded-2xl hover:bg-blue-600 bg-blue-400"
>
Search
</button>

</div>


<div className="grid md:grid-cols-3 gap-6">

{
products
.filter((product)=>
product.name?.toLowerCase()
.includes(search.toLowerCase())
)
.filter((product)=>
category === "All" || product.category === category
)
.map((product)=>(

<ProductCard
key={product.id}
product={product}
addToCart={addToCart}
/>

))
}

</div>

</section>
);


}
export default Products;