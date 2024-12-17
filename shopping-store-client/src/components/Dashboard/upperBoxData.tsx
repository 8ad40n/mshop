"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoPricetag } from "react-icons/io5";

export default function UpperBoxData() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/getAllCustomers");
        setTotalCustomers(response.data.length); 
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order/revenue");
        setTotalRevenue(response.data.totalPrice.revenue);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };
    const fetchTotalOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3000/order/allOrders");
          setTotalOrders(response.data.orders.length); 
        } catch (error) {
          console.error("Error fetching total orders:", error);
        }
      };
    const fetchTotalProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/product");
          setTotalProducts(response.data.length); 
        } catch (error) {
          console.error("Error fetching total products:", error);
        }
      };

    fetchTotalCustomers();
    fetchTotalRevenue();
    fetchTotalOrders();
    fetchTotalProducts();
  }, []);
  return (
    <div className="mt-8 mb-8">
      <div className="flex justify-between items-center gap-6 flex-wrap">
        {/* Total User */}
        <div className="flex items-center justify-between bg-red-400 px-6 py-4 rounded-2xl w-[22vw] shadow-xl">
          <FaUser className="text-6xl text-white" />
          <div className="text-white text-right">
            <h1 className="text-4xl font-semibold">{totalCustomers}</h1>
            <p className="text-lg font-light">Customers</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex items-center justify-between bg-blue-400 px-6 py-4 rounded-2xl w-[22vw] shadow-xl">
          <IoPricetag className="text-6xl text-white" />
          <div className="text-white text-right">
            <h1 className="text-4xl font-semibold">{totalRevenue} BDT</h1>
            <p className="text-lg font-light">Total Revenue</p>
          </div>
        </div>

        {/* Total Order */}
        <div className="flex items-center justify-between bg-green-400 px-6 py-4 rounded-2xl w-[22vw] shadow-xl">
          <FaCartArrowDown className="text-6xl text-white" />
          <div className="text-white text-right">
            <h1 className="text-4xl font-semibold">{totalOrders}</h1>
            <p className="text-lg font-light">Orders</p>
          </div>
        </div>

        {/* Total Product */}
        <div className="flex items-center justify-between bg-yellow-400 px-6 py-4 rounded-2xl w-[22vw] shadow-xl">
          <AiFillProduct className="text-6xl text-white" />
          <div className="text-white text-right">
            <h1 className="text-4xl font-semibold">{totalProducts}</h1>
            <p className="text-lg font-light">Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}
