import { Link } from "react-router-dom";
import phoneImg from "../assets/phone.png";
import laptopImg from "../assets/laptop.png";
import watchImg from "../assets/watch.png";
import headphonesImg from "../assets/headphones.png";

function Home() {
  const categories = [
  {
    name: "Phone",
    image: phoneImg
  },
  {
    name: "Laptop",
    image: laptopImg
  },
  {
    name: "Watch",
    image: watchImg
  },
  {
    name: "Accessory",
    image: headphonesImg
  }
];
  return (
    <main>

      <section className="text-center py-20 bg-gray-100">
        <h1 className="text-5xl font-bold">
          Welcome To My Shop
        </h1>

        <p className="mt-5">
          Quality Products At Best Price
          Discover amazing phones,
          laptop, watchs and accessories.
        </p>
        <div className="mt-8 flex gap-4">

              <Link
                to="/products"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="border border-white px-6 py-3 rounded-lg"
              >
                View Products
              </Link>

            </div>

      </section>

      
<section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {categories.map((category) => (
    <Link
      key={category.name}
      to={`/products?category=${category.name}`}
      className="bg-[#534c4c] rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-58 object-contain mx-auto mb-4"
      />

      <h3 className="text-xl font-semibold text-gray-800">
        {category.name}
      </h3>
    </Link>
  ))}
</div>
        </section>

      <section className="bg-gray-100 py-16">

        <h2 className="text-4xl font-bold text-center">
          Why Choose Us
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white p-8 rounded-xl shadow text-center">
            🚚
            <h3 className="text-xl font-bold mt-3">
              Fast Delivery
            </h3>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            🔒
            <h3 className="text-xl font-bold mt-3">
              Secure Payment
            </h3>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            ⭐
            <h3 className="text-xl font-bold mt-3">
              Best Quality
            </h3>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            💬
            <h3 className="text-xl font-bold mt-3">
              24/7 Support
            </h3>
          </div>

        </div>

      </section>
      
     </main>
  );
}


export default Home;