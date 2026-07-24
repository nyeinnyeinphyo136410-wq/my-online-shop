import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
type Props = {
    addToCart: (Product: Product) => void;
};
function Home({ addToCart }:Props){
const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

    const fetchProducts = async () => {

      const snapshot = await getDocs(
        collection(db, "products")
      );
       console.log("Documents:", snapshot.docs.length);
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))as Product[]; 
        console.log("PRODUCT DATA =", productData);
        

      setProducts(productData);

    };


    fetchProducts();

  }, []);

console.log("Home addToCart:", addToCart);
return(

<main>

<section className="text-center py-20 bg-gray-100">

<h1 className="text-5xl font-bold">
Welcome To My Shop
</h1>

<p className="mt-5">
Quality Products At Best Price
</p>
</section>


<section className="p-10">

<h2 className="text-3xl font-bold mb-8">
Products
</h2>


<div className="grid md:grid-cols-3 gap-6">

{
products.map(product=>(

<ProductCard
key={product.id}
product={product}
addToCart={addToCart}
/>

))
}

</div>


</section>


</main>

);

}


export default Home;