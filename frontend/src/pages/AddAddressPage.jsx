import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const initialAddress = {
  fullName: "",
  phoneNumber: "",
  email: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};


const AddAddressPage = () => {
  useDocumentTitle('Add Address');
  const {axios,user,navigate} = useContext(AppContext);
  const [address,setAddress] = useState(initialAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/address/add",{address})
      if(data.success){
        toast.success(data.message);
        setAddress(initialAddress);
        navigate("/cart")
        window.scrollTo({top:0,behavior:"smooth"});
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || error.message);
    }
  }

  useEffect(() => {
    if(!user){
      navigate("/cart");
    }
  },[user,navigate])
  return (
    <div className="flex justify-center items-center bg-primary h-screen">
      <form 
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 max-w-[500px] mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add Address
        </h2>
        <input
          name="fullName"
          value={address.fullName}
          onChange={(e) => setAddress({...address,fullName:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          name="phoneNumber"
          value={address.phoneNumber}
          onChange={(e) => setAddress({...address,phoneNumber:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="Phone Number"
          required
        />
        <input
          name="email"
          value={address.email}
          onChange={(e) => setAddress({...address,email:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="street"
          value={address.street}
          onChange={(e) => setAddress({...address,street:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="Street"
          required
        />
        <input
          name="city"
          value={address.city}
          onChange={(e) => setAddress({...address,city:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="City Name"
          required
        />
        <input
          name="state"
          value={address.state}
          onChange={(e) => setAddress({...address,state:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="State Name"
          required
        />
        <input
          name="postalCode"
          value={address.postalCode}
          onChange={(e) => setAddress({...address,postalCode:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="Postal Code"
          required
        />
        <input
          name="country"
          value={address.country}
          onChange={(e) => setAddress({...address,country:e.target.value})}
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="text"
          placeholder="Country Name"
          required
        />
        <button
          
          type="submit"
          className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white"
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddAddressPage;
