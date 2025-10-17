import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Orders = () => {
    useDocumentTitle('Orders | Admin');
    const [orders,setOrders] = useState([]);
    const {axios,isAdmin} = useContext(AppContext);

    const getAllOrders = async () => {
      try {
          const {data} = await axios.get("/order/admin");
          if(data.success){
              setOrders(data.orders);
          }else{
              toast.error(data.message);
          }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  
    useEffect(() => {
      if(isAdmin){
          getAllOrders();
      }
    },[isAdmin]);
  return (
      <div className="md:p-10 p-4 space-y-4">
          <h2 className="text-lg font-medium">Orders List</h2>
          {orders.map((order, index) => (
              <div key={index} className="adminOrdersList flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                  <p className="flex justify-between gap-6 orderDetails1">
                    <span>Order Id: {order._id}</span>
                    <span>Customer Id: {order.userId._id}</span>
                    <span>Total Amount:  ${order.amount}</span>
                  </p>
                  

                  <div className="flex justify-between text-sm gap-5">
                      <p>Payment Method: {order.paymentType}</p>
                      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p>Status: {order.status}</p>
                  </div>
              </div>
          ))}
      </div>
  );
};



export default Orders