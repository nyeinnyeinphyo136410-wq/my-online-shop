import { Link } from "react-router-dom";

function Home() {
  return (
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
        <h2 className="text-3xl font-bold mb-8 text-center">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <Link
            to="/products?category=Phone"
            className="bg-blue-500 text-white p-8 rounded-xl text-center hover:bg-blue-700"
          >
            📱 Phone
          </Link>

          <Link
            to="/products?category=Laptop"
            className="bg-green-500 text-white p-8 rounded-xl text-center hover:bg-green-700"
          >
            💻 Laptop
          </Link>

          <Link
            to="/products?category=Watch"
            className="bg-yellow-500 text-white p-8 rounded-xl text-center hover:bg-yellow-700"
          >
            ⌚ Watch
          </Link>

          <Link
            to="/products?category=Accessory"
            className="bg-red-500 text-white p-8 rounded-xl text-center hover:bg-red-700"
          >
            🎧 Accessory
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;