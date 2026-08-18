import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Plus,
  Heart,
} from "lucide-react";
function AdminDashboard() {
   const [totalProducts, setTotalProducts] = useState(0);
   const [totalOrders, setTotalOrders] = useState(0);
   const [totalUsers, setTotalUsers] = useState(0);
   const navigate =useNavigate();
    useEffect(() => {
      const checkAdmin = () => {const ADMIN_EMAIL = "nyeinnyeinphyo136410@gmail.com";
    if (auth.currentUser?.email !== ADMIN_EMAIL) {
  navigate("/");
  return;
  
}
    const fetchData = async () => {
      const productsSnapshot = await getDocs(
        collection(db, "products")
      );
      const ordersSnapshot = await getDocs(
        collection(db, "orders")
      );
      const usersSnapshot = await getDocs(
        collection(db, "users")
      );
      setTotalProducts(productsSnapshot.size);
      setTotalOrders(ordersSnapshot.size);
      setTotalUsers(usersSnapshot.size);
    };
   fetchData();
};  
checkAdmin();
}, [navigate]);
const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      active: true,
      link: "/admin-dashboard",
    },
    {
      name: "Products",
      icon: Package,
      link: "/manage-products",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      link: "/orders",
    },
    {
      name: "Customers",
      icon: Users,
      link: "/customers",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      link: "/analytics",
    },
    {
      name: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];
     const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      cardBg: "bg-gradient-to-br from-blue-50 to-blue-100/60",
      change: "12%",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      cardBg: "bg-gradient-to-br from-green-50 to-green-100/60",
      change: "8%",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
      cardBg: "bg-gradient-to-br from-pink-50 to-pink-100/60",
      change: null,
    },
  ];
  const quickActions = [
    {
      title: "Add Product",
      subtitle: "Create new product",
      icon: Plus,
      link: "/add-product",
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Manage Products",
      subtitle: "Edit & organize",
      icon: Package,
      link: "/manage-products",
      bg: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
    {
      title: "View Orders",
      subtitle: "Check all orders",
      icon: ShoppingCart,
      link: "/orders",
      bg: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      title: "Customer Favorites",
      subtitle: "View favorites",
      icon: Heart,
      link: "/admin-favorites",
      bg: "bg-gradient-to-r from-pink-500 to-rose-500",
    },
  ];
  return (
    
    <div className="min-h-screen bg-gray-50 p-8">
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
        <div className="flex flex-wrap gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  item.active
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.cardBg} p-6 rounded-xl shadow-sm`}
            >
              <div className="flex items-center gap-4">

                <div
                  className={`${stat.iconBg} p-3 rounded-lg`}
                >
                  <Icon
                    className={stat.iconColor}
                    size={28}
                  />
                </div>

                <div>
                  <h2 className="text-gray-600">
                    {stat.title}
                  </h2>

                  <p className="text-3xl font-bold">
                    {stat.value}
                  </p>

                  {stat.change && (
                    <p className="text-sm text-green-500 mt-1">
                      +{stat.change}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className={`${action.bg} text-white p-6 rounded-xl hover:scale-105 transition`}
              >
                <Icon size={30} className="mb-4" />

                <h3 className="text-lg font-bold">
                  {action.title}
                </h3>
                <p className="text-sm opacity-90 mt-1">
                  {action.subtitle}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      </div>
  );
}
export default AdminDashboard;