import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import type { Product } from "./types";
import CheckoutForm from "./pages/CheckoutForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import MyOrders from "./pages/MyOrder";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import AdminFavorites from "./pages/AdminFavorites";
function App() {
  
  const [cart, setCart] = useState<Product[]>([]);
  const placeOrder = () => {
    alert("Order Placed Successfully!");
    setCart([]);
  };
  const addToCart = (product: Product) => {

  const exist = cart.find(
    item => item.id === product.id
  );

  if (exist) {

    setCart(
      cart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1
            }
          : item
      )
    );

  } else {

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);

  }

};
   const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );
const increase = (id:string) => {

  setCart(
    cart.map(item =>
      item.id === id
      ? {
          ...item,
          quantity: (item.quantity || 1) + 1
        }
      : item
    )
  );

};


const decrease = (id:string) => {

  setCart(
    cart.map(item =>
      item.id === id && (item.quantity || 1) > 1
      ? {
          ...item,
          quantity: (item.quantity || 1) - 1
        }
      : item
    )
  );

};
  return (
    
     <BrowserRouter>
    <>
    
      <Navbar cartCount={cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      )} />
<Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/products"
        element={<Products
        addToCart={addToCart} />}
      />
      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />
      <Route
  path="/admin"
  element={<AdminDashboard />}
/>
<Route
 path="/edit-product/:id"
 element={<EditProduct />}
/>
<Route
 path="/manage-products"
 element={<ManageProducts />}
/>
<Route
 path="/orders"
 element={<Orders />}
/>

<Route
 path="/my-orders"
 element={<MyOrders />}
/>
<Route
  path="/admin-favorites"
  element={<AdminFavorites />}
/>
<Route
  path="/product/:id"
  element={<ProductDetail />}
/>
<Route
      path="/checkout"
      element={
        <CheckoutForm
          cart={cart}
          totalPrice={totalPrice}
          placeOrder={placeOrder}
        />
      }
    />
<Route
 path="/cart"
 element={
  <Cart
    cart={cart}
    removeFromCart={removeFromCart}
    increase={increase}
    decrease={decrease}
  />
 }
/>
        <Route
  path="/add-product"
  element={<AddProduct />}
/>
  </Routes>

    <Footer />
    
     
    </>
   </BrowserRouter>
   
  );
}

export default App;