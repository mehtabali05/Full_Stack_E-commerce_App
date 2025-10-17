import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const MyOrderPage = () => {
  useDocumentTitle('My Orders');
  const {axios,user} = useContext(AppContext);
  const [orders,setOrders] = useState([]);

  const getUserOrders = async () => {
    try {
        const {data} = await axios.get("/order/user"); 
        // console.log("Orders Data: ",data);
        // console.log("User value",user);
        if(data.success){
            setOrders(data.orders);
        }else{ 
            toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    if(user){
        getUserOrders();
    }
  },[user]);
  return (
      <div className="md:p-10 p-4 space-y-4">
          <h2 className="text-lg font-medium">Orders List</h2>
          {orders.length === 0 ? (
            <p>No Orders Found</p>
          ): (
            orders.map((order, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <p className="flex flex-col md:flex-row justify-between md:gap-5 gap-1">
                      <p>Order Id: {order._id}</p>
                      <p>Total Amount:  ${order.amount}</p>
                    </p>
  
                    <div className="flex flex-col justify-around md:flex-row text-sm md:gap-5 gap-1">
                        <p>Payment Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Status: {order.status}</p>
                    </div>
                </div>
            ))
          )}
      </div>
  );
};

export default MyOrderPage;